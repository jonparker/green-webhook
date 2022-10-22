import got from 'got'

import { logger } from 'src/lib/logger'

export const forwardWebhook = async ({
  payload,
  endpoint,
  httpMethod,
  secret,
}: {
  payload: string
  endpoint: string
  httpMethod: string
  secret?: string
}) => {
  try {
    logger.info(`Calling ${endpoint} with method ${httpMethod}`)

    const forwardResponse =
      httpMethod === 'POST'
        ? await got.post(endpoint, {
            responseType: 'json',
            headers: {
              'X-Green-Webhook-Signature': secret,
            },
            json: {
              payload,
            },
          })
        : await got.get(endpoint, {
            responseType: 'json',
            headers: {
              'X-Green-Webhook-Signature': secret,
            },
          })

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
