import type { CreateWebhookInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WebhookForm from 'src/components/Webhook/WebhookForm'

const CREATE_WEBHOOK_MUTATION = gql`
  mutation CreateWebhookMutation($input: CreateWebhookInput!) {
    createWebhook(input: $input) {
      id
    }
  }
`

const NewWebhook = () => {
  const [createWebhook, { loading, error }] = useMutation(
    CREATE_WEBHOOK_MUTATION,
    {
      onCompleted: () => {
        toast.success('Webhook created')
        navigate(routes.webhooks())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateWebhookInput) => {
    createWebhook({ variables: { input } })
  }

  return (
    <div className="w-full max-w-7xl rounded-lg bg-gray-200 py-8 px-7">
      <h2 className="bg-gray-200 text-center text-4xl font-bold text-gray-600">
        New webhook
      </h2>
      <WebhookForm onSave={onSave} loading={loading} error={error} />
    </div>
  )
}

export default NewWebhook
