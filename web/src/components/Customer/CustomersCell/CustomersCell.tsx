import type { FindCustomers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import Customers from 'src/components/Customer/Customers'

export const QUERY = gql`
  query FindCustomers {
    customers {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      <p>{'No customers yet. '}</p>
      <Link to={routes.newCustomer()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ customers }: CellSuccessProps<FindCustomers>) => {
  return <Customers customers={customers} />
}
