import ServiceCell from 'src/components/Service/ServiceCell'

type ServicePageProps = {
  id: number
}

const ServicePage = ({ id }: ServicePageProps) => {
  return <ServiceCell id={id} />
}

export default ServicePage
