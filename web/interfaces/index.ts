import { GraphQLError } from 'graphql'

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
