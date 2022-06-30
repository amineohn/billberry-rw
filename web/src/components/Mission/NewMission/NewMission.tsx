import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MissionForm from 'src/components/Mission/MissionForm'

const CREATE_MISSION_MUTATION = gql`
  mutation CreateMissionMutation($input: CreateMissionInput!) {
    createMission(input: $input) {
      id
    }
  }
`

const NewMission = () => {
  const [createMission, { loading, error }] = useMutation(CREATE_MISSION_MUTATION, {
    onCompleted: () => {
      toast.success('Mission created')
      navigate(routes.missions())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { workerId: parseInt(input.workerId), customerId: parseInt(input.customerId), })
    createMission({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Mission</h2>
      </header>
      <div className="rw-segment-main">
        <MissionForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewMission
