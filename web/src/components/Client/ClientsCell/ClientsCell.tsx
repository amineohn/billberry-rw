import type { FindClients } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Clients from 'src/components/Client/Clients'

export const QUERY = gql`
  query FindClients {
    clients {
      id
      name
      missionId
      customerId
      checked
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      <p>{'No clients yet. '}</p>
      <Link to={routes.newClient()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ clients }: CellSuccessProps<FindClients>) => {
  return <Clients clients={clients} />
}
