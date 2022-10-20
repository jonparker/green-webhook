import WebhookCell from 'src/components/Webhook/WebhookCell'

type WebhookPageProps = {
  id: string
}

const WebhookPage = ({ id }: WebhookPageProps) => {
  return <WebhookCell id={id} />
}

export default WebhookPage
