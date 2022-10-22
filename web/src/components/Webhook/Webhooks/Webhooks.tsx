import type {
  DeleteWebhookMutationVariables,
  FindWebhooks,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Webhook/WebhooksCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'

const DELETE_WEBHOOK_MUTATION = gql`
  mutation DeleteWebhookMutation($id: String!) {
    deleteWebhook(id: $id) {
      id
    }
  }
`

const WebhooksList = ({ webhooks }: FindWebhooks) => {
  const [deleteWebhook] = useMutation(DELETE_WEBHOOK_MUTATION, {
    onCompleted: () => {
      toast.success('Webhook deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteWebhookMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete webhook ' + id + '?')) {
      deleteWebhook({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Alias</th>
            <th>Created at</th>
            <th>Created by</th>
            <th>Updated at</th>
            <th>Destination endpoints</th>
            <th>Invocation uri</th>
            <th>Max delay seconds</th>
            <th>Start at</th>
            <th>Invocations</th>
            <th>Is enabled</th>
            <th>Is archived</th>
            <th>Is deleted</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {webhooks.map((webhook) => (
            <tr key={webhook.id}>
              <td>{truncate(webhook.id)}</td>
              <td>{truncate(webhook.alias)}</td>
              <td>{timeTag(webhook.createdAt)}</td>
              <td>{truncate(webhook.createdBy)}</td>
              <td>{timeTag(webhook.updatedAt)}</td>
              <td>{truncate(webhook.destinationEndpoints)}</td>
              <td>
                <a
                  href={`${document.location.protocol}/\/${document.location.hostname}:${document.location.port}/.netlify/functions/webhook/${webhook.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Invocation URI
                </a>
              </td>
              <td>{truncate(webhook.maxDelaySeconds)}</td>
              <td>{timeTag(webhook.startAt)}</td>
              <td>{truncate(webhook.invocations)}</td>
              <td>{checkboxInputTag(webhook.isEnabled)}</td>
              <td>{checkboxInputTag(webhook.isArchived)}</td>
              <td>{checkboxInputTag(webhook.isDeleted)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.webhook({ id: webhook.id })}
                    title={'Show webhook ' + webhook.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editWebhook({ id: webhook.id })}
                    title={'Edit webhook ' + webhook.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete webhook ' + webhook.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(webhook.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WebhooksList
