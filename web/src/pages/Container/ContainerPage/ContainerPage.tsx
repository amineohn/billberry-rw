import ContainerCell from 'src/components/Container/ContainerCell'

type ContainerPageProps = {
  id: number
}

const ContainerPage = ({ id }: ContainerPageProps) => {
  return <ContainerCell id={id} />
}

export default ContainerPage
