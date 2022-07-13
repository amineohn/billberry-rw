import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { confirmated } from 'src/utils/other'

const DELETE_EQUIPMENT_MUTATION = gql`
  mutation DeleteEquipmentMutation($id: Int!) {
    deleteEquipment(id: $id) {
      id
    }
  }
`

const Equipment = ({ equipment }) => {
  const [deleteEquipment] = useMutation(DELETE_EQUIPMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Equipment deleted')
      navigate(routes.equiment())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirmated('equipment', 'delete', id)) {
      deleteEquipment({ variables: { id } }).then((r) => console.log(r))
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Equipment {equipment.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{equipment.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{equipment.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editEquipment({ id: equipment.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(equipment.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Equipment
