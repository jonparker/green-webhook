import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

import type { EditAuditById, UpdateAuditInput } from 'types/graphql'
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
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>
        
          <TextField
            name="userId"
            defaultValue={props.audit?.userId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="log"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Log
        </Label>
        
          <TextField
            name="log"
            defaultValue={props.audit?.log}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="log" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default AuditForm
