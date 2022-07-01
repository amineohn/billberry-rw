import type { FindMissionQuery, FindMissionQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindMissionQuery($id: Int!) {
    mission: mission(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindMissionQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  mission,
}: CellSuccessProps<FindMissionQuery, FindMissionQueryVariables>) => {
  return <div>{JSON.stringify(mission)}</div>
}
