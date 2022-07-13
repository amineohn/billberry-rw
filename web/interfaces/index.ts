import { GraphQLError } from 'graphql'
import { ReactNode } from 'react'

interface ServerParseError extends Error {
  response: Response
  statusCode: number
  bodyText: string
}

interface ServerError extends Error {
  response: Response
  statusCode: number
  result: Record<string, any>
}

export interface RWGqlError {
  message: string
  graphQLErrors: ReadonlyArray<GraphQLError>
  networkError: Error | ServerParseError | ServerError | null
}
export interface SiteProps {
  site: {
    id: number
    name: string
    type: string
    commercial: string
    active: boolean
    contact: string
    siret: string
    mail: string
    phone: string
    billingAddress: string
    typeofPass: string
    checkSiret: (siret: string) => Promise<boolean>
  }
}
export interface CalendarProps {
  tasks: [
    {
      id: number
      plannedAt: string
      workerId: number
      customerId: number
      siteId: number
      containerId: number
      serviceId: number
      equipmentId: number
      materialId: number
      worker: {
        name: string
      }
      customer: {
        name: string
      }
      site: {
        name: string
      }
      service: {
        name: string
      }
      container: {
        name: string
      }
      material: {
        name: string
      }
      start: string
      end: string
    }
  ]
}
export interface ContainerProps {
  container: {
    id: number
    name: string
  }
}
export interface DataProps {
  id: number
  value: string
  name: string
}

export interface ComboboxProps {
  data: string[]
  query: string
  onChange: () => void
  setQuery: (query: string) => void
  placeholder?: string
  value?: string
}
export interface EventProps {
  event: {
    id: number
  }
  start: string
  end: string
}
export interface AlertProps {
  title: string
  content: ReactNode
  type: 'button' | 'submit'
  buttonText?: string
  isOpen: boolean
  closeModal: () => void
}
export interface TaskProps {
  error: RWGqlError | null
  onSave: (data, id) => void
  task?: {
    workerId: number
    customerId: number
    siteId: number
    containerId: number
    materialId: number
    serviceId: number
    plannedAt: string
    id: number
    start: string
    end: string
  }
  loading: boolean
}
