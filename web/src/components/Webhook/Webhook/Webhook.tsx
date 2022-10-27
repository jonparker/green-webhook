import type {
  DeleteWebhookMutationVariables,
  FindWebhookById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

const DELETE_WEBHOOK_MUTATION = gql`
  mutation DeleteWebhookMutation($id: String!) {
    deleteWebhook(id: $id) {
      id
    }
  }
`

interface Props {
  webhook: NonNullable<FindWebhookById['webhook']>
}

const Webhook = ({ webhook }: Props) => {
  const [deleteWebhook] = useMutation(DELETE_WEBHOOK_MUTATION, {
    onCompleted: () => {
      toast.success('Webhook deleted')
      navigate(routes.webhooks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteWebhookMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete webhook ' + id + '?')) {
      deleteWebhook({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Webhook {webhook.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{webhook.id}</td>
            </tr>
            <tr>
              <th>Alias</th>
              <td>{webhook.alias}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(webhook.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(webhook.updatedAt)}</td>
            </tr>
            <tr>
              <th>Destination endpoints</th>
              <td>{webhook.destinationEndpoints}</td>
            </tr>
            <tr>
              <th>Invocation uri</th>
              <td>{webhook.invocationUri}</td>
            </tr>
            <tr>
              <th>Max delay seconds</th>
              <td>{webhook.maxDelaySeconds}</td>
            </tr>
            <tr>
              <th>Start at</th>
              <td>{timeTag(webhook.startAt)}</td>
            </tr>
            <tr>
              <th>Invocations</th>
              <td>{webhook.invocations}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editWebhook({ id: webhook.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(webhook.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Webhook
