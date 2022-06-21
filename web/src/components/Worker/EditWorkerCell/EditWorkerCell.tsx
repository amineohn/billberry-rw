import type { EditWorkerById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WorkerForm from 'src/components/Worker/WorkerForm'

export const QUERY = gql`
  query EditWorkerById($id: Int!) {
    worker: worker(id: $id) {
      id
      name
    }
  }
`
const UPDATE_WORKER_MUTATION = gql`
  mutation UpdateWorkerMutation($id: Int!, $input: UpdateWorkerInput!) {
    updateWorker(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ worker }: CellSuccessProps<EditWorkerById>) => {
  const [updateWorker, { loading, error }] = useMutation(UPDATE_WORKER_MUTATION, {
    onCompleted: () => {
      toast.success('Worker updated')
      navigate(routes.workers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateWorker({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Worker {worker.id}</h2>
      </header>
      <div className="rw-segment-main">
        <WorkerForm worker={worker} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
