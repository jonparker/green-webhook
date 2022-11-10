import { useEffect, useRef } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef?.current?.focus()
  }, [])

  const onSubmit = async (data: { username: string }) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />
      <DefaultLayout>
        <div className="w-full lg:w-1/4">
          <div className="w-full rounded-lg bg-gray-200 py-8 px-7">
            <h2 className="bg-gray-200 text-center text-4xl font-bold text-gray-600">
              Forgot password
            </h2>
            <div>
              <Form onSubmit={onSubmit} className="bg-gray-200">
                <Label
                  name="username"
                  className="rw-label bg-gray-200"
                  errorClassName="rw-label rw-label-error bg-gray-200"
                >
                  Email address
                </Label>
                <TextField
                  name="username"
                  className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 text-gray-600 focus:bg-white focus:shadow focus:outline-none"
                  errorClassName="rw-input rw-input-error bg-gray-200"
                  ref={usernameRef}
                  validation={{
                    required: true,
                  }}
                />
                <FieldError
                  name="username"
                  className="rw-field-error bg-gray-200"
                />
                <div className="mt-2 bg-gray-200">
                  <Submit className="rw-button rw-button-blue">Submit</Submit>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}

export default ForgotPasswordPage
