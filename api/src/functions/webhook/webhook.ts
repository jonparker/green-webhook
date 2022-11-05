import type { APIGatewayEvent, Context } from 'aws-lambda'
import NodeCache from 'node-cache'

import { CarbonAwareApi } from 'src/lib/carbon-aware-api/api'
import { db } from 'src/lib/db'
import { endpointHelper } from 'src/lib/endpointHelper'
import { logger } from 'src/lib/logger'
import { forwardWebhook } from 'src/services/forwardWebhook/forwardWebhook'

const cache = new NodeCache()

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
      const endpoints = endpointHelper.decode(webhook.destinationEndpoints)

      let bestEndpoint = null
      let bestTimestamp = null

      if (webhook.maxDelaySeconds < 0) {
        return invalidWebhookId()
      } else {
        // Check Carbon Aware SDK for best location
        const locations = endpoints.map((e) => e.location)
        const bestLocationInfo = await getLocationWithLowestEmissions(
          locations,
          webhook.maxDelaySeconds
          webhook.estimatedTime
        )
        logger.info('Best endpoint is', bestLocationInfo)
        const foundBestEndpoint = endpoints.find(
          (endpoint) => endpoint.location === bestLocationInfo.location
        )
        bestEndpoint = foundBestEndpoint.uri
        bestTimestamp = bestLocationInfo.timestamp
      }

      if (bestEndpoint !== null) {
        if (webhook.maxDelaySeconds === 0) {
          const endpointResponse = await forwardWebhook({
            httpMethod: event.httpMethod,
            payload: event.body,
            endpoint: bestEndpoint,
            queryParams: event.queryStringParameters,
            webhookId: webhook.id,
            hasEstimate: webhook.hasEstimate
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
          // Schedule
          await db.scheduledInvocation.create({
            data: {
              webhookId: webhook.id.toString(),
              httpMethod: event.httpMethod,
              payload: event.body,
              endpointUri: bestEndpoint,
              queryParams: event.queryStringParameters.toString(),
              invokeEndpointAt: bestTimestamp,
              isCompleted: false,
              successfulResponse: false,
            },
          })
          return successfulResponse({
            statusCode: 200,
            message: 'Scheduled',
          })
        }
      } else {
        return invalidWebhookId()
      }
    }
    return invalidWebhookId()
  }
  return invalidWebhookId()
}

// type LocationInfo = {
//   location: string
//   carbonAwareInfo: {
//     location?: string
//     time?: Date
//     rating?: number
//     duration?: string
//   }
// }
const getCombination = (allEmissions, delayIndex, durationWindow) => {
  const allEmissionsSize = allEmissions.length

  if (durationWindow > allEmissionsSize) {
    throw new Error(
      `Error message: Forcast not available yet, Status code: 404}`
    )
  }

  let currentTotalCarbs = 0,
    bestCurrentTimestamp,
    minCurrentTotalCarbs = 10000

  for (let i = 0; i < durationWindow; i++) {
    currentTotalCarbs += allEmissions[i].value
  }

  if (currentTotalCarbs < minCurrentTotalCarbs) {
    minCurrentTotalCarbs = currentTotalCarbs
    bestCurrentTimestamp = allEmissions[0].timestamp
  }

  for (
    let i = 0, j = durationWindow;
    i < delayIndex && j < allEmissionsSize;
    i++, j++
  ) {
    currentTotalCarbs -= allEmissions[i].value
    currentTotalCarbs += allEmissions[j].value

    if (currentTotalCarbs < minCurrentTotalCarbs) {
      minCurrentTotalCarbs = currentTotalCarbs
      bestCurrentTimestamp = allEmissions[i + 1].timestamp
    }
  }

  return [bestCurrentTimestamp, minCurrentTotalCarbs]
}

