import { createMission, deleteMission, mission, missions, updateMission } from "./missions";
import type { StandardScenario } from "./missions.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('missions', () => {
  scenario('returns all missions', async (scenario: StandardScenario) => {
    const result = await missions()

    expect(result.length).toEqual(Object.keys(scenario.mission).length)
  })

  scenario('returns a single mission', async (scenario: StandardScenario) => {
    const result = await mission({ id: scenario.mission.one.id })

    expect(result).toEqual(scenario.mission.one)
  })

  scenario('creates a mission', async (scenario: StandardScenario) => {
    const result = await createMission({
      input: {
        workerId: scenario.mission.two.workerId,
        customerId: scenario.mission.two.customerId,
      },
    })

    expect(result.workerId).toEqual(scenario.mission.two.workerId)
    expect(result.customerId).toEqual(scenario.mission.two.customerId)
  })

  scenario('updates a mission', async (scenario: StandardScenario) => {
    const original = await mission({ id: scenario.mission.one.id })
    const result = await updateMission({
      id: original.id,
      input: { workerId: scenario.mission.two.workerId },
    })

    expect(result.workerId).toEqual(scenario.mission.two.workerId)
  })

  scenario('deletes a mission', async (scenario: StandardScenario) => {
    const original = await deleteMission({ id: scenario.mission.one.id })
    const result = await mission({ id: original.id })

    expect(result).toEqual(null)
  })
})
