export const schema = gql`
  type Task {
    id: Int!
    plannedAt: DateTime!
    worker: Worker!
    workerId: Int!
    customer: Customer!
    customerId: Int!
    site: Site!
    siteId: Int!
    container: Container!
    containerId: Int!
    material: Material!
    materialId: Int!
    service: Service!
    serviceId: Int!
    start: DateTime!
    end: DateTime!
    title: String!
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth
  }

  input CreateTaskInput {
    plannedAt: DateTime!
    workerId: Int!
    customerId: Int!
    siteId: Int!
    containerId: Int!
    materialId: Int!
    serviceId: Int!
    start: DateTime
    end: DateTime
    title: String
  }

  input UpdateTaskInput {
    id: Int!
    plannedAt: DateTime
    workerId: Int
    customerId: Int
    siteId: Int
    containerId: Int
    materialId: Int
    serviceId: Int
    start: DateTime
    end: DateTime
    title: String
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
