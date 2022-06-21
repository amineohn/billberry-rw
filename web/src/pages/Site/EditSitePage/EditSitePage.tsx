import EditSiteCell from 'src/components/Site/EditSiteCell'

type SitePageProps = {
  id: number
}

const EditSitePage = ({ id }: SitePageProps) => {
  return <EditSiteCell id={id} />
}

export default EditSitePage
