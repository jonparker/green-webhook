export const schema = gql`
  type CarbonAwareTest {
    statusCode: String!
    response: String
  }

  type Query {
    carbonAwareTest(locations: [String!]): CarbonAwareTest! @skipAuth
  }
`
