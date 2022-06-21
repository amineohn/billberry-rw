import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MaterialForm from 'src/components/Material/MaterialForm'

const CREATE_MATERIAL_MUTATION = gql`
  mutation CreateMaterialMutation($input: CreateMaterialInput!) {
    createMaterial(input: $input) {
      id
    }
  }
`

const NewMaterial = () => {
  const [createMaterial, { loading, error }] = useMutation(CREATE_MATERIAL_MUTATION, {
    onCompleted: () => {
      toast.success('Material created')
      navigate(routes.materials())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createMaterial({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Material</h2>
      </header>
      <div className="rw-segment-main">
        <MaterialForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewMaterial
