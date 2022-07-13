import { sites, site, createSite, updateSite, deleteSite } from './sites'
import type { StandardScenario } from './sites.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('sites', () => {
  scenario('returns all sites', async (scenario: StandardScenario) => {
    const result = await sites()

    expect(result.length).toEqual(Object.keys(scenario.site).length)
  })

  scenario('returns a single site', async (scenario: StandardScenario) => {
    const result = await site({ id: scenario.site.one.id })

    expect(result).toEqual(scenario.site.one)
  })

  scenario('creates a site', async () => {
    const result = await createSite({
      input: {
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
    })

    expect(result.name).toEqual('String')
    expect(result.type).toEqual('String')
    expect(result.commercial).toEqual('String')
    expect(result.contact).toEqual('String')
    expect(result.siret).toEqual('String')
    expect(result.mail).toEqual('String')
    expect(result.phone).toEqual('String')
    expect(result.billingAddress).toEqual('String')
    expect(result.typeofPass).toEqual('String')
  })

  scenario('updates a site', async (scenario: StandardScenario) => {
    const original = await site({ id: scenario.site.one.id })
    const result = await updateSite({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a site', async (scenario: StandardScenario) => {
    const original = await deleteSite({ id: scenario.site.one.id })
    const result = await site({ id: original.id })

    expect(result).toEqual(null)
  })
})
