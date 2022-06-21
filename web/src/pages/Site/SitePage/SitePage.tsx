import SiteCell from 'src/components/Site/SiteCell'

type SitePageProps = {
  id: number
}

const SitePage = ({ id }: SitePageProps) => {
  return <SiteCell id={id} />
}

export default SitePage
