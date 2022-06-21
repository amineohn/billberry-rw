export const schema = gql`
  type Service {
    id: Int!
    name: String!
    tasks: [Task]!
  }

  type Query {
    services: [Service!]! @requireAuth
    service(id: Int!): Service @requireAuth
  }

  input CreateServiceInput {
    name: String!
  }

  input UpdateServiceInput {
    name: String
  }

  type Mutation {
    createService(input: CreateServiceInput!): Service! @requireAuth
    updateService(id: Int!, input: UpdateServiceInput!): Service! @requireAuth
    deleteService(id: Int!): Service! @requireAuth
  }
`
