export const schema = gql`
  type Container {
    id: Int!
    name: String!
    tasks: [Task]!
  }

  type Query {
    containers: [Container!]! @requireAuth
    container(id: Int!): Container @requireAuth
  }

  input CreateContainerInput {
    name: String!
  }

  input UpdateContainerInput {
    name: String
  }

  type Mutation {
    createContainer(input: CreateContainerInput!): Container! @requireAuth
    updateContainer(id: Int!, input: UpdateContainerInput!): Container!
      @requireAuth
    deleteContainer(id: Int!): Container! @requireAuth
  }
`
