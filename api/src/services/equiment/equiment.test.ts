import { createEquipment, deleteEquipment, equiment, equipment, updateEquipment } from "./equiment";
import type { StandardScenario } from "./equiment.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('equiment', () => {
  scenario('returns all equiment', async (scenario: StandardScenario) => {
    const result = await equiment()

    expect(result.length).toEqual(Object.keys(scenario.equipment).length)
  })

  scenario('returns a single equipment', async (scenario: StandardScenario) => {
    const result = await equipment({ id: scenario.equipment.one.id })

    expect(result).toEqual(scenario.equipment.one)
  })

  scenario('creates a equipment', async () => {
    const result = await createEquipment({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a equipment', async (scenario: StandardScenario) => {
    const original = await equipment({ id: scenario.equipment.one.id })
    const result = await updateEquipment({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a equipment', async (scenario: StandardScenario) => {
    const original = await deleteEquipment({ id: scenario.equipment.one.id })
    const result = await equipment({ id: original.id })

    expect(result).toEqual(null)
  })
})
