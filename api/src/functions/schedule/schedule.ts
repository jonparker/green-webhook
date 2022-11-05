import type { APIGatewayEvent, Context } from 'aws-lambda'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { forwardWebhook } from 'src/services/forwardWebhook/forwardWebhook'

export const handler = async (event: APIGatewayEvent, context: Context) => {
  try {
    logger.info('Checking for any scheduled webhook to run')

    const apiKeyHeader = event.headers['x-api-key']

    if (apiKeyHeader !== process.env.SCHEDULED_WEBHOOKS_API_KEY) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Access denied' }),
      }
    }

    const currentDateTime = new Date(Date.now())
    const scheduledInvocations = await db.scheduledInvocation.findMany({
      where: {
        invokeEndpointAt: {
          lte: currentDateTime.toISOString(),
        },
        isCompleted: false,
      },
    })

    logger.info(`Found ${scheduledInvocations.length} scheduled invocations`)

    for (const schedule of scheduledInvocations) {
      const webhook = {
        payload: schedule.payload,
        endpoint: schedule.endpointUri,
        httpMethod: schedule.httpMethod,
        queryParams: schedule.queryParams,
      }

      const res = await forwardWebhook(webhook)

      await db.scheduledInvocation.update({
        where: { id: schedule.id },
        data: {
          isCompleted: true,
          successfulResponse: res?.statusCode === 200 || res.statusCode === 201,
        },
      })

      await db.webhook.update({
        where: { id: schedule.webhookId },
        data: {
          invocations: {
            increment: 1,
          },
        },
      })
    }
  } catch (error) {
    logger.error('Error in scheduledWebhooks', { error })
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ data: 'ok' }),
  }
}
