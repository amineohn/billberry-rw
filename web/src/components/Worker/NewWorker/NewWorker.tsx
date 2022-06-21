import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WorkerForm from 'src/components/Worker/WorkerForm'

const CREATE_WORKER_MUTATION = gql`
  mutation CreateWorkerMutation($input: CreateWorkerInput!) {
    createWorker(input: $input) {
      id
    }
  }
`

const NewWorker = () => {
  const [createWorker, { loading, error }] = useMutation(CREATE_WORKER_MUTATION, {
    onCompleted: () => {
      toast.success('Worker created')
      navigate(routes.workers())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createWorker({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Worker</h2>
      </header>
      <div className="rw-segment-main">
        <WorkerForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewWorker
