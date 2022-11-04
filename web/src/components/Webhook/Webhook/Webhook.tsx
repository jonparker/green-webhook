import type {
  DeleteWebhookMutationVariables,
  FindWebhookById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { endpointHelper } from 'src/lib/endpointHelper'
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
      <div className="w-full max-w-7xl rounded-lg bg-gray-200 py-8 px-7">
        <h2 className="mb-4 bg-gray-200 text-center text-4xl font-bold text-gray-600">
          Webhook {webhook?.alias || webhook?.id} details
        </h2>
        <table className="rw-table">
          <tbody>
            <tr>
              <th className="text-black">Id</th>
              <td className="text-black">{webhook.id}</td>
            </tr>
            <tr>
              <th className="bg-white text-black">Alias</th>
              <td className="text-black">{webhook.alias}</td>
            </tr>
            <tr>
              <th className="text-black">Created at</th>
              <td className="text-black">{timeTag(webhook.createdAt)}</td>
            </tr>
            <tr>
              <th className="bg-white text-black">Updated at</th>
              <td className="text-black">{timeTag(webhook.updatedAt)}</td>
            </tr>
            <tr>
              <th className="text-black">Destination endpoints</th>
              <td className="text-black">
                {endpointHelper
                  .decode(webhook.destinationEndpoints)
                  .map((location, index) => {
                    return (
                      <div key={index} className="bg-white text-black">
                        {location.uri} - (
                        <b className="bg-white text-black">
                          {' '}
                          {location.location}
                        </b>
                        )
                      </div>
                    )
                  })}
              </td>
            </tr>
            <tr>
              <th className="bg-white text-black">Invocation uri</th>
              <td className="text-black">{webhook.invocationUri}</td>
            </tr>
            <tr>
              <th className="text-black">Max delay seconds</th>
              <td className="text-black">{webhook.maxDelaySeconds}</td>
            </tr>
            <tr>
              <th className="bg-white text-black">Start at</th>
              <td className="text-black">{timeTag(webhook.startAt)}</td>
            </tr>
            <tr>
              <th className="text-black">Invocations</th>
              <td className="text-black">{webhook.invocations}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4 flex w-full flex-row-reverse justify-between bg-gray-200">
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
        </div>
      </div>
    </>
  )
}

export default Webhook
