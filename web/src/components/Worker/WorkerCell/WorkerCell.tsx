import type { FindWorkerById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Worker from 'src/components/Worker/Worker'

export const QUERY = gql`
  query FindWorkerById($id: Int!) {
    worker: worker(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Worker not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ worker }: CellSuccessProps<FindWorkerById>) => {
  return <Worker worker={worker} />
}
