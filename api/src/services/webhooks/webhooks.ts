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
    ...(input.hasEstimate===false && {estimatedTime: 300})
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
  const webhook = db.webhook.findFirst({
    where: { id, createdById },
  })
  if (!webhook) {
    throw new Error(`You don't have permission to update this webhook`)
  }
  const data = {
    ...input,
    ...(input.hasEstimate===false && {estimatedTime: 300})
  }
  return db.webhook.update({
    data,
    where: { id },
  })
}

export const deleteWebhook: MutationResolvers['deleteWebhook'] = ({ id }) => {
  const createdById = context.currentUser.id
  const webhook = db.webhook.findFirst({
    where: { id, createdById },
  })
  if (!webhook) {
    throw new Error(`You don't have permission to delete this webhook`)
  }
  return db.webhook.delete({
    where: { id },
  })
}

export const Webhook: WebhookRelationResolvers = {
  createdBy: (_obj, { root }) => {
    return db.webhook.findUnique({ where: { id: root?.id } }).createdBy()
  },
}
