import type { FindCustomerById } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import Customer from 'src/components/Customer/Customer'

export const QUERY = gql`
  query FindCustomerById($id: Int!) {
    customer: customer(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Customer not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ customer }: CellSuccessProps<FindCustomerById>) => {
  return <Customer customer={customer} />
}
