import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { confirmated, timeTag } from 'src/utils/other'

import { RWGqlError, TaskProps } from '../../../../interfaces'

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`

const Task = ({ task }: TaskProps) => {
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
    if (confirmated('task', 'delete', id)) {
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
