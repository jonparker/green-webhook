import type { APIGatewayEvent, Context } from 'aws-lambda'
import NodeCache from 'node-cache'

import { CarbonAwareApi } from 'src/lib/carbon-aware-api/api'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { forwardWebhook } from 'src/services/forwardWebhook/forwardWebhook'

const cache = new NodeCache({ stdTTL: 60 })

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.info('Invoked webhook function')
  logger.info(JSON.stringify(event))

  // Example URI: http://localhost:8910/.netlify/functions/webhook/123098234ljasdf
  // Example on Netlify: https://greenwebhook.netlify.app/.netlify/functions/webhook/cl9jxx4mv0017d2t7muyt1ka4

  if (
    event.path.startsWith('/webhook/') ||
    event.path.startsWith('/.netlify/functions/webhook/')
  ) {
    // TODO:
    // 1. Check the signature (OPTIONAL)
    // 2. Get webhook ID from path and find webhook in database.
    const webhookId = event.path
      .replace('/webhook/', '')
      .replace('/.netlify/functions', '')
    if (webhookId.includes('/')) {
      logger.info('Invalid webhook id', webhookId)
      return invalidWebhookId()
    }

    logger.info(`Looking in DB for webhook id`, webhookId)
    const webhook = await db.webhook.findUniqueOrThrow({
      where: { id: webhookId },
    })
    if (!webhook) {
      return invalidWebhookId()
    }
    logger.info(`Found webhook`, webhook)
    if (
      webhook.isEnabled === false ||
      webhook.isArchived ||
      webhook.isDeleted
    ) {
      return invalidWebhookId()
    }
    // 3. If found then call Carbon Aware API with locations/time information from webhook.
    // 4. Calculate which endpoint to call or how long to delay calling the endpoint.
    // 5. Call the endpoint with the payload or schedule a delayed call.
    if (event.httpMethod === 'POST' || event.httpMethod === 'GET') {
      const endpoints = webhook.destinationEndpoints.split(',')

      let bestEndpoint = null

      if (webhook.maxDelaySeconds > 0) {
        // Check Carbon Aware SDK for best location
        const locations = endpoints.map((e) => e.split('|')[1]).filter((l) => l!='na')
        const bestLocationInfo = await getLocationWithLowestEmissions(locations)
        logger.info('Best endpoint is', bestLocationInfo)
        const foundBestEndpoint = endpoints
          .map((e) => ({
            endpoint: e.split('|')[0],
            location: e.split('|')[1],
          }))
          .find((l) => l.location === bestLocationInfo.location)
        bestEndpoint = foundBestEndpoint.endpoint
      }

      if (bestEndpoint !== null) {
        const endpointResponse = await forwardWebhook({
          httpMethod: event.httpMethod,
          payload: event.body,
          endpoint: bestEndpoint,
        })
        logger.info(`Endpoint response`, endpointResponse)

        if (endpointResponse.statusCode === 200) {
          // 6. Update invocations count on webhook.
          await db.webhook.update({
            where: { id: webhookId },
            data: {
              invocations: {
                increment: 1,
              },
            },
          })
        }

        return successfulResponse(endpointResponse)
      } else {
        return invalidWebhookId()
      }
    }
    return invalidWebhookId()
  }
  return invalidWebhookId()
}

type LocationInfo = {
  location: string
  carbonAwareInfo: {
    location?: string
    time?: Date
    rating?: number
    duration?: string
  }
}

const getLocationWithLowestEmissions = async (locations: string[]) => {
  const locationInfo = new Array<LocationInfo>()
  const baseUri = process.env.CARBON_AWARE_API_BASE_URI
  if (!baseUri) {
    throw new Error("Missing 'CARBON_AWARE_API_BASE_URI' environment variable")
  }
  const api = new CarbonAwareApi(baseUri)
  for (const location of locations) {
    if (cache.has(location) === true) {
      console.log('Cache hit for location', location)
      locationInfo.push(cache.get(location))
    } else {
      console.log('Cache miss for location', location)
      const emissionsForLocation = await api.getEmissionsDataForLocationByTime(
        location
      )
      locationInfo.push({
        location,
        carbonAwareInfo: emissionsForLocation.body[0],
      })
      cache.set(location, {
        location,
        carbonAwareInfo: emissionsForLocation.body[0],
      })
    }
  }
  return locationInfo.sort(
    (a, b) => a.carbonAwareInfo.rating - b.carbonAwareInfo.rating
  )[0]
}

const invalidWebhookId = () => {
  return {
    statusCode: 400,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: 'Invalid webhook ID' }),
  }
}

const successfulResponse = (body) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
}
