import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Mission/MissionsCell'
import { confirmated, timeTag } from 'src/utils/other'

const DELETE_MISSION_MUTATION = gql`
  mutation DeleteMissionMutation($id: Int!) {
    deleteMission(id: $id) {
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

const MissionsList = ({ missions }) => {
  const [deleteMission] = useMutation(DELETE_MISSION_MUTATION, {
    onCompleted: () => {
      toast.success('Mission deleted')
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
    if (confirmated('mission', 'delete', id)) {
      deleteMission({ variables: { id } })
    }
  }
  interface Props {
    id: number
    status: string
    start: string
    end: string
    workerId: number
    customerId: number
  }
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Start</th>
            <th>End</th>
            <th>Worker id</th>
            <th>Customer id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission: Props) => (
            <tr key={mission.id}>
              <td>{truncate(mission.id)}</td>
              <td>{truncate(mission.status)}</td>
              <td>{timeTag(mission.start)}</td>
              <td>{timeTag(mission.end)}</td>
              <td>{truncate(mission.workerId)}</td>
              <td>{truncate(mission.customerId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.mission({ id: mission.id })}
                    title={'Show mission ' + mission.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editMission({ id: mission.id })}
                    title={'Edit mission ' + mission.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete mission ' + mission.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(mission.id)}
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

export default MissionsList
