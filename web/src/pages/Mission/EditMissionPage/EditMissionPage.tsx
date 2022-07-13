import EditMissionCell from 'src/components/Mission/EditMissionCell'

type MissionPageProps = {
  id: number
}

const EditMissionPage = ({ id }: MissionPageProps) => {
  return <EditMissionCell id={id} />
}

export default EditMissionPage
