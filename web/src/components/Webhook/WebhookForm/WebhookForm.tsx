import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  DatetimeLocalField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

import type { EditWebhookById, UpdateWebhookInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'



const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}


type FormWebhook = NonNullable<EditWebhookById['webhook']>

interface WebhookFormProps {
  webhook?: EditWebhookById['webhook']
  onSave: (data: UpdateWebhookInput, id?: FormWebhook['id']) => void
  error: RWGqlError
  loading: boolean
}

const WebhookForm = (props: WebhookFormProps) => {
  const onSubmit = (data: FormWebhook) => {
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.webhook?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormWebhook> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="alias"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Alias
        </Label>
        
          <TextField
            name="alias"
            defaultValue={props.webhook?.alias}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="alias" className="rw-field-error" />

        <Label
          name="createdBy"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Created by
        </Label>
        
          <TextField
            name="createdBy"
            defaultValue={props.webhook?.createdBy}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="createdBy" className="rw-field-error" />

        <Label
          name="destinationEndpoints"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Destination endpoints
        </Label>
        
          <TextField
            name="destinationEndpoints"
            defaultValue={props.webhook?.destinationEndpoints}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="destinationEndpoints" className="rw-field-error" />

        <Label
          name="invocationUri"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Invocation uri
        </Label>
        
          <TextField
            name="invocationUri"
            defaultValue={props.webhook?.invocationUri}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="invocationUri" className="rw-field-error" />

        <Label
          name="maxDelaySeconds"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Max delay seconds
        </Label>
        
          <NumberField
            name="maxDelaySeconds"
            defaultValue={props.webhook?.maxDelaySeconds}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="maxDelaySeconds" className="rw-field-error" />

        <Label
          name="startAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start at
        </Label>
        
          <DatetimeLocalField
            name="startAt"
            defaultValue={formatDatetime(props.webhook?.startAt)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="startAt" className="rw-field-error" />

        <Label
          name="invocations"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Invocations
        </Label>
        
          <NumberField
            name="invocations"
            defaultValue={props.webhook?.invocations}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="invocations" className="rw-field-error" />

        <Label
          name="isEnabled"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is enabled
        </Label>
        
          <CheckboxField
            name="isEnabled"
            defaultChecked={props.webhook?.isEnabled}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="isEnabled" className="rw-field-error" />

        <Label
          name="isArchived"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is archived
        </Label>
        
          <CheckboxField
            name="isArchived"
            defaultChecked={props.webhook?.isArchived}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="isArchived" className="rw-field-error" />

        <Label
          name="isDeleted"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is deleted
        </Label>
        
          <CheckboxField
            name="isDeleted"
            defaultChecked={props.webhook?.isDeleted}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="isDeleted" className="rw-field-error" />

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

export default WebhookForm
