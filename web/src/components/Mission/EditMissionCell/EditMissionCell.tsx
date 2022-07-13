// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
// @ts-ignore
import { EditMissionById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MissionForm from 'src/components/Mission/MissionForm'

export const QUERY = gql`
  query EditMissionById($id: Int!) {
    mission: mission(id: $id) {
      id
      status
      start
      end
      workerId
      customerId
    }
  }
`
const UPDATE_MISSION_MUTATION = gql`
  mutation UpdateMissionMutation($id: Int!, $input: UpdateMissionInput!) {
    updateMission(id: $id, input: $input) {
      id
      status
      start
      end
      workerId
      customerId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ mission }: CellSuccessProps<EditMissionById>) => {
  const [updateMission, { loading, error }] = useMutation(
    UPDATE_MISSION_MUTATION,
    {
      onCompleted: () => {
        toast.success('Mission updated')
        navigate(routes.missions())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      workerId: parseInt(input.workerId),
      customerId: parseInt(input.customerId),
    })
    updateMission({ variables: { id, input: castInput } }).then((r) =>
      console.log(r)
    )
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Mission {mission.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <MissionForm
          mission={mission}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
