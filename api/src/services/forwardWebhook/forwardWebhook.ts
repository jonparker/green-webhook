import got from 'got'

import { logger } from 'src/lib/logger'
import { db } from 'src/lib/db'

export const forwardWebhook = async ({
  payload,
  endpoint,
  httpMethod,
  secret,
  queryParams,
  webhookId,
  hasEstimate
}: {
  payload: string
  endpoint: string
  httpMethod: string
  secret?: string
  queryParams: any
  webhookId: string
  hasEstimate: boolean
}) => {
  try {
    logger.info(`Calling ${endpoint} with method ${httpMethod}`)

    const startTime = new Date().getTime();

    const forwardResponse =
      httpMethod === 'POST'
        ? await got.post(endpoint, {
            responseType: 'json',
            json: {
              payload,
            },
            query: queryParams,
          })
        : await got.get(endpoint, {
            responseType: 'json',
            query: queryParams,
          })

    const endTime = new Date().getTime();

    if(hasEstimate === false) {
      await db.webhook.update({
        where: { id: webhookId },
          data: {
            lastRecordedDuration: endTime - startTime
          },
      })
    }

    return {
      statusCode: 200,
      response: JSON.stringify(forwardResponse.body),
    }
  } catch (e) {
    console.log('error', e)
  }

  return {
    statusCode: 400,
    response: 'Error',
  }
}
