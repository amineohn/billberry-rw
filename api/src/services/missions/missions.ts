import type {
  MissionResolvers,
  MutationResolvers,
  QueryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const missions: QueryResolvers['missions'] = () => {
  return db.mission.findMany()
}

export const mission: QueryResolvers['mission'] = ({ id }) => {
  return db.mission.findUnique({
    where: { id },
  })
}

export const createMission: MutationResolvers['createMission'] = ({
  input,
}) => {
  return db.mission.create({
    data: input,
  })
}

export const updateMission: MutationResolvers['updateMission'] = ({
  id,
  input,
}) => {
  return db.mission.update({
    data: input,
    where: { id },
  })
}

export const deleteMission: MutationResolvers['deleteMission'] = ({ id }) => {
  return db.mission.delete({
    where: { id },
  })
}

export const Mission: MissionResolvers = {
  worker: (_obj, { root }) =>
    db.mission.findUnique({ where: { id: root.id } }).worker(),
  customer: (_obj, { root }) =>
    db.mission.findUnique({ where: { id: root.id } }).customer(),
}
