import MaterialCell from 'src/components/Material/MaterialCell'

type MaterialPageProps = {
  id: number
}

const MaterialPage = ({ id }: MaterialPageProps) => {
  return <MaterialCell id={id} />
}

export default MaterialPage
