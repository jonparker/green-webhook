import { useRef } from 'react'
import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await signUp({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <MetaTags title="Signup" />
      <DefaultLayout>
        <div className="w-full lg:w-1/4">
          <div className="w-full rounded-lg bg-gray-200 py-8 px-7">
            <h2 className="text-center text-4xl font-bold text-gray-600">
              Create account
            </h2>
            <div className="mt-3 w-full text-center">
              <span className="text-base font-medium text-gray-500">
                Already have an account?
              </span>{' '}
              <Link to={routes.login()} className="rw-link">
                Log in!
              </Link>
            </div>
            <Form onSubmit={onSubmit}>
              <Label
                name="username"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Email address
              </Label>
              <TextField
                name="username"
                placeholder="Email address"
                className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 focus:bg-white focus:shadow focus:outline-none"
                errorClassName="rw-input rw-input-error"
                ref={usernameRef}
                validation={{
                  required: {
                    value: true,
                    message: 'An email address is required',
                  },
                }}
              />
              <FieldError name="username" className="rw-field-error" />
              <Label
                name="password"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Password
              </Label>
              <PasswordField
                name="password"
                placeholder="Password"
                className="mt-2 w-full rounded-lg bg-gray-100 py-2.5 px-4 focus:bg-white focus:shadow focus:outline-none"
                errorClassName="rw-input rw-input-error"
                autoComplete="current-password"
                validation={{
                  required: {
                    value: true,
                    message: 'A password is required',
                  },
                }}
              />
              <FieldError name="password" className="rw-field-error" />
              <div className="mt-4 w-full">
                <Submit className="w-full rounded-lg bg-green py-2.5 text-xl font-bold text-white hover:bg-white hover:text-bole">
                  Sign up
                </Submit>
              </div>
            </Form>
          </div>
        </div>
      </DefaultLayout>
    </>
  )
}

export default SignupPage
