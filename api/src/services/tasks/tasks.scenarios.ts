import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TaskCreateArgs>({
  task: {
    one: {
      data: {
        plannedAt: '2022-06-21T12:11:41Z',
        worker: { create: { name: 'String' } },
        customer: { create: { name: 'String' } },
        site: { create: { name: 'String' } },
        container: { create: { name: 'String' } },
        material: { create: { name: 'String' } },
        service: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        plannedAt: '2022-06-21T12:11:41Z',
        worker: { create: { name: 'String' } },
        customer: { create: { name: 'String' } },
        site: { create: { name: 'String' } },
        container: { create: { name: 'String' } },
        material: { create: { name: 'String' } },
        service: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = typeof standard
