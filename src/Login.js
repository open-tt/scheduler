import React from 'react'
import context from 'lib/context';

const Login = () => {
  const { api } = context

  const signup = () => {
    api.registerUser({
      name: 'test',
      email: 'test@test.com',
      password: 'test123',
      password_confirmation: 'test123'
    })
  }

  const login = () => {
    api.authenticate({
      email: 'test@test.com',
      password: 'test123',
    }).then(({ auth_token }) => {
      console.log(auth_token)
      context.authenticate({ auth_token })
    })
  }

  return (
    <div>
      <label>fake sign up</label>
      <p>email: test@test.com</p>
      <p>pw: test123</p>
      <hr />

      <button onClick={signup}>sign up</button>
      <button onClick={login}>log in </button>
    </div>
  )
}

export default Login