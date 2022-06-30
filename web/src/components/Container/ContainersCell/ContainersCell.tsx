import type { FindContainers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import Containers from 'src/components/Container/Containers'

export const QUERY = gql`
  query FindContainers {
    containers {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No containers yet. '}
      <Link to={routes.newContainer()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ containers }: CellSuccessProps<FindContainers>) => {
  return <Containers containers={containers} />
}
