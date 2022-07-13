import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, confirmated } from 'src/utils/other'
import { SiteProps } from '../../../../interfaces'

const DELETE_SITE_MUTATION = gql`
  mutation DeleteSiteMutation($id: Int!) {
    deleteSite(id: $id) {
      id
    }
  }
`
const Site = ({ site }: SiteProps) => {
  const [deleteSite] = useMutation(DELETE_SITE_MUTATION, {
    onCompleted: () => {
      toast.success('Site deleted')
      navigate(routes.sites())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: number) => {
    if (confirmated('site', 'delete', id)) {
      deleteSite({ variables: { id } }).then((r) => console.log(r))
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Site {site.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody key={site.id}>
            <tr>
              <th>Id</th>
              <td>{site.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{site.name}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{site.type}</td>
            </tr>
            <tr>
              <th>Commercial</th>
              <td>{site.commercial}</td>
            </tr>
            <tr>
              <th>Active</th>
              <td>{checkboxInputTag(site.active)}</td>
            </tr>
            <tr>
              <th>Contact</th>
              <td>{site.contact}</td>
            </tr>
            <tr>
              <th>Siret</th>
              <td>{site.checkSiret(site.siret)}</td>
            </tr>
            <tr>
              <th>Mail</th>
              <td>{site.mail}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{site.phone}</td>
            </tr>
            <tr>
              <th>Billing address</th>
              <td>{site.billingAddress}</td>
            </tr>
            <tr>
              <th>Typeof pass</th>
              <td>{site.typeofPass}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSite({ id: site.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(site.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Site
