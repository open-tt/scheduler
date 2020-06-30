import React from 'react'
import { Provider, Subscribe, Container } from 'unstated'
import Api from 'lib/Api'

const cachedToken = window.localStorage.getItem('auth_token') || ''

class Context extends Container {
  state = {
    auth_token: cachedToken
  };

  api = new Api({
    auth_token: this.state.auth_token
  })

  constructor() {
    super()

    if (this.state.auth_token) {
      this.api.getCurrentUser().then(user => {
        this.setState({ user })
      })
    }
  }

  authenticate = ({ auth_token }) => {
    this.api.auth_token = auth_token
    window.localStorage.setItem('auth_token', auth_token)
  }
}

const context = new Context()

export default context

export const ContextProvider = ({ children }) => (
  <Provider inject={[context]}>
    <Subscribe to={[Context]}>
      {(context) => {
        console.log('new context?', context)
        return React.cloneElement(children, { context, key: Date.now() })
      }}
    </Subscribe>
  </Provider>
)