import type {
  ContainerResolvers,
  MutationResolvers,
  QueryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const containers: QueryResolvers['containers'] = () => {
  return db.container.findMany()
}

export const container: QueryResolvers['container'] = ({ id }) => {
  return db.container.findUnique({
    where: { id },
  })
}

export const createContainer: MutationResolvers['createContainer'] = ({
  input,
}) => {
  return db.container.create({
    data: input,
  })
}

export const updateContainer: MutationResolvers['updateContainer'] = ({
  id,
  input,
}) => {
  return db.container.update({
    data: input,
    where: { id },
  })
}

export const deleteContainer: MutationResolvers['deleteContainer'] = ({
  id,
}) => {
  return db.container.delete({
    where: { id },
  })
}

export const Container: ContainerResolvers = {
  tasks: (_obj, { root }) =>
    db.container.findUnique({ where: { id: root.id } }).tasks(),
}
