import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Equipment/EquimentCell'
import { confirmated } from 'src/utils/other'

const DELETE_EQUIPMENT_MUTATION = gql`
  mutation DeleteEquipmentMutation($id: Int!) {
    deleteEquipment(id: $id) {
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

const EquimentList = ({ equiment }) => {
  const [deleteEquipment] = useMutation(DELETE_EQUIPMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Equipment deleted')
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
    if (confirmated('equipment', 'delete', id)) {
      deleteEquipment({ variables: { id } }).then((r) => console.log(r))
    }
  }

  interface Props {
    id: number
    name: string
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {equiment.map((equipment: Props) => (
            <tr key={equipment.id}>
              <td>{truncate(equipment.id)}</td>
              <td>{truncate(equipment.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.equipment({ id: equipment.id })}
                    title={'Show equipment ' + equipment.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editEquipment({ id: equipment.id })}
                    title={'Edit equipment ' + equipment.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete equipment ' + equipment.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(equipment.id)}
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

export default EquimentList
