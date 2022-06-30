export const schema = gql`
  type Mission {
    id: Int!
    status: String!
    start: DateTime!
    end: DateTime!
    worker: Worker!
    workerId: Int!
    customer: Customer!
    customerId: Int!
  }

  type Query {
    missions: [Mission!]! @requireAuth
    mission(id: Int!): Mission @requireAuth
  }

  input CreateMissionInput {
    status: String!
    start: DateTime!
    end: DateTime!
    workerId: Int!
    customerId: Int!
  }

  input UpdateMissionInput {
    status: String
    start: DateTime
    end: DateTime
    workerId: Int
    customerId: Int
  }

  type Mutation {
    createMission(input: CreateMissionInput!): Mission! @requireAuth
    updateMission(id: Int!, input: UpdateMissionInput!): Mission! @requireAuth
    deleteMission(id: Int!): Mission! @requireAuth
  }
`