const getLocationWithLowestEmissions = async (
  locations: string[],
  maxDelaySeconds: number,
  lastRecordedDuration: number
) => {
  const baseUri = process.env.CARBON_AWARE_API_BASE_URI
  if (!baseUri) {
    throw new Error("Missing 'CARBON_AWARE_API_BASE_URI' environment variable")
  }

  const maxDelayTime = {
    hours: maxDelaySeconds / 3600,
    minutes: (maxDelaySeconds % 3600) / 60,
    seconds: (maxDelaySeconds % 3600) % 60,
  }

  const estimatedTime = {
    hours: lastRecordedDuration / 3600,
    minutes: (lastRecordedDuration % 3600) / 60,
    seconds: (lastRecordedDuration % 3600) % 60,
  }

  const durationWindow = Math.ceil(
    (Math.floor(estimatedTime.hours) * 60 + Math.floor(estimatedTime.minutes)) /
      5
  )
  console.log('windwo size ', durationWindow)

  // console.log((maxDelayTime.hours * 60) + maxDelayTime.minutes)
  const delayIndex = Math.floor(
    (Math.floor(maxDelayTime.hours) * 60 + Math.floor(maxDelayTime.minutes)) / 5
  )
  console.log('delay index ', delayIndex)

  let bestLocation,
    bestTimestamp,
    minTotalCarbs = 10000

  const api = new CarbonAwareApi(baseUri)

  for (const location of locations) {
    if (cache.has(location) === true) {
      console.log('cache hit for location ', location)

      const cachedData: {
        allEmissions
        durationWindow
        delayIndex
        minCurrentTotalCarbs
        bestCurrentTimestamp
      } = cache.get(location)

      if (
        cachedData.durationWindow === durationWindow &&
        cachedData.delayIndex === delayIndex
      ) {
        console.log('cache matched for location ', location)

        if (cachedData.minCurrentTotalCarbs < minTotalCarbs) {
          minTotalCarbs = cachedData.minCurrentTotalCarbs
          bestTimestamp = cachedData.bestCurrentTimestamp
          bestLocation = location
        }
      } else {
        console.log('cache not matched for location ', location)
        const allEmissions = cachedData.allEmissions

        const [bestCurrentTimestamp, minCurrentTotalCarbs] = getCombination(
          allEmissions,
          delayIndex,
          durationWindow
        )

        if (minCurrentTotalCarbs < minTotalCarbs) {
          minTotalCarbs = minCurrentTotalCarbs
          bestTimestamp = bestCurrentTimestamp
          bestLocation = location
        }
      }
    } else {
      console.log('cache Miss for location ', location)

      try {
        const emissionForcast = await api.getCurrentForecastData(
          Array.of(location)
        )
        const currentEmission = await api.getEmissionsDataForLocationByTime(
          location
        )

        if (emissionForcast.response.statusCode !== 200) {
          throw new Error(
            `Error message: ${emissionForcast.response.statusMessage}, Status code: ${emissionForcast.response.statusCode}`
          )
        }
        if (currentEmission.response.statusCode !== 200) {
          throw new Error(
            `Error message: ${currentEmission.response.statusMessage}, Status code: ${currentEmission.response.statusCode}`
          )
        }

        const newCurrentEmission = {
          ...currentEmission.body[0],
          timestamp: currentEmission.body[0].time,
          value: currentEmission.body[0].rating,
        }
        delete newCurrentEmission.time
        delete newCurrentEmission.rating

        const allEmissions = [
          newCurrentEmission,
          ...emissionForcast.body[0].forecastData,
        ]

        const [bestCurrentTimestamp, minCurrentTotalCarbs] = getCombination(
          allEmissions,
          delayIndex,
          durationWindow
        )

        if (minCurrentTotalCarbs < minTotalCarbs) {
          minTotalCarbs = minCurrentTotalCarbs
          bestTimestamp = bestCurrentTimestamp
          bestLocation = location
        }

        const curr = {
          allEmissions,
          durationWindow,
          delayIndex,
          minCurrentTotalCarbs,
          bestCurrentTimestamp,
        }

        // for 1:42:31
        // stdttl = 180-31 = 149 seconds (2:29)
        // hence expiry at 1:45:00
        const currTime = new Date()
        cache.set(
          location,
          curr,
          (5 - (currTime.getMinutes() % 5)) * 60 - currTime.getSeconds()
        )
        console.log('cache SET for location ', location)
      } catch (error) {
        console.log('Error getting emissions for location', location, error)
      }
    }
  }
  const bestCombination = {
    location: bestLocation,
    timestamp: bestTimestamp,
    carbonRatingForDuration: Math.floor(minTotalCarbs / durationWindow),
  }
  console.log(
    'Best location is ',
    bestLocation,
    ' at timestamp ',
    bestTimestamp
  )

  return bestCombination
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
