import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Audit/AuditsCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeleteAuditMutationVariables, FindAudits } from 'types/graphql'

const DELETE_AUDIT_MUTATION = gql`
  mutation DeleteAuditMutation($id: String!) {
    deleteAudit(id: $id) {
      id
    }
  }
`

const AuditsList = ({ audits }: FindAudits) => {
  const [deleteAudit] = useMutation(DELETE_AUDIT_MUTATION, {
    onCompleted: () => {
      toast.success('Audit deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteAuditMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete audit ' + id + '?')) {
      deleteAudit({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>User id</th>
            <th>Log</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {audits.map((audit) => (
            <tr key={audit.id}>
              <td>{truncate(audit.id)}</td>
              <td>{timeTag(audit.createdAt)}</td>
              <td>{timeTag(audit.updatedAt)}</td>
              <td>{truncate(audit.userId)}</td>
              <td>{truncate(audit.log)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.audit({ id: audit.id })}
                    title={'Show audit ' + audit.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editAudit({ id: audit.id })}
                    title={'Edit audit ' + audit.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete audit ' + audit.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(audit.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AuditsList
