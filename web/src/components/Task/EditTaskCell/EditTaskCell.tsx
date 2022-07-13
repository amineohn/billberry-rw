import type { EditTaskById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TaskForm from 'src/components/Task/TaskForm'

export const QUERY = gql`
  query EditTaskById($id: Int!) {
    task: task(id: $id) {
      id
      plannedAt
      workerId
      customerId
      siteId
      containerId
      materialId
      serviceId
      title
      start
      end
    }
  }
`
const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTaskMutation($id: Int!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
      id
      plannedAt
      workerId
      customerId
      siteId
      containerId
      materialId
      serviceId
      title
      start
      end
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ task }: CellSuccessProps<EditTaskById>) => {
  const [updateTask, { loading, error }] = useMutation(UPDATE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task updated')
      navigate(routes.tasks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const parseDateTime = (value: string): Date => {
    if (value) {
      return value.replace(/:\d{2}\.\d{3}\w/, '') as any
    }
  }

  interface Data {
    workerId: number
    customerId: number
    siteId: number
    containerId: number
    materialId: number
    serviceId: number
    title: string
    start: string
    end: string
  }

  const onSave = (input: Data, id) => {
    const castInput = Object.assign(input, {
      id: parseInt(id),
      workerId: input.workerId,
      customerId: input.customerId,
      siteId: input.siteId,
      containerId: input.containerId,
      materialId: input.materialId,
      serviceId: input.serviceId,
      start: parseDateTime(input.start),
      end: parseDateTime(input.end),
    })
    updateTask({ variables: { id, input: castInput } }).then((r) =>
      console.log(r)
    )
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Task {task.id}</h2>
      </header>
      <div className="rw-segment-main">
        <TaskForm task={task} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
