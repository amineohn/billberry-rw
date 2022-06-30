import MissionCell from 'src/components/Mission/MissionCell'

type MissionPageProps = {
  id: number
}

const MissionPage = ({ id }: MissionPageProps) => {
  return <MissionCell id={id} />
}

export default MissionPage
