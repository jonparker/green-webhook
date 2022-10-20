import EditAuditCell from 'src/components/Audit/EditAuditCell'

type AuditPageProps = {
  id: string
}

const EditAuditPage = ({ id }: AuditPageProps) => {
  return <EditAuditCell id={id} />
}

export default EditAuditPage
