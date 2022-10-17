import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WebhookForm from 'src/components/Webhook/WebhookForm'

import type { CreateWebhookInput } from 'types/graphql'

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
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Webhook</h2>
      </header>
      <div className="rw-segment-main">
        <WebhookForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewWebhook
