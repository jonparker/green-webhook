import type { EditWebhookById, UpdateWebhookInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WebhookForm from 'src/components/Webhook/WebhookForm'

export const QUERY = gql`
  query EditWebhookById($id: String!) {
    webhook: webhook(id: $id) {
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
const UPDATE_WEBHOOK_MUTATION = gql`
  mutation UpdateWebhookMutation($id: String!, $input: UpdateWebhookInput!) {
    updateWebhook(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ webhook }: CellSuccessProps<EditWebhookById>) => {
  const [updateWebhook, { loading, error }] = useMutation(
    UPDATE_WEBHOOK_MUTATION,
    {
      onCompleted: () => {
        toast.success('Webhook updated')
        navigate(routes.webhooks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateWebhookInput,
    id: EditWebhookById['webhook']['id']
  ) => {
    updateWebhook({ variables: { id, input } })
  }

  return (
    <div className="w-full max-w-7xl rounded-lg bg-gray-200 py-8 px-7">
      <h2 className="bg-gray-200 text-center text-4xl font-bold text-gray-600">
        Edit Webhook: <i className='text-gray-600 bg-transparent font-normal'>{webhook?.id}</i>
      </h2>
      <WebhookForm
        webhook={webhook}
        onSave={onSave}
        error={error}
        loading={loading}
      />
    </div>
  )
}
