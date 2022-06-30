import type {
  MaterialResolvers,
  MutationResolvers,
  QueryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const materials: QueryResolvers['materials'] = () => {
  return db.material.findMany()
}

export const material: QueryResolvers['material'] = ({ id }) => {
  return db.material.findUnique({
    where: { id },
  })
}

export const createMaterial: MutationResolvers['createMaterial'] = ({
  input,
}) => {
  return db.material.create({
    data: input,
  })
}

export const updateMaterial: MutationResolvers['updateMaterial'] = ({
  id,
  input,
}) => {
  return db.material.update({
    data: input,
    where: { id },
  })
}

export const deleteMaterial: MutationResolvers['deleteMaterial'] = ({ id }) => {
  return db.material.delete({
    where: { id },
  })
}

export const Material: MaterialResolvers = {
  tasks: (_obj, { root }) =>
    db.material.findUnique({ where: { id: root.id } }).tasks(),
}
