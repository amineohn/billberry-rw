import CustomerCell from 'src/components/Customer/CustomerCell'

type CustomerPageProps = {
  id: number
}

const CustomerPage = ({ id }: CustomerPageProps) => {
  return <CustomerCell id={id} />
}

export default CustomerPage
