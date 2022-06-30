import type { EditServiceById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ServiceForm from 'src/components/Service/ServiceForm'

export const QUERY = gql`
  query EditServiceById($id: Int!) {
    service: service(id: $id) {
      id
      name
    }
  }
`
const UPDATE_SERVICE_MUTATION = gql`
  mutation UpdateServiceMutation($id: Int!, $input: UpdateServiceInput!) {
    updateService(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ service }: CellSuccessProps<EditServiceById>) => {
  const [updateService, { loading, error }] = useMutation(
    UPDATE_SERVICE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Service updated')
        navigate(routes.services())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateService({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Service {service.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ServiceForm
          service={service}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
