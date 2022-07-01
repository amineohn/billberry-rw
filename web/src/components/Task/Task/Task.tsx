import humanize from 'humanize-string'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { RWGqlError } from '../../../../interfaces'

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime: string) => {
  //const dayAndNight = datetime.split('T')[1].split(':')[0]
  const dayAndNight = new Date(datetime).toUTCString()
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {dayAndNight}
      </time>
    )
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

interface Props {
  error: RWGqlError | null
  onSave: (data, id) => void
  task?: {
    workerId: number
    customerId: number
    siteId: number
    containerId: number
    materialId: number
    serviceId: number
    plannedAt: string
    id: number
    start: string
    end: string
  }
  loading: boolean
}

const Task = ({ task }: Props) => {
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task deleted')
      navigate(routes.tasks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: number) => {
    if (confirm('Are you sure you want to delete task ' + id + '?')) {
      deleteTask({ variables: { id } }).then((r) => console.log(r))
    }
  }
  // console.log(task)
  return (
    <>
      {/*jsonDisplay(task)*/}
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Task {task.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{task.id}</td>
            </tr>
            <tr>
              <th>Planned at</th>
              <td>{timeTag(task.plannedAt)}</td>
            </tr>
            <tr>
              <th>Worker id</th>
              <td>{task.workerId}</td>
            </tr>
            <tr>
              <th>Customer id</th>
              <td>{task.customerId}</td>
            </tr>
            <tr>
              <th>Site id</th>
              <td>{task.siteId}</td>
            </tr>
            <tr>
              <th>Container id</th>
              <td>{task.containerId}</td>
            </tr>
            <tr>
              <th>Material id</th>
              <td>{task.materialId}</td>
            </tr>
            <tr>
              <th>Service id</th>
              <td>{task.serviceId}</td>
            </tr>
            <tr>
              <th>Start</th>
              <td>{timeTag(task.start)}</td>
            </tr>
            <tr>
              <th>End</th>
              <td>{timeTag(task.end)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTask({ id: task.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(task.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Task
