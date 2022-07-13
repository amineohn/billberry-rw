import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.MissionCreateArgs>({
  mission: {
    one: {
      data: {
        worker: { create: { name: 'String' } },
        customer: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        worker: { create: { name: 'String' } },
        customer: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
