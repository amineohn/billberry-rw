import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_MISSION_MUTATION = gql`
  mutation DeleteMissionMutation($id: Int!) {
    deleteMission(id: $id) {
      id
    }
  }
`

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

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const Mission = ({ mission }) => {
  const [deleteMission] = useMutation(DELETE_MISSION_MUTATION, {
    onCompleted: () => {
      toast.success('Mission deleted')
      navigate(routes.missions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete mission ' + id + '?')) {
      deleteMission({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Mission {mission.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{mission.id}</td>
            </tr><tr>
              <th>Status</th>
              <td>{mission.status}</td>
            </tr><tr>
              <th>Start</th>
              <td>{timeTag(mission.start)}</td>
            </tr><tr>
              <th>End</th>
              <td>{timeTag(mission.end)}</td>
            </tr><tr>
              <th>Worker id</th>
              <td>{mission.workerId}</td>
            </tr><tr>
              <th>Customer id</th>
              <td>{mission.customerId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMission({ id: mission.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(mission.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Mission
