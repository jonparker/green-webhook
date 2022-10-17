import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const webhooks: QueryResolvers['webhooks'] = () => {
  return db.webhook.findMany()
}

export const webhook: QueryResolvers['webhook'] = ({ id }) => {
  return db.webhook.findUnique({
    where: { id },
  })
}

export const createWebhook: MutationResolvers['createWebhook'] = ({
  input,
}) => {
  return db.webhook.create({
    data: input,
  })
}

export const updateWebhook: MutationResolvers['updateWebhook'] = ({
  id,
  input,
}) => {
  return db.webhook.update({
    data: input,
    where: { id },
  })
}

export const deleteWebhook: MutationResolvers['deleteWebhook'] = ({ id }) => {
  return db.webhook.delete({
    where: { id },
  })
}
