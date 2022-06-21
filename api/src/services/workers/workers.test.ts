import {
  workers,
  worker,
  createWorker,
  updateWorker,
  deleteWorker,
} from './workers'
import type { StandardScenario } from './workers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('workers', () => {
  scenario('returns all workers', async (scenario: StandardScenario) => {
    const result = await workers()

    expect(result.length).toEqual(Object.keys(scenario.worker).length)
  })

  scenario('returns a single worker', async (scenario: StandardScenario) => {
    const result = await worker({ id: scenario.worker.one.id })

    expect(result).toEqual(scenario.worker.one)
  })

  scenario('creates a worker', async () => {
    const result = await createWorker({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a worker', async (scenario: StandardScenario) => {
    const original = await worker({ id: scenario.worker.one.id })
    const result = await updateWorker({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a worker', async (scenario: StandardScenario) => {
    const original = await deleteWorker({ id: scenario.worker.one.id })
    const result = await worker({ id: original.id })

    expect(result).toEqual(null)
  })
})
