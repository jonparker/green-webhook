import type { Prisma, Webhook } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.WebhookCreateArgs>({
  webhook: {
    one: {
      data: {
        destinationEndpoints: 'String',
        invocationUri: 'String',
        invocations: 3440027,
        isEnabled: true,
        isArchived: true,
        isDeleted: true,
      },
    },
    two: {
      data: {
        destinationEndpoints: 'String',
        invocationUri: 'String',
        invocations: 3834000,
        isEnabled: true,
        isArchived: true,
        isDeleted: true,
      },
    },
  },
})

export type StandardScenario = ScenarioData<Webhook, 'webhook'>
