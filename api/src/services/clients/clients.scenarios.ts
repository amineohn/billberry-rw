import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ClientCreateArgs>({
  client: {
    one: {
      data: {
        mission: { create: { customer: { create: { name: 'String' } } } },
        customer: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        mission: { create: { customer: { create: { name: 'String' } } } },
        customer: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
