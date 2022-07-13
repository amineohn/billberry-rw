import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { confirmated, timeTag } from 'src/utils/other'

const DELETE_MISSION_MUTATION = gql`
  mutation DeleteMissionMutation($id: Int!) {
    deleteMission(id: $id) {
      id
    }
  }
`

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
    if (confirmated('mission', 'delete', id)) {
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
