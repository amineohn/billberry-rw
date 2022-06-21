export const schema = gql`
  type Material {
    id: Int!
    name: String!
    tasks: [Task]!
  }

  type Query {
    materials: [Material!]! @requireAuth
    material(id: Int!): Material @requireAuth
  }

  input CreateMaterialInput {
    name: String!
  }

  input UpdateMaterialInput {
    name: String
  }

  type Mutation {
    createMaterial(input: CreateMaterialInput!): Material! @requireAuth
    updateMaterial(id: Int!, input: UpdateMaterialInput!): Material!
      @requireAuth
    deleteMaterial(id: Int!): Material! @requireAuth
  }
`
