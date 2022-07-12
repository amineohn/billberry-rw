export const schema = gql`
  type Site {
    id: Int!
    name: String!
    type: String!
    commercial: String!
    active: Boolean!
    contact: String!
    siret: String!
    mail: String!
    phone: String!
    billingAddress: String!
    typeofPass: String!
    tasks: [Task]!
  }

  type Query {
    sites: [Site!]! @requireAuth
    site(id: Int!): Site @requireAuth
  }

  input CreateSiteInput {
    name: String!
    type: String!
    commercial: String!
    active: Boolean!
    contact: String!
    siret: String!
    mail: String!
    phone: String!
    billingAddress: String!
    typeofPass: String!
  }

  input UpdateSiteInput {
    name: String
    type: String
    commercial: String
    active: Boolean
    contact: String
    siret: String
    mail: String
    phone: String
    billingAddress: String
    typeofPass: String
  }

  type Mutation {
    createSite(input: CreateSiteInput!): Site! @requireAuth
    updateSite(id: Int!, input: UpdateSiteInput!): Site! @requireAuth
    deleteSite(id: Int!): Site! @requireAuth
  }
`
