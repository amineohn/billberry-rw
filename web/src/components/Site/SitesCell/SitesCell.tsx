import type { FindSites } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Sites from 'src/components/Site/Sites'

export const QUERY = gql`
  query FindSites {
    sites {
      id
      name
      type
      commercial
      active
      contact
      siret
      mail
      phone
      billingAddress
      typeofPass
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No sites yet. '}
      <Link
        to={routes.newSite()}
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

export const Success = ({ sites }: CellSuccessProps<FindSites>) => {
  return <Sites sites={sites} />
}
