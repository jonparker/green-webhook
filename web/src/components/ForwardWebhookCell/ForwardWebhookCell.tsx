import type {
  FindForwardWebhookQuery,
  FindForwardWebhookQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query forwardWebhook(
    $payload: String!
    $endpoint: String!
    $secret: String!
  ) {
    forwardWebhook: forwardWebhook(
      payload: $payload
      endpoint: $endpoint
      secret: $secret
    ) {
      statusCode
      response
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindForwardWebhookQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  forwardWebhook,
}: CellSuccessProps<
  FindForwardWebhookQuery,
  FindForwardWebhookQueryVariables
>) => {
  return <div>{JSON.stringify(forwardWebhook)}</div>
}
