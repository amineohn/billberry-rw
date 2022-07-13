import {
  clients,
  client,
  createClient,
  updateClient,
  deleteClient,
} from './clients'
import type { StandardScenario } from './clients.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('clients', () => {
  scenario('returns all clients', async (scenario: StandardScenario) => {
    const result = await clients()

    expect(result.length).toEqual(Object.keys(scenario.client).length)
  })

  scenario('returns a single client', async (scenario: StandardScenario) => {
    const result = await client({ id: scenario.client.one.id })

    expect(result).toEqual(scenario.client.one)
  })

  scenario('creates a client', async (scenario: StandardScenario) => {
    const result = await createClient({
      input: {
        missionId: scenario.client.two.missionId,
        customerId: scenario.client.two.customerId,
      },
    })

    expect(result.missionId).toEqual(scenario.client.two.missionId)
    expect(result.customerId).toEqual(scenario.client.two.customerId)
  })

  scenario('updates a client', async (scenario: StandardScenario) => {
    const original = await client({ id: scenario.client.one.id })
    const result = await updateClient({
      id: original.id,
      input: { missionId: scenario.client.two.missionId },
    })

    expect(result.missionId).toEqual(scenario.client.two.missionId)
  })

  scenario('deletes a client', async (scenario: StandardScenario) => {
    const original = await deleteClient({ id: scenario.client.one.id })
    const result = await client({ id: original.id })

    expect(result).toEqual(null)
  })
})
