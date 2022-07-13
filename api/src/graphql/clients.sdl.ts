export const schema = gql`
  type Client {
    id: Int!
    name: String!
    mission: Mission!
    missionId: Int!
    customer: Customer!
    customerId: Int!
    checked: Boolean!
  }

  type Query {
    clients: [Client!]! @requireAuth
    client(id: Int!): Client @requireAuth
  }

  input CreateClientInput {
    name: String!
    missionId: Int!
    customerId: Int!
    checked: Boolean!
  }

  input UpdateClientInput {
    name: String
    missionId: Int
    customerId: Int
    checked: Boolean
  }

  type Mutation {
    createClient(input: CreateClientInput!): Client! @requireAuth
    updateClient(id: Int!, input: UpdateClientInput!): Client! @requireAuth
    deleteClient(id: Int!): Client! @requireAuth
  }
`
