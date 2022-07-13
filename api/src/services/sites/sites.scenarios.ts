import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.SiteCreateArgs>({
  site: {
    one: {
      data: {
        name: 'String',
        type: 'String',
        commercial: 'String',
        contact: 'String',
        siret: 'String',
        mail: 'String',
        phone: 'String',
        billingAddress: 'String',
        typeofPass: 'String',
      },
    },
    two: {
      data: {
        name: 'String',
        type: 'String',
        commercial: 'String',
        contact: 'String',
        siret: 'String',
        mail: 'String',
        phone: 'String',
        billingAddress: 'String',
        typeofPass: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
