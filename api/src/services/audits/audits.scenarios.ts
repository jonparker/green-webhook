import type { Prisma, Audit } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AuditCreateArgs>({
  audit: {
    one: {
      data: {
        log: 'String',
        user: {
          create: {
            email: 'String8760711',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        log: 'String',
        user: {
          create: {
            email: 'String3777918',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Audit, 'audit'>
