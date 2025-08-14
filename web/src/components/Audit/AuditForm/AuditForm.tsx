import type { EditAuditById, UpdateAuditInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormAudit = NonNullable<EditAuditById['audit']>

interface AuditFormProps {
  audit?: EditAuditById['audit']
  onSave: (data: UpdateAuditInput, id?: FormAudit['id']) => void
  error: RWGqlError
  loading: boolean
}

const AuditForm = (props: AuditFormProps) => {
  const onSubmit = (data: FormAudit) => {
    props.onSave(data, props?.audit?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormAudit> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="userId"
          className="rw-label bg-gray-200"
          errorClassName="rw-label rw-label-error bg-gray-200"
        >
          User id
        </Label>

        <TextField
          name="userId"
          defaultValue={props.audit?.userId}
          className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 text-gray-600 focus:bg-white focus:shadow focus:outline-none"
          errorClassName="rw-input rw-input-error bg-gray-200"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error bg-gray-200" />

        <Label
          name="log"
          className="rw-label bg-gray-200"
          errorClassName="rw-label rw-label-error bg-gray-200"
        >
          Log
        </Label>

        <TextField
          name="log"
          defaultValue={props.audit?.log}
          className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 text-gray-600 focus:bg-white focus:shadow focus:outline-none"
          errorClassName="rw-input rw-input-error bg-gray-200"
          validation={{ required: true }}
        />

        <FieldError name="log" className="rw-field-error bg-gray-200" />

        <div className="bg-gray-200">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default AuditForm
