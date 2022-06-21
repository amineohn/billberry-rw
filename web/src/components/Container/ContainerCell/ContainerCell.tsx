import type { FindContainerById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Container from 'src/components/Container/Container'

export const QUERY = gql`
  query FindContainerById($id: Int!) {
    container: container(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Container not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ container }: CellSuccessProps<FindContainerById>) => {
  return <Container container={container} />
}
