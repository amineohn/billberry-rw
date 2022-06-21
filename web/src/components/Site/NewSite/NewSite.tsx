import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SiteForm from 'src/components/Site/SiteForm'

const CREATE_SITE_MUTATION = gql`
  mutation CreateSiteMutation($input: CreateSiteInput!) {
    createSite(input: $input) {
      id
    }
  }
`

const NewSite = () => {
  const [createSite, { loading, error }] = useMutation(CREATE_SITE_MUTATION, {
    onCompleted: () => {
      toast.success('Site created')
      navigate(routes.sites())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createSite({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Site</h2>
      </header>
      <div className="rw-segment-main">
        <SiteForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSite
