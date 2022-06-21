import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Task/TasksCell'

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const TasksList = ({ tasks }) => {
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

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete task ' + id + '?')) {
      deleteTask({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
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
  )
}

export default TasksList
