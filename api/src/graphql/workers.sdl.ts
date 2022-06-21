export const schema = gql`
  type Worker {
    id: Int!
    name: String!
    tasks: [Task]!
  }

  type Query {
    workers: [Worker!]! @requireAuth
    worker(id: Int!): Worker @requireAuth
  }

  input CreateWorkerInput {
    name: String!
  }

  input UpdateWorkerInput {
    name: String
  }

  type Mutation {
    createWorker(input: CreateWorkerInput!): Worker! @requireAuth
    updateWorker(id: Int!, input: UpdateWorkerInput!): Worker! @requireAuth
    deleteWorker(id: Int!): Worker! @requireAuth
  }
`
