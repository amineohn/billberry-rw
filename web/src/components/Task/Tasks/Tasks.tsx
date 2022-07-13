import moment from 'moment'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Calenda from 'src/components/Calendar'
import { QUERY } from 'src/components/Task/TasksCell'
import { confirmated, convertedDay, timeTag } from 'src/utils/other'

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`
const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

interface Props {
  tasks?: [
    {
      id: number
      plannedAt: string
      workerId: number
      customerId: number
      siteId: number
      containerId: number
      serviceId: number
      equipmentId: number
      materialId: number
      worker: {
        name: string
      }
      customer: {
        name: string
      }
      site: {
        name: string
      }
      service: {
        name: string
      }
      container: {
        name: string
      }
      material: {
        name: string
      }
      start: string
      end: string
    }
  ]
}

export const EDIT_TASK_QUERY = gql`
  query EditTaskById($id: Int!) {
    task: task(id: $id) {
      id
      plannedAt
      start
      end
      title
      workerId
      customerId
      siteId
      containerId
      materialId
      serviceId
    }
  }
`
const TasksList = ({ tasks }: Props) => {
  moment.locale('fr')
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const onDeleteClick = (id: number) => {
    if (confirmated('task', 'delete', id)) {
      deleteTask({ variables: { id } }).then((r) => console.log(r))
    }
  }
  return (
    <div className="rw-table-wrapper-responsive space-y-2">
      <Calenda tasks={tasks} />
      <div className={'rw-segment'}>
        <table className="rw-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Planned at</th>
              <th>Worker id</th>
              <th>Customer id</th>
              <th>Site id</th>
              <th>Container id</th>
              <th>Material id</th>
              <th>Service id</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{truncate(task.id)}</td>
                <td>{timeTag(task.plannedAt)}</td>
                <td>{truncate(task.workerId)}</td>
                <td>{truncate(task.customerId)}</td>
                <td>{truncate(task.siteId)}</td>
                <td>{truncate(task.containerId)}</td>
                <td>{truncate(task.materialId)}</td>
                <td>{truncate(task.serviceId)}</td>
                <td>{convertedDay(task.start, false)}</td>
                <td>{convertedDay(task.end, false)}</td>
                <td>
                  <nav className="rw-table-actions">
                    <Link
                      to={routes.task({ id: task.id })}
                      title={'Show task ' + task.id + ' detail'}
                      className="rw-button rw-button-small"
                    >
                      Show
                    </Link>
                    <Link
                      to={routes.editTask({ id: task.id })}
                      title={'Edit task ' + task.id}
                      className="rw-button rw-button-small rw-button-blue"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      title={'Delete task ' + task.id}
                      className="rw-button rw-button-small rw-button-red"
                      onClick={() => onDeleteClick(task.id)}
                    >
                      Delete
                    </button>
                  </nav>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TasksList
