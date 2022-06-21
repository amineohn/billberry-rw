import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const equiment: QueryResolvers['equiment'] = () => {
  return db.equipment.findMany()
}

export const equipment: QueryResolvers['equipment'] = ({ id }) => {
  return db.equipment.findUnique({
    where: { id },
  })
}

export const createEquipment: MutationResolvers['createEquipment'] = ({
  input,
}) => {
  return db.equipment.create({
    data: input,
  })
}

export const updateEquipment: MutationResolvers['updateEquipment'] = ({
  id,
  input,
}) => {
  return db.equipment.update({
    data: input,
    where: { id },
  })
}

export const deleteEquipment: MutationResolvers['deleteEquipment'] = ({
  id,
}) => {
  return db.equipment.delete({
    where: { id },
  })
}
