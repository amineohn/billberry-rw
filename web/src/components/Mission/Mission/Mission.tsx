import humanize from 'humanize-string'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_MISSION_MUTATION = gql`
  mutation DeleteMissionMutation($id: Int!) {
    deleteMission(id: $id) {
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
const jsonDisplay = (
  value: any,
  replacer?: (this: any, key: string, value: any) => any,
  space?: string | number
) => {
  return (
    <pre>
      <code>{JSON.stringify(value, replacer, space)}</code>
    </pre>
  )
}

const timeTag = (datetime: string) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />
}

interface Props {
  mission: {
    id: number
    status: string
    start: string
    end: string
    workerId: number
    customerId: number
  }
}

const Mission = ({ mission }: Props) => {
  const [deleteMission] = useMutation(DELETE_MISSION_MUTATION, {
    onCompleted: () => {
      toast.success('Mission deleted')
      navigate(routes.missions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: number) => {
    if (confirm('Are you sure you want to delete mission ' + id + '?')) {
      deleteMission({ variables: { id } }).then((r) => console.log(r))
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Mission {mission.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{mission.id}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{mission.status}</td>
            </tr>
            <tr>
              <th>Start</th>
              <td>{timeTag(mission.start)}</td>
            </tr>
            <tr>
              <th>End</th>
              <td>{timeTag(mission.end)}</td>
            </tr>
            <tr>
              <th>Worker id</th>
              <td>{mission.workerId}</td>
            </tr>
            <tr>
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
