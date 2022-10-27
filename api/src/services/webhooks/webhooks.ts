import type {
  QueryResolvers,
  MutationResolvers,
  WebhookRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const webhooks: QueryResolvers['webhooks'] = () => {
  const createdById = context.currentUser.id
  return db.webhook.findMany({
    where: {
      createdById,
    },
  })
}

export const webhook: QueryResolvers['webhook'] = ({ id }) => {
  const createdById = context.currentUser.id
  return db.webhook.findFirst({
    where: { id, createdById },
  })
}

export const createWebhook: MutationResolvers['createWebhook'] = ({
  input,
}) => {
  const createdById = context.currentUser.id
  const data = {
    ...input,
    createdById,
  }
  return db.webhook.create({
    data,
  })
}

export const updateWebhook: MutationResolvers['updateWebhook'] = ({
  id,
  input,
}) => {
  const createdById = context.currentUser.id
  return db.webhook.update({
    data: input,
    where: { id, createdById },
  })
}

export const deleteWebhook: MutationResolvers['deleteWebhook'] = ({ id }) => {
  const createdById = context.currentUser.id
  return db.webhook.delete({
    where: { id, createdById },
  })
}

export const Webhook: WebhookRelationResolvers = {
  createdBy: (_obj, { root }) => {
    return db.webhook.findUnique({ where: { id: root?.id } }).createdBy()
  },
}
