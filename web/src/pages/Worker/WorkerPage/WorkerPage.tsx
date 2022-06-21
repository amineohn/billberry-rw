import WorkerCell from 'src/components/Worker/WorkerCell'

type WorkerPageProps = {
  id: number
}

const WorkerPage = ({ id }: WorkerPageProps) => {
  return <WorkerCell id={id} />
}

export default WorkerPage
