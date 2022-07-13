import type {
  QueryResolvers,
  MutationResolvers,
  ClientResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const clients: QueryResolvers['clients'] = () => {
  return db.client.findMany()
}

export const client: QueryResolvers['client'] = ({ id }) => {
  return db.client.findUnique({
    where: { id },
  })
}

export const createClient: MutationResolvers['createClient'] = ({ input }) => {
  return db.client.create({
    data: input,
  })
}

export const updateClient: MutationResolvers['updateClient'] = ({
  id,
  input,
}) => {
  return db.client.update({
    data: input,
    where: { id },
  })
}

export const deleteClient: MutationResolvers['deleteClient'] = ({ id }) => {
  return db.client.delete({
    where: { id },
  })
}

export const Client: ClientResolvers = {
  mission: (_obj, { root }) =>
    db.client.findUnique({ where: { id: root.id } }).mission(),
  customer: (_obj, { root }) =>
    db.client.findUnique({ where: { id: root.id } }).customer(),
}
