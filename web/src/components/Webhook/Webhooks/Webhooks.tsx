import type {
  DeleteWebhookMutationVariables,
  FindWebhooks,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Webhook/WebhooksCell'
import { endpointHelper } from 'src/lib/endpointHelper'
import { timeTag, truncate } from 'src/lib/formatters'

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
            <th className="text-black">Id</th>
            <th className="text-black">Alias</th>
            <th className="text-black">Created at</th>
            <th className="text-black">Updated at</th>
            <th className="text-black">Destination endpoints</th>
            <th className="text-black">Invocation uri</th>
            <th className="text-black">Max Delay Seconds</th>
            <th className="text-black">Estimated Time</th>
            <th className="text-black">Invocations</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {webhooks.map((webhook) => (
            <tr key={webhook.id}>
              <td>{truncate(webhook.id)}</td>
              <td>{truncate(webhook.alias)}</td>
              <td>{timeTag(webhook.createdAt)}</td>
              <td>{timeTag(webhook.updatedAt)}</td>
              <td>
                {endpointHelper
                  .decode(webhook.destinationEndpoints)
                  .map((location, index) => {
                    return (
                      <div key={index} className="bg-transparent text-black">
                        {location.uri} - (
                        <b className="bg-transparent text-gray-600">
                          {location.location}
                        </b>
                        )
                      </div>
                    )
                  })}
              </td>
              <td>
                <a
                  href={`${document.location.protocol}/\/${document.location.hostname}:${document.location.port}/.netlify/functions/webhook/${webhook.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-transparent"
                >
                  Invocation URI
                </a>
              </td>
              <td>{truncate(webhook.maxDelaySeconds)}</td>
              <td>{truncate(webhook.estimatedTime)}</td>
              <td>{truncate(webhook.invocations)}</td>
              <td>
                <nav className="rw-table-actions bg-transparent">
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
