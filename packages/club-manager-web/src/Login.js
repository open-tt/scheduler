import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { withRouter } from 'react-router-dom'
import context from 'lib/context'
import FormField from 'form/FormField'

const FIELD = Object.freeze({
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
  PASSWORD_CONFIRMATION: 'password_confirmation'
})

const REQUIRED_FIELDS = {
  SIGNUP: [FIELD.NAME, FIELD.EMAIL, FIELD.PASSWORD, FIELD.PASSWORD_CONFIRMATION],
  LOGIN: [FIELD.EMAIL, FIELD.PASSWORD],
}

const Login = withRouter(({ history }) => {
  const [isNew, setIsNew] = useState(false)
  const { api } = context

  const login = ({ email, password }) => api.authenticate({
    email,
    password,
  })

  const signup = ({ email, password, name, password_confirmation }) => api.registerUser({
    name,
    email,
    password,
    password_confirmation
  }).then(() => {
    return login({
      email,
      password
    })
  })

  const onSubmit = (values) => {
    const promise = isNew ? signup(values) : login(values)
    promise
      .then(({ auth_token }) => {
        context.authenticate({ auth_token })
          .then(() => {
            history.push('/my-reservations')
          })
      })
  }

  const validate = (values) => {
    if (isNew && values[FIELD.PASSWORD] !== values[FIELD.PASSWORD_CONFIRMATION]) {
      return {
        [FIELD.PASSWORD_CONFIRMATION]: 'Password confirmation must match.'
      }
    }

    return {}
  }

  return (
    <div data-row>
      <div data-col="12">
        <h1>{isNew ? 'Sign up' : 'Log in'}</h1>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              {isNew && <FormField
                label="Name"
                autoComplete="name"
                name={FIELD.NAME}
                required={isNew}
                type="text"
              />}

              <FormField
                label="Email"
                autoComplete="email"
                name={FIELD.EMAIL}
                required={true}
                type="email"
              />

              <FormField
                label="Password"
                autoComplete={isNew ? 'new-password' : 'current-password'}
                name={FIELD.PASSWORD}
                required={true}
                type="password"
              />

              {isNew && <FormField
                label="Confirm Password"
                autoComplete='off'
                required={isNew}
                name={FIELD.PASSWORD_CONFIRMATION}
                type="password"
              />}

              <button onClick={handleSubmit}>Continue</button>
            </form>
          )}
        />

        <br />

        {!isNew && <p>Don't have an account yet? <button data-plain onClick={() => setIsNew(true)}>Sign up</button></p>}
        {isNew && <p>Already have an account? <button data-plain onClick={() => setIsNew(false)}>Log in</button></p>}
      </div>
    </div>
  )
})

export default Login
