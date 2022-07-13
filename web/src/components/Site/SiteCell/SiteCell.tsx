import type { FindSiteById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Site from 'src/components/Site/Site'

export const QUERY = gql`
  query FindSiteById($id: Int!) {
    site: site(id: $id) {
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

export const Empty = () => <div>Site not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ site }: CellSuccessProps<FindSiteById>) => {
  return <Site site={site} />
}
