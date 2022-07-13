import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ContainerForm from 'src/components/Container/ContainerForm'

const CREATE_CONTAINER_MUTATION = gql`
  mutation CreateContainerMutation($input: CreateContainerInput!) {
    createContainer(input: $input) {
      id
    }
  }
`

const NewContainer = () => {
  const [createContainer, { loading, error }] = useMutation(
    CREATE_CONTAINER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Container created')
        navigate(routes.containers())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createContainer({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Container</h2>
      </header>
      <div className="rw-segment-main">
        <ContainerForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewContainer
