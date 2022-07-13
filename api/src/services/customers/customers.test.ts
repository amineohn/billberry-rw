import { createCustomer, customer, customers, deleteCustomer, updateCustomer } from "./customers";
import type { StandardScenario } from "./customers.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('customers', () => {
  scenario('returns all customers', async (scenario: StandardScenario) => {
    const result = await customers()

    expect(result.length).toEqual(Object.keys(scenario.customer).length)
  })

  scenario('returns a single customer', async (scenario: StandardScenario) => {
    const result = await customer({ id: scenario.customer.one.id })

    expect(result).toEqual(scenario.customer.one)
  })

  scenario('creates a customer', async () => {
    const result = await createCustomer({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a customer', async (scenario: StandardScenario) => {
    const original = await customer({ id: scenario.customer.one.id })
    const result = await updateCustomer({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a customer', async (scenario: StandardScenario) => {
    const original = await deleteCustomer({ id: scenario.customer.one.id })
    const result = await customer({ id: original.id })

    expect(result).toEqual(null)
  })
})
