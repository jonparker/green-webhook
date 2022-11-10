import { useEffect, useRef, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'

const ResetPasswordPage = ({ resetToken }: { resetToken: string }) => {
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [])

  const passwordRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    passwordRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <>
      <DefaultLayout>
        <MetaTags title="Reset Password" />

        <div className="w-full lg:w-1/4">
          <div className="w-full rounded-lg bg-gray-200 py-8 px-7">
            <h2 className="bg-gray-200 text-center text-4xl font-bold text-gray-600">
              Reset password
            </h2>

            <div>
              <Form onSubmit={onSubmit} className="bg-gray-200">
                <Label
                  name="password"
                  className="rw-label bg-gray-200"
                  errorClassName="rw-label rw-label-error bg-gray-200"
                >
                  New Password
                </Label>
                <PasswordField
                  name="password"
                  autoComplete="new-password"
                  className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 text-gray-600 focus:bg-white focus:shadow focus:outline-none"
                  errorClassName="rw-input rw-input-error bg-gray-200"
                  disabled={!enabled}
                  ref={passwordRef}
                  validation={{
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  }}
                />

                <FieldError
                  name="password"
                  className="rw-field-error bg-gray-200"
                />

                <div className="mt-2 bg-gray-200">
                  <Submit
                    className="rw-button rw-button-blue"
                    disabled={!enabled}
                  >
                    Submit
                  </Submit>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}

export default ResetPasswordPage
