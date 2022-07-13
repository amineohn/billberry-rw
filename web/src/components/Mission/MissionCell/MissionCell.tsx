import type { FindMissionById } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import Mission from 'src/components/Mission/Mission'

export const QUERY = gql`
  query FindMissionById($id: Int!) {
    mission: mission(id: $id) {
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

export const Empty = () => <div>Mission not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ mission }: CellSuccessProps<FindMissionById>) => {
  return <Mission mission={mission} />
}
