import EditMaterialCell from 'src/components/Material/EditMaterialCell'

type MaterialPageProps = {
  id: number
}

const EditMaterialPage = ({ id }: MaterialPageProps) => {
  return <EditMaterialCell id={id} />
}

export default EditMaterialPage
