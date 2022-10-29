import { useState } from 'react'

import type { EditWebhookById, UpdateWebhookInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

import { azureRegions } from 'src/lib/azure-regions'
import { endpointHelper } from 'src/lib/endpointHelper'

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
  const destinationLocationOptions = [
    ...azureRegions.map((region) => region.RegionName),
  ]

  const [endpoints, setEndpoints] = useState(
    endpointHelper.decode(props.webhook?.destinationEndpoints || '[]')
  )

  const onSubmit = (data: FormWebhook) => {
    props.onSave(
      {
        ...data,
        destinationEndpoints: endpointHelper.encode(endpoints),
        invocationUri: 'na',
        invocations: 0,
        isEnabled: true,
        isDeleted: false,
        isArchived: false,
      },
      props?.webhook?.id
    )
  }

  const updateEndpointLocation = (location, index) => {
    const endpoint = endpoints[index]
    if (endpoint) {
      endpoint.location = location
    }
    setEndpoints(endpoints)
  }

  const updateEndpointUri = (uri, index) => {
    const endpoint = endpoints[index]
    if (endpoint) {
      endpoint.uri = uri
    }
    setEndpoints(endpoints)
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

        {endpoints.map((endpoint, index) => {
          return (
            <>
              <Label
                name={`destinationEndpointLabel-${index}`}
                htmlFor={`destinationEndpoint-${index}`}
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Destination endpoint {index + 1}:
              </Label>

              <input
                type="text"
                name={`destinationEndpoint-${index}`}
                defaultValue={endpoint.uri}
                className="rw-input"
                onChange={(e) => updateEndpointUri(e.target.value, index)}
              />
              <Label name="destinationLocation" className="rw-label">
                Destination endpoint Azure region {index + 1}:
              </Label>
              <select
                defaultValue={endpoint.location}
                name={`destinationLocation-${index}`}
                multiple={false}
                onChange={(e) => updateEndpointLocation(e.target.value, index)}
              >
                {destinationLocationOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <input
                type="button"
                value="Remove"
                onClick={() =>
                  setEndpoints([
                    ...endpoints.filter(
                      (e) => e.location !== endpoint.location
                    ),
                  ])
                }
              />
            </>
          )
        })}

        <input
          type="button"
          value="Add endpoint"
          onClick={() =>
            setEndpoints([
              ...endpoints,
              { uri: '', location: destinationLocationOptions[0] },
            ])
          }
        />

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

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default WebhookForm
