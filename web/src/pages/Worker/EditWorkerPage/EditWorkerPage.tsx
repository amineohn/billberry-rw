import EditWorkerCell from 'src/components/Worker/EditWorkerCell'

type WorkerPageProps = {
  id: number
}

const EditWorkerPage = ({ id }: WorkerPageProps) => {
  return <EditWorkerCell id={id} />
}

export default EditWorkerPage
