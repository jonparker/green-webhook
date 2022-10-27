export const schema = gql`
  type Webhook {
    id: String!
    alias: String
    createdAt: DateTime!
    createdById: String
    createdBy: User
    updatedAt: DateTime!
    destinationEndpoints: String!
    invocationUri: String!
    maxDelaySeconds: Int
    startAt: DateTime
    invocations: Int!
    isEnabled: Boolean!
    isArchived: Boolean!
    isDeleted: Boolean!
  }

  type Query {
    webhooks: [Webhook!]! @requireAuth
    webhook(id: String!): Webhook @requireAuth
  }

  input CreateWebhookInput {
    alias: String
    createdById: String
    destinationEndpoints: String!
    invocationUri: String!
    maxDelaySeconds: Int
    startAt: DateTime
    invocations: Int!
    isEnabled: Boolean!
    isArchived: Boolean!
    isDeleted: Boolean!
  }

  input UpdateWebhookInput {
    alias: String
    createdById: String
    destinationEndpoints: String
    invocationUri: String
    maxDelaySeconds: Int
    startAt: DateTime
    invocations: Int
    isEnabled: Boolean
    isArchived: Boolean
    isDeleted: Boolean
  }

  type Mutation {
    createWebhook(input: CreateWebhookInput!): Webhook! @requireAuth
    updateWebhook(id: String!, input: UpdateWebhookInput!): Webhook!
      @requireAuth
    deleteWebhook(id: String!): Webhook! @requireAuth
  }
`
