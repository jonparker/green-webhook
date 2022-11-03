import got from 'got'

import { logger } from 'src/lib/logger'

export const forwardWebhook = async ({
  payload,
  endpoint,
  httpMethod,
  secret,
  queryParams,
  headers,
}: {
  payload: string
  endpoint: string
  httpMethod: string
  secret?: string
  queryParams: any
  headers: { [key: string]: string }
}) => {
  try {
    logger.info(`Calling ${endpoint} with method ${httpMethod}`)

    const forwardResponse =
      httpMethod === 'POST'
        ? await got.post(endpoint, {
            responseType: 'json',
            headers: {
              'X-Green-Webhook-Signature': secret,
              ...headers,
            },
            json: {
              payload,
            },
            query: queryParams,
          })
        : await got.get(endpoint, {
            responseType: 'json',
            headers: {
              'X-Green-Webhook-Signature': secret,
              ...headers,
            },
            query: queryParams,
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
