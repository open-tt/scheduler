import React, { useState, useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import { withRouter, Link } from 'react-router-dom'
import FormField from './form/FormField'
import Loading from 'Loading'
import context from 'lib/context'
import { DEFAULT_SCHEDULE_CONFIG } from './lib/constants'
import Reservations from './Reservations';

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
        <h1>Club Reservations</h1>
        <Link to="/admin">Edit Club Settings</Link>
        <br />
        <br />

        <div data-row>
          <div data-col="12">
            <Reservations reservations={reservations} />
          </div>
        </div>
      </div>
    </div>
  )
})

export default AdminReservations
