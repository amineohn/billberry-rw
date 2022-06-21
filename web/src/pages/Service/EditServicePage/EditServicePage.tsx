import EditServiceCell from 'src/components/Service/EditServiceCell'

type ServicePageProps = {
  id: number
}

const EditServicePage = ({ id }: ServicePageProps) => {
  return <EditServiceCell id={id} />
}

export default EditServicePage
