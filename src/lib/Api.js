import axios from 'axios'

const ROOT = 'https://nameless-spire-32644.herokuapp.com'

const ENDPOINTS = {
  REGISTER_USER: `${ROOT}/users/register`,
  AUTHENTICATE: `${ROOT}/authenticate`,
  GET_CURRENT_USER: `${ROOT}/users/current_user_profile`
}

class Api {
  auth_token = undefined

  constructor({ auth_token }) {
    this.auth_token = auth_token || undefined
  }

  post = ({ data, url }) => axios({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${this.auth_token}`
    },
    url,
    data
  }).then(res => res.data)

  get = ({ data, url }) => axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${this.auth_token}`
    },
    url,
    data
  }).then(res => res.data)

  registerUser = (data) => this.post({ data, url: ENDPOINTS.REGISTER_USER })
  authenticate = (data) => this.post({ data, url: ENDPOINTS.AUTHENTICATE })
  getCurrentUser = () => this.get({ url: ENDPOINTS.GET_CURRENT_USER }).then(res => res.user)
}

export default Api