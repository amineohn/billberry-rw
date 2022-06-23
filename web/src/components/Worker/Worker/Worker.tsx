import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { RWGqlError } from '../../../../interfaces'

const DELETE_WORKER_MUTATION = gql`
  mutation DeleteWorkerMutation($id: Int!) {
    deleteWorker(id: $id) {
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
interface Props {
  error: RWGqlError | null
  onSave: (data, id) => void
  worker: {
    name: string
    id: number
  }
  loading: boolean
}
const Worker = ({ worker }: Props) => {
  const [deleteWorker] = useMutation(DELETE_WORKER_MUTATION, {
    onCompleted: () => {
      toast.success('Worker deleted')
      navigate(routes.workers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete worker ' + id + '?')) {
      deleteWorker({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Worker {worker.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{worker.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{worker.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editWorker({ id: worker.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(worker.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Worker
