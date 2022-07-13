import type { FindTasks } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import Tasks from 'src/components/Task/Tasks'

export const QUERY = gql`
  query FindTasks {
    tasks {
      id
      plannedAt
      workerId
      customerId
      siteId
      containerId
      materialId
      serviceId
      start
      end
      worker {
        name
      }
      customer {
        name
      }
      site {
        name
      }
      service {
        name
      }
      container {
        name
      }
      material {
        name
      }
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      <p>{'No tasks yet.'}</p>
      <Link to={routes.newTask()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ tasks }: CellSuccessProps<FindTasks>) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Tasks tasks={tasks} />
}
