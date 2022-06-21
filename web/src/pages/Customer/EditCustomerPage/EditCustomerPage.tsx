import EditCustomerCell from 'src/components/Customer/EditCustomerCell'

type CustomerPageProps = {
  id: number
}

const EditCustomerPage = ({ id }: CustomerPageProps) => {
  return <EditCustomerCell id={id} />
}

export default EditCustomerPage
