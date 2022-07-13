import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { confirmated } from 'src/utils/other'

const DELETE_CUSTOMER_MUTATION = gql`
  mutation DeleteCustomerMutation($id: Int!) {
    deleteCustomer(id: $id) {
      id
    }
  }
`

const Customer = ({ customer }) => {
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER_MUTATION, {
    onCompleted: () => {
      toast.success('Customer deleted')
      navigate(routes.customers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirmated('customer', 'delete', id)) {
      deleteCustomer({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Customer {customer.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{customer.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{customer.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCustomer({ id: customer.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(customer.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Customer
