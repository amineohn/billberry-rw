import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ClientForm from 'src/components/Client/ClientForm'

const CREATE_CLIENT_MUTATION = gql`
  mutation CreateClientMutation($input: CreateClientInput!) {
    createClient(input: $input) {
      id
    }
  }
`

const NewClient = () => {
  const [createClient, { loading, error }] = useMutation(CREATE_CLIENT_MUTATION, {
    onCompleted: () => {
      toast.success('Client created')
      navigate(routes.clients())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { missionId: parseInt(input.missionId), customerId: parseInt(input.customerId), })
    createClient({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Client</h2>
      </header>
      <div className="rw-segment-main">
        <ClientForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewClient
