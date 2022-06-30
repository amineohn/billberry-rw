import type { FindMissions } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import Missions from 'src/components/Mission/Missions'

export const QUERY = gql`
  query FindMissions {
    missions {
      id
      status
      start
      end
      workerId
      customerId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No missions yet. '}
      <Link to={routes.newMission()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ missions }: CellSuccessProps<FindMissions>) => {
  return <Missions missions={missions} />
}
