export const schema = gql`
  type Site {
    id: Int!
    name: String!
    tasks: [Task]!
  }

  type Query {
    sites: [Site!]! @requireAuth
    site(id: Int!): Site @requireAuth
  }

  input CreateSiteInput {
    name: String!
  }

  input UpdateSiteInput {
    name: String
  }

  type Mutation {
    createSite(input: CreateSiteInput!): Site! @requireAuth
    updateSite(id: Int!, input: UpdateSiteInput!): Site! @requireAuth
    deleteSite(id: Int!): Site! @requireAuth
  }
`
