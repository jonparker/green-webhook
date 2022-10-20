import type { FindAuditById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Audit from 'src/components/Audit/Audit'

export const QUERY = gql`
  query FindAuditById($id: String!) {
    audit: audit(id: $id) {
      id
      createdAt
      updatedAt
      userId
      log
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Audit not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ audit }: CellSuccessProps<FindAuditById>) => {
  return <Audit audit={audit} />
}
