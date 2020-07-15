import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Form, Field } from 'react-final-form'
import { withRouter, Link } from 'react-router-dom'
import FormField from './form/FormField'
import Loading from 'Loading'
import context from 'lib/context'
import { DEFAULT_SCHEDULE_CONFIG } from './lib/constants'
import Reservations from './Reservations'

const ReservationsTable = ({ reservations }) => {
  return (
    <div>
      <div data-row>
        <div data-col="2">
          Date
        </div>
        <div data-col="2">
          Start Time
        </div>
        <div data-col="2">
          End Time
        </div>
        <div data-col="4">
          Name
        </div>
        <div data-col="2">
          Payment Info
        </div>
      </div>
      <br />

      {reservations.map(({ id, start_date, end_date, user }) => {
        const startM = moment(start_date)
        const endM = moment(end_date)

        return (
          <div key={id} data-row>
            <div data-col="2">
              {startM.format('YYYY-MM-DD')}
            </div>
            <div data-col="2">
              {startM.format('h:mm a')}
            </div>
            <div data-col="2">
              {endM.format('h:mm a')}
            </div>
            <div data-col="4">
              {user.name}
            </div>
            <div data-col="2">
              ???
            </div>
          </div>
        )
      })}
    </div>
  )
}

const AdminReservations = withRouter(({ history }) => {
  const { api, state: { user } } = context
  const [reservations, setReservations] = useState()

  useEffect(() => {
    if (!user) return
    api.getReservations({ club_id: user.id })
      .then(setReservations)
  }, [user.id])

  if (!user || !reservations) {
    return <Loading />
  }

  console.log(reservations)

  return (
    <div data-row>
      <div data-col="12">
        <h3>{user.name}</h3>
        <h1>Admin Dashboard</h1>
        <Link to="/admin">Edit Club Settings</Link>
        <br />
        <br />

        <h2>All Reservations</h2>
        <br />

        <div data-row>
          <div data-col="12">
            <ReservationsTable reservations={reservations} />
          </div>
        </div>
      </div>
    </div>
  )
})

export default AdminReservations
