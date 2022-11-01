import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

import type { EditUserById, UpdateUserInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'



const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}


type FormUser = NonNullable<EditUserById['user']>

interface UserFormProps {
  user?: EditUserById['user']
  onSave: (data: UpdateUserInput, id?: FormUser['id']) => void
  error: RWGqlError
  loading: boolean
}

const UserForm = (props: UserFormProps) => {
  const onSubmit = (data: FormUser) => {



















    props.onSave(data, props?.user?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormUser> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label bg-gray-200"
          errorClassName="rw-label rw-label-error bg-gray-200"
        >
          Name
        </Label>

          <TextField
            name="name"
            defaultValue={props.user?.name}
            className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 focus:bg-white focus:shadow focus:outline-none text-gray-600"
            errorClassName="rw-input rw-input-error bg-gray-200"
          />


        <FieldError name="name" className="rw-field-error bg-gray-200" />

        <Label
          name="email"
          className="rw-label bg-gray-200"
          errorClassName="rw-label rw-label-error bg-gray-200"
        >
          Email
        </Label>

          <TextField
            name="email"
            defaultValue={props.user?.email}
            className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 focus:bg-white focus:shadow focus:outline-none text-gray-600"
            errorClassName="rw-input rw-input-error bg-gray-200"
            validation={{ required: true }}
          />


        <FieldError name="email" className="rw-field-error bg-gray-200" />

        <Label
          name="hashedPassword"
          className="rw-label bg-gray-200"
          errorClassName="rw-label rw-label-error bg-gray-200"
        >
          Hashed password
        </Label>

          <TextField
            name="hashedPassword"
            defaultValue={props.user?.hashedPassword}
            className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 focus:bg-white focus:shadow focus:outline-none text-gray-600"
            errorClassName="rw-input rw-input-error bg-gray-200"
            validation={{ required: true }}
          />


        <FieldError name="hashedPassword" className="rw-field-error bg-gray-200" />

        <Label
          name="salt"
          className="rw-label bg-gray-200"
          errorClassName="rw-label rw-label-error bg-gray-200"
        >
          Salt
        </Label>

          <TextField
            name="salt"
            defaultValue={props.user?.salt}
            className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 focus:bg-white focus:shadow focus:outline-none text-gray-600"
            errorClassName="rw-input rw-input-error bg-gray-200"
            validation={{ required: true }}
          />


        <FieldError name="salt" className="rw-field-error bg-gray-200" />

        <Label
          name="resetToken"
          className="rw-label bg-gray-200"
          errorClassName="rw-label rw-label-error bg-gray-200"
        >
          Reset token
        </Label>

          <TextField
            name="resetToken"
            defaultValue={props.user?.resetToken}
            className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 focus:bg-white focus:shadow focus:outline-none text-gray-600"
            errorClassName="rw-input rw-input-error bg-gray-200"
          />


        <FieldError name="resetToken" className="rw-field-error bg-gray-200" />

        <Label
          name="resetTokenExpiresAt"
          className="rw-label bg-gray-200"
          errorClassName="rw-label rw-label-error bg-gray-200"
        >
          Reset token expires at
        </Label>

          <DatetimeLocalField
            name="resetTokenExpiresAt"
            defaultValue={formatDatetime(props.user?.resetTokenExpiresAt)}
            className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 focus:bg-white focus:shadow focus:outline-none text-gray-600"
            errorClassName="rw-input rw-input-error bg-gray-200"
          />


        <FieldError name="resetTokenExpiresAt" className="rw-field-error bg-gray-200" />

        <div className='bg-gray-200'>
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

export default UserForm
