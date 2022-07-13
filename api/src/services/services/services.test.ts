import { createService, deleteService, service, services, updateService } from "./services";
import type { StandardScenario } from "./services.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('services', () => {
  scenario('returns all services', async (scenario: StandardScenario) => {
    const result = await services()

    expect(result.length).toEqual(Object.keys(scenario.service).length)
  })

  scenario('returns a single service', async (scenario: StandardScenario) => {
    const result = await service({ id: scenario.service.one.id })

    expect(result).toEqual(scenario.service.one)
  })

  scenario('creates a service', async () => {
    const result = await createService({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a service', async (scenario: StandardScenario) => {
    const original = await service({ id: scenario.service.one.id })
    const result = await updateService({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a service', async (scenario: StandardScenario) => {
    const original = await deleteService({ id: scenario.service.one.id })
    const result = await service({ id: original.id })

    expect(result).toEqual(null)
  })
})
