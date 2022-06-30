import type { FindWorkers } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import Workers from 'src/components/Worker/Workers'

export const QUERY = gql`
  query FindWorkers {
    workers {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No workers yet. '}
      <Link to={routes.newWorker()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ workers }: CellSuccessProps<FindWorkers>) => {
  return <Workers workers={workers} />
}
