import axios from 'axios'

const ROOT = 'https://nameless-spire-32644.herokuapp.com'

const ENDPOINTS = {
  REGISTER_USER: `${ROOT}/users/register`,
  AUTHENTICATE: `${ROOT}/authenticate`,
  CURRENT_USER: `${ROOT}/users/current_user`,
  USERS: `${ROOT}/users`,
  SCHEDULE_CONFIG: `${ROOT}/current_user/scheduleConfigs`,
  USER_RESERVATIONS: `${ROOT}/current_user/reservations`,
  USER_RESERVATIONS_BATCH: `${ROOT}/current_user/reservations/batch`,
  RESERVATIONS: `${ROOT}/reservations`
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

  put = ({ data, url }) => axios({
    method: 'PUT',
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
  getCurrentUser = () => this.get({ url: ENDPOINTS.CURRENT_USER }).then(res => res.user)
  createScheduleConfig = (data) => this.post({ data, url: ENDPOINTS.SCHEDULE_CONFIG })
  getScheduleConfig = () => this.get({ url: ENDPOINTS.SCHEDULE_CONFIG }).then(res => res.schedule_config)
  updateScheduleConfig = (data) => this.put({ data, url: ENDPOINTS.SCHEDULE_CONFIG })
  createReservation = (data) => this.post({ data, url: ENDPOINTS.USER_RESERVATIONS })
  createReservations = (data) => this.post({ data, url: ENDPOINTS.USER_RESERVATIONS_BATCH })
  getMyReservations = () => this.get({ url: ENDPOINTS.USER_RESERVATIONS }).then(res => res.reservations)
  getReservations = ({ club_id }) => this.get({ url: `${ENDPOINTS.RESERVATIONS}?club_id=${club_id}` }).then(res => res.reservations)
  getUser = (userId) => this.get({ url: `${ENDPOINTS.USERS}/${userId}` }).then(res => res.user)
  updateUser = ({ id, ...data }) => this.put({ data, url: `${ENDPOINTS.USERS}/${id}` }).then(res => res.user)
}

export default Api
