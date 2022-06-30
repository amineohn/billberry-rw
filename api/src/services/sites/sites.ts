import type {
  MutationResolvers,
  QueryResolvers,
  SiteResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const sites: QueryResolvers['sites'] = () => {
  return db.site.findMany()
}

export const site: QueryResolvers['site'] = ({ id }) => {
  return db.site.findUnique({
    where: { id },
  })
}

export const createSite: MutationResolvers['createSite'] = ({ input }) => {
  return db.site.create({
    data: input,
  })
}

export const updateSite: MutationResolvers['updateSite'] = ({ id, input }) => {
  return db.site.update({
    data: input,
    where: { id },
  })
}

export const deleteSite: MutationResolvers['deleteSite'] = ({ id }) => {
  return db.site.delete({
    where: { id },
  })
}

export const Site: SiteResolvers = {
  tasks: (_obj, { root }) =>
    db.site.findUnique({ where: { id: root.id } }).tasks(),
}
