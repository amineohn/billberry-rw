import humanize from 'humanize-string'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { RWGqlError } from '../../../../interfaces'

const DELETE_MATERIAL_MUTATION = gql`
  mutation DeleteMaterialMutation($id: Int!) {
    deleteMaterial(id: $id) {
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
const jsonDisplay = (obj: any) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const timeTag = (datetime) => {
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
  error?: RWGqlError | null
  onSave?: (data, id) => void
  material?: {
    id: number
    name: string
  }
  loading?: boolean
}

const Material = ({ material }: Props) => {
  const [deleteMaterial] = useMutation(DELETE_MATERIAL_MUTATION, {
    onCompleted: () => {
      toast.success('Material deleted')
      navigate(routes.materials())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: number) => {
    if (confirm('Are you sure you want to delete material ' + id + '?')) {
      deleteMaterial({ variables: { id } }).then((r) => console.log(r))
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Material {material.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{material.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{material.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editMaterial({ id: material.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(material.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Material
