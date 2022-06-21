import type {
  QueryResolvers,
  MutationResolvers,
  WorkerResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const workers: QueryResolvers['workers'] = () => {
  return db.worker.findMany()
}

export const worker: QueryResolvers['worker'] = ({ id }) => {
  return db.worker.findUnique({
    where: { id },
  })
}

export const createWorker: MutationResolvers['createWorker'] = ({ input }) => {
  return db.worker.create({
    data: input,
  })
}

export const updateWorker: MutationResolvers['updateWorker'] = ({
  id,
  input,
}) => {
  return db.worker.update({
    data: input,
    where: { id },
  })
}

export const deleteWorker: MutationResolvers['deleteWorker'] = ({ id }) => {
  return db.worker.delete({
    where: { id },
  })
}

export const Worker: WorkerResolvers = {
  tasks: (_obj, { root }) =>
    db.worker.findUnique({ where: { id: root.id } }).tasks(),
}
