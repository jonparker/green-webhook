import type { FindAudits } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Audits from 'src/components/Audit/Audits'

export const QUERY = gql`
  query FindAudits {
    audits {
      id
      createdAt
      updatedAt
      userId
      log
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No audits yet. '}
      <Link to={routes.newAudit()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ audits }: CellSuccessProps<FindAudits>) => {
  return <Audits audits={audits} />
}
