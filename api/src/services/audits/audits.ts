import type {
  QueryResolvers,
  MutationResolvers,
  AuditRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const audits: QueryResolvers['audits'] = () => {
  return db.audit.findMany()
}

export const audit: QueryResolvers['audit'] = ({ id }) => {
  return db.audit.findUnique({
    where: { id },
  })
}

export const createAudit: MutationResolvers['createAudit'] = ({ input }) => {
  return db.audit.create({
    data: input,
  })
}

export const updateAudit: MutationResolvers['updateAudit'] = ({
  id,
  input,
}) => {
  return db.audit.update({
    data: input,
    where: { id },
  })
}

export const deleteAudit: MutationResolvers['deleteAudit'] = ({ id }) => {
  return db.audit.delete({
    where: { id },
  })
}

export const Audit: AuditRelationResolvers = {
  user: (_obj, { root }) => {
    return db.audit.findUnique({ where: { id: root?.id } }).user()
  },
}
