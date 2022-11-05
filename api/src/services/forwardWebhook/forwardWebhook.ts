import got from 'got'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const forwardWebhook = async ({
  payload,
  endpoint,
  httpMethod,
  queryParams,
  webhookId,
  hasEstimate,
  headers,
}: {
  payload: string
  endpoint: string
  httpMethod: string
  queryParams: any
  webhookId: string
  hasEstimate: boolean
  headers: { [key: string]: string }
}) => {
  try {
    logger.info(`Calling ${endpoint} with method ${httpMethod}`)

    const startTime = new Date().getTime()
    delete headers['content-length']
    delete headers['host']

    const forwardResponse =
      httpMethod === 'POST'
        ? await got.post(endpoint, {
            headers,
            json: {
              payload,
            },
            query: queryParams,
          })
        : await got.get(endpoint, {
            query: queryParams,
          })

    const endTime = new Date().getTime()

    if (hasEstimate === false) {
      await db.webhook.update({
        where: { id: webhookId },
        data: {
          estimatedTime: endTime - startTime,
        },
      })
    }

    return {
      statusCode: 200,
      response:
        forwardResponse.headers['Content-Type'] === 'application/json'
          ? JSON.stringify(forwardResponse.body)
          : forwardResponse.body,
    }
  } catch (e) {
    console.log('error', e)
  }

  return {
    statusCode: 400,
    response: 'Error',
  }
}
