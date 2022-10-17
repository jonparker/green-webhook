export const schema = gql`
  type Audit {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    userId: String!
    user: User!
    log: String!
  }

  type Query {
    audits: [Audit!]! @requireAuth
    audit(id: String!): Audit @requireAuth
  }

  input CreateAuditInput {
    userId: String!
    log: String!
  }

  input UpdateAuditInput {
    userId: String
    log: String
  }

  type Mutation {
    createAudit(input: CreateAuditInput!): Audit! @requireAuth
    updateAudit(id: String!, input: UpdateAuditInput!): Audit! @requireAuth
    deleteAudit(id: String!): Audit! @requireAuth
  }
`
