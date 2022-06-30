import { container, containers, createContainer, deleteContainer, updateContainer } from "./containers";
import type { StandardScenario } from "./containers.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('containers', () => {
  scenario('returns all containers', async (scenario: StandardScenario) => {
    const result = await containers()

    expect(result.length).toEqual(Object.keys(scenario.container).length)
  })

  scenario('returns a single container', async (scenario: StandardScenario) => {
    const result = await container({ id: scenario.container.one.id })

    expect(result).toEqual(scenario.container.one)
  })

  scenario('creates a container', async () => {
    const result = await createContainer({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a container', async (scenario: StandardScenario) => {
    const original = await container({ id: scenario.container.one.id })
    const result = await updateContainer({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a container', async (scenario: StandardScenario) => {
    const original = await deleteContainer({ id: scenario.container.one.id })
    const result = await container({ id: original.id })

    expect(result).toEqual(null)
  })
})
