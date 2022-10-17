import type { Webhook } from '@prisma/client'

import {
  webhooks,
  webhook,
  createWebhook,
  updateWebhook,
  deleteWebhook,
} from './webhooks'
import type { StandardScenario } from './webhooks.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('webhooks', () => {
  scenario('returns all webhooks', async (scenario: StandardScenario) => {
    const result = await webhooks()

    expect(result.length).toEqual(Object.keys(scenario.webhook).length)
  })

  scenario('returns a single webhook', async (scenario: StandardScenario) => {
    const result = await webhook({ id: scenario.webhook.one.id })

    expect(result).toEqual(scenario.webhook.one)
  })

  scenario('creates a webhook', async () => {
    const result = await createWebhook({
      input: {
        createdBy: 'String',
        destinationEndpoints: 'String',
        invocationUri: 'String',
        invocations: 5922178,
        isEnabled: true,
        isArchived: true,
        isDeleted: true,
      },
    })

    expect(result.createdBy).toEqual('String')
    expect(result.destinationEndpoints).toEqual('String')
    expect(result.invocationUri).toEqual('String')
    expect(result.invocations).toEqual(5922178)
    expect(result.isEnabled).toEqual(true)
    expect(result.isArchived).toEqual(true)
    expect(result.isDeleted).toEqual(true)
  })

  scenario('updates a webhook', async (scenario: StandardScenario) => {
    const original = (await webhook({ id: scenario.webhook.one.id })) as Webhook
    const result = await updateWebhook({
      id: original.id,
      input: { createdBy: 'String2' },
    })

    expect(result.createdBy).toEqual('String2')
  })

  scenario('deletes a webhook', async (scenario: StandardScenario) => {
    const original = (await deleteWebhook({
      id: scenario.webhook.one.id,
    })) as Webhook
    const result = await webhook({ id: original.id })

    expect(result).toEqual(null)
  })
})
