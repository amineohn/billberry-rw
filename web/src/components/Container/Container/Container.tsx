import humanize from 'humanize-string'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_CONTAINER_MUTATION = gql`
  mutation DeleteContainerMutation($id: Int!) {
    deleteContainer(id: $id) {
      id
    }
  }
`

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

interface Props {
  container: {
    id: number
    name: string
  }
}

const Container = ({ container }: Props) => {
  const [deleteContainer] = useMutation(DELETE_CONTAINER_MUTATION, {
    onCompleted: () => {
      toast.success('Container deleted')
      navigate(routes.containers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete container ' + id + '?')) {
      deleteContainer({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Container {container.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{container.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{container.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editContainer({ id: container.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(container.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Container
