import type { FindServiceById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Service from 'src/components/Service/Service'

export const QUERY = gql`
  query FindServiceById($id: Int!) {
    service: service(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Service not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ service }: CellSuccessProps<FindServiceById>) => {
  return (
    <Service
      service={service}
      error={undefined}
      onSave={() => {}}
      loading={false}
    />
  )
}
