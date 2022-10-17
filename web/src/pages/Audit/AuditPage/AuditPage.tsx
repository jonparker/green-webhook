import AuditCell from 'src/components/Audit/AuditCell'

type AuditPageProps = {
  id: string
}

const AuditPage = ({ id }: AuditPageProps) => {
  return <AuditCell id={id} />
}

export default AuditPage
