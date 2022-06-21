import EditContainerCell from 'src/components/Container/EditContainerCell'

type ContainerPageProps = {
  id: number
}

const EditContainerPage = ({ id }: ContainerPageProps) => {
  return <EditContainerCell id={id} />
}

export default EditContainerPage
