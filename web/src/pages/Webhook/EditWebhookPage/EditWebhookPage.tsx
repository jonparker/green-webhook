import EditWebhookCell from 'src/components/Webhook/EditWebhookCell'

type WebhookPageProps = {
  id: string
}

const EditWebhookPage = ({ id }: WebhookPageProps) => {
  return <EditWebhookCell id={id} />
}

export default EditWebhookPage
