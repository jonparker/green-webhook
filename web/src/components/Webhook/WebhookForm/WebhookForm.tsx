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

const getDestinationEndpoints = (webhook) => {
  const destinationEndpoints = webhook?.destinationEndpoints

  if (!destinationEndpoints) {
    return {
      firstDestinationEndpoint: {},
      secondDestinationEndpoint: {},
    }
  }

  const destinationEndpointList = destinationEndpoints?.split(',')

  if (destinationEndpointList.length === 1) {
    return {
      firstDestinationEndpoint: {
        uri: destinationEndpointList[0]?.split('|')[0],
        location: destinationEndpointList[0]?.split('|')[1],
      },
    }
  }

  return {
    firstDestinationEndpoint: {
      uri: destinationEndpointList[0]?.split('|')[0],
      location: destinationEndpointList[0]?.split('|')[1],
    },
    secondDestinationEndpoint: {
      uri: destinationEndpointList[1]?.split('|')[0],
      location: destinationEndpointList[1]?.split('|')[1],
    },
  }
}

const WebhookForm = (props: WebhookFormProps) => {
  const destinationLocationOptions = [
    'NA',
    ...azureRegions.map((region) => region.RegionName),
  ]

  const destinationEndpointInfo = getDestinationEndpoints(props.webhook)

  const [firstDestinationEndpoint, setFirstDestinationEndpoint] = useState(
    destinationEndpointInfo.firstDestinationEndpoint?.uri || ''
  )

  const [secondDestinationEndpoint, setSecondDestinationEndpoint] = useState(
    destinationEndpointInfo.secondDestinationEndpoint?.uri || ''
  )

  const [firstLocation, setFirstLocation] = useState(
    destinationEndpointInfo.firstDestinationEndpoint?.location || 'na'
  )

  const [secondLocation, setSecondLocation] = useState(
    destinationEndpointInfo.secondDestinationEndpoint?.location || 'na'
  )
  const onSubmit = (data: FormWebhook) => {
    const calculatedDestinationEndpoints = `${firstDestinationEndpoint}|${firstLocation},${secondDestinationEndpoint}|${secondLocation}`
    console.log('Final value:', calculatedDestinationEndpoints)
    props.onSave(
      {
        ...data,
        destinationEndpoints: calculatedDestinationEndpoints,
        invocationUri: 'na',
        invocations: 0,
        isEnabled: true,
        isDeleted: false,
        isArchived: false,
      },
      props?.webhook?.id
    )
  }

  const updateFirstDestinationLocation = (value) => {
    console.log(value.target.value)
    setFirstLocation(value.target.value)
  }

  const updateSecondDestinationLocation = (value) => {
    console.log(value.target.value)
    setSecondLocation(value.target.value)
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
          name="destinationEndpoints"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          1st Destination endpoint:
        </Label>

        <input
          type="text"
          name="firstDestination"
          value={firstDestinationEndpoint}
          className="rw-input"
          onChange={(e) => setFirstDestinationEndpoint(e.target.value)}
        />

        <Label name="destinationLocation" className="rw-label">
          1st Destination endpoint Azure region:
        </Label>
        <select
          defaultValue={firstLocation}
          multiple={false}
          onChange={updateFirstDestinationLocation}
        >
          {destinationLocationOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <Label
          name="destinationEndpoints"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          2nd Destination endpoint:
        </Label>

        <input
          type="text"
          name="secondDestination"
          value={secondDestinationEndpoint}
          className="rw-input"
          onChange={(e) => setSecondDestinationEndpoint(e.target.value)}
        />

        <Label name="destinationLocation" className="rw-label">
          2nd Destination endpoint Azure region:
        </Label>
        <select
          defaultValue={secondLocation}
          multiple={false}
          onChange={updateSecondDestinationLocation}
        >
          {destinationLocationOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <FieldError name="destinationEndpoints" className="rw-field-error" />

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
