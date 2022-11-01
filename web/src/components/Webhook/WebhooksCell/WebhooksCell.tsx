import type { FindWebhooks } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Webhooks from 'src/components/Webhook/Webhooks'

export const QUERY = gql`
  query FindWebhooks {
    webhooks {
      id
      alias
      createdAt
      createdById
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

export const Empty = () => {
  return (
    <div>
      No webhooks yet.{" "}
      <Link to={routes.newWebhook()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ webhooks }: CellSuccessProps<FindWebhooks>) => {
  return <Webhooks webhooks={webhooks} />
}
