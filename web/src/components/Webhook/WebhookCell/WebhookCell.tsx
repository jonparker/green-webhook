import type { FindWebhookById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Webhook from 'src/components/Webhook/Webhook'

export const QUERY = gql`
  query FindWebhookById($id: String!) {
    webhook: webhook(id: $id) {
      id
      alias
      createdAt
      createdBy {
        name
      }
      updatedAt
      destinationEndpoints
      invocationUri
      maxDelaySeconds
      startAt
      invocations
      isEnabled
      isArchived
      isDeleted
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Webhook not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ webhook }: CellSuccessProps<FindWebhookById>) => {
  return <Webhook webhook={webhook} />
}
