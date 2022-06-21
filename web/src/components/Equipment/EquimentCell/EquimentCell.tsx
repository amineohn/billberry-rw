import type { FindEquiment } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Equiment from 'src/components/Equipment/Equiment'

export const QUERY = gql`
  query FindEquiment {
    equiment {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No equiment yet. '}
      <Link
        to={routes.newEquipment()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ equiment }: CellSuccessProps<FindEquiment>) => {
  return <Equiment equiment={equiment} />
}
