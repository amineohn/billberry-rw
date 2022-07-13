import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Site/SitesCell'
import { checkboxInputTag, confirmated } from 'src/utils/other'

const DELETE_SITE_MUTATION = gql`
  mutation DeleteSiteMutation($id: Int!) {
    deleteSite(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const SitesList = ({ sites }) => {
  const [deleteSite] = useMutation(DELETE_SITE_MUTATION, {
    onCompleted: () => {
      toast.success('Site deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: number) => {
    if (confirmated('site', 'delete', id)) {
      deleteSite({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Commercial</th>
            <th>Active</th>
            <th>Contact</th>
            <th>Siret</th>
            <th>Mail</th>
            <th>Phone</th>
            <th>Billing address</th>
            <th>Typeof pass</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site.id}>
              <td>{truncate(site.id)}</td>
              <td>{truncate(site.name)}</td>
              <td>{truncate(site.type)}</td>
              <td>{truncate(site.commercial)}</td>
              <td>{checkboxInputTag(site.active)}</td>
              <td>{truncate(site.contact)}</td>
              <td>{truncate(site.siret)}</td>
              <td>{truncate(site.mail)}</td>
              <td>{truncate(site.phone)}</td>
              <td>{truncate(site.billingAddress)}</td>
              <td>{truncate(site.typeofPass)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.site({ id: site.id })}
                    title={'Show site ' + site.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSite({ id: site.id })}
                    title={'Edit site ' + site.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete site ' + site.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(site.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SitesList
