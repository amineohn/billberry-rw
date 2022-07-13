import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CustomerForm from 'src/components/Customer/CustomerForm'

const CREATE_CUSTOMER_MUTATION = gql`
  mutation CreateCustomerMutation($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      id
    }
  }
`

const NewCustomer = () => {
  const [createCustomer, { loading, error }] = useMutation(
    CREATE_CUSTOMER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Customer created')
        navigate(routes.customers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createCustomer({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Customer</h2>
      </header>
      <div className="rw-segment-main">
        <CustomerForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCustomer
