import type { Prisma, Webhook } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.WebhookCreateArgs>({
  webhook: {
    one: {
      data: {
        createdBy: 'String',
        destinationEndpoints: 'String',
        invocationUri: 'String',
        invocations: 987321,
        isEnabled: true,
        isArchived: true,
        isDeleted: true,
      },
    },
    two: {
      data: {
        createdBy: 'String',
        destinationEndpoints: 'String',
        invocationUri: 'String',
        invocations: 8511714,
        isEnabled: true,
        isArchived: true,
        isDeleted: true,
      },
    },
  },
})

export type StandardScenario = ScenarioData<Webhook, 'webhook'>
