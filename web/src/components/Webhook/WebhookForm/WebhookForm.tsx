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
    let hasEstimate = true

    console.log(typeof data.estimatedTime)
    if (data.estimatedTime === 0 || isNaN(data.estimatedTime)) {
      hasEstimate = false
    }

    console.log(hasEstimate)

    props.onSave(
      {
        ...data,
        destinationEndpoints: endpointHelper.encode(endpoints),
        invocationUri: 'na',
        invocations: 0,
        isEnabled: true,
        isDeleted: false,
        isArchived: false,
        hasEstimate,
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
    <Form<FormWebhook>
      onSubmit={onSubmit}
      error={props.error}
      className="bg-gray-200"
    >
      <FormError
        error={props.error}
        wrapperClassName="rw-form-error-wrapper"
        titleClassName="rw-form-error-title"
        listClassName="rw-form-error-list"
      />
      <Label
        name="alias"
        className="rw-label bg-gray-200"
        errorClassName="rw-label rw-label-error bg-gray-200"
      >
        Alias
      </Label>
      <TextField
        name="alias"
        defaultValue={props.webhook?.alias}
        className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 text-gray-600 focus:bg-white focus:shadow focus:outline-none"
        errorClassName="rw-input rw-input-error bg-gray-200"
        placeholder="Enter alias"
      />
      <FieldError name="alias" className="rw-field-error bg-gray-200" />
      {endpoints.map((endpoint, index) => {
        return (
          <>
            <Label
              name={`destinationEndpointLabel-${index}`}
              htmlFor={`destinationEndpoint-${index}`}
              className="rw-label bg-gray-200"
              errorClassName="rw-label rw-label-error bg-gray-200"
            >
              Destination endpoint {index + 1}:
            </Label>
            <input
              type="text"
              name={`destinationEndpoint-${index}`}
              defaultValue={endpoint.uri}
              className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 text-gray-600 focus:bg-white focus:shadow focus:outline-none"
              onChange={(e) => updateEndpointUri(e.target.value, index)}
            />
            <Label name="destinationLocation" className="rw-label bg-gray-200">
              Destination endpoint Azure region {index + 1}:
            </Label>
            <select
              defaultValue={endpoint.location}
              name={`destinationLocation-${index}`}
              className="rounded-lg bg-gray-100 py-2 text-gray-600 hover:cursor-pointer"
              multiple={false}
              onChange={(e) => updateEndpointLocation(e.target.value, index)}
            >
              {destinationLocationOptions.map((option) => (
                <option className="bg-white text-gray-600" key={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              type="button"
              value="Remove"
              className="mt-2 rounded-md bg-blue-800 bg-gray-200 p-2 text-white opacity-70 hover:cursor-pointer hover:opacity-100"
              onClick={() =>
                setEndpoints([
                  ...endpoints.filter((e) => e.location !== endpoint.location),
                ])
              }
            />
          </>
        )
      })}
      <Label
        name="maxDelaySeconds"
        className="rw-label bg-gray-200"
        errorClassName="rw-label rw-label-error bg-gray-200"
      >
        Max delay seconds
      </Label>
      <NumberField
        name="maxDelaySeconds"
        defaultValue={props.webhook?.maxDelaySeconds}
        validation={{
          min: 0,
          max: 86399,
        }}
        className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 text-gray-600 focus:bg-white focus:shadow focus:outline-none"
        errorClassName="rw-input rw-input-error"
      />
      <FieldError name="maxDelaySeconds" className="rw-field-error" />
      <Label
        name="estimatedTime"
        className="rw-label bg-gray-200"
        errorClassName="rw-label rw-label-error bg-gray-200"
      >
        Estimated Processing Time
      </Label>
      <NumberField
        name="estimatedTime"
        defaultValue={props.webhook?.estimatedTime}
        validation={{
          min: 0,
          max: 86399,
        }}
        className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 text-gray-600 focus:bg-white focus:shadow focus:outline-none"
        errorClassName="rw-input rw-input-error"
      />
      <FieldError name="estimatedTime" className="rw-field-error" />
      <input
        type="button"
        value="Add endpoint"
        className="mt-2 rounded-md bg-blue-800 bg-gray-200 p-2 text-white opacity-70 hover:cursor-pointer hover:opacity-100"
        onClick={() =>
          setEndpoints([
            ...endpoints,
            { uri: '', location: destinationLocationOptions[0] },
          ])
        }
      />

      <div className="bg-gray-200 pt-2">
        <Submit disabled={props.loading} className="rw-button rw-button-blue">
          Save
        </Submit>
      </div>
    </Form>
  )
}

export default WebhookForm
