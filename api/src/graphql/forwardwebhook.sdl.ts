export const schema = gql`
  type ForwardWebhook {
    statusCode: String!
    response: String
  }

  type Query {
    forwardWebhook(
      payload: String!
      endpoint: String!
      secret: String!
    ): ForwardWebhook! @skipAuth
  }
`
