
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag,  } from 'src/lib/formatters'

import type { DeleteAuditMutationVariables, FindAuditById } from 'types/graphql'

const DELETE_AUDIT_MUTATION = gql`
  mutation DeleteAuditMutation($id: String!) {
    deleteAudit(id: $id) {
      id
    }
  }
`

interface Props {
  audit: NonNullable<FindAuditById['audit']>
}

const Audit = ({ audit }: Props) => {
  const [deleteAudit] = useMutation(DELETE_AUDIT_MUTATION, {
    onCompleted: () => {
      toast.success('Audit deleted')
      navigate(routes.audits())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteAuditMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete audit ' + id + '?')) {
      deleteAudit({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Audit {audit.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{audit.id}</td>
            </tr><tr>
              <th>Created at</th>
              <td>{timeTag(audit.createdAt)}</td>
            </tr><tr>
              <th>Updated at</th>
              <td>{timeTag(audit.updatedAt)}</td>
            </tr><tr>
              <th>User id</th>
              <td>{audit.userId}</td>
            </tr><tr>
              <th>Log</th>
              <td>{audit.log}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editAudit({ id: audit.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(audit.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Audit
