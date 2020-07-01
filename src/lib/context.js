import React from 'react'
import { Provider, Subscribe, Container } from 'unstated'
import Api from 'lib/Api'

const cachedToken = window.localStorage.getItem('auth_token') || ''

const DEFAULT_SCHEDULE_CONFIG = {
  "interval_size_in_minutes": 60,
  "day_start_time": "0000-00-00 10:00:00",
  "day_end_time": "0000-00-00 22:00:00",
  "availability_per_interval": 4,
  "price_per_participant": 20
}

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
      this.authenticate({ auth_token: this.state.auth_token })
    }
  }

  authenticate = ({ auth_token }) => {
    this.api.auth_token = auth_token
    window.localStorage.setItem('auth_token', auth_token)

    this.api.getCurrentUser()
      .then(user => {
        this.setState({ user, auth_token })
          .then(() => {
            if (!user.schedule) {
              this.api.createScheduleConfig(DEFAULT_SCHEDULE_CONFIG)
            }
          })
      })
      .catch(() => {
        this.unauthenticate()
      })
  }

  unauthenticate = () => {
    window.localStorage.removeItem('auth_token')
    this.setState({ auth_token: undefined, user: undefined })
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