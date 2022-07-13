import type { FindTaskById } from 'types/graphql'

import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import Task from 'src/components/Task/Task'

export const QUERY = gql`
  query FindTaskById($id: Int!) {
    task: task(id: $id) {
      id
      plannedAt
      workerId
      customerId
      siteId
      containerId
      materialId
      serviceId
      start
      end
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Task not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ task }: CellSuccessProps<FindTaskById>) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <Task
      task={task as any}
      error={undefined}
      onSave={() => null}
      loading={false}
    />
  )
}
