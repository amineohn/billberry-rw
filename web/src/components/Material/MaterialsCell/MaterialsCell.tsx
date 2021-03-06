import type { FindMaterials } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import Materials from 'src/components/Material/Materials'

export const QUERY = gql`
  query FindMaterials {
    materials {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      <p>{'No materials yet. '}</p>
      <Link to={routes.newMaterial()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ materials }: CellSuccessProps<FindMaterials>) => {
  return <Materials materials={materials} />
}
