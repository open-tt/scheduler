import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import context from 'lib/context'

const formatDateRange = ({ start_date, end_date }) => {
  const startM = moment(start_date)
  const endM = moment(end_date)
  return `${startM.format('dddd, MMMM Do YYYY, h:mm a')} - ${endM.format('h:mm a')}`
}

const MyReservations = () => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    context.api.getReservations()
      .then(data => {
        setReservations(data)
      })
  }, [])

  return (
    <div data-row>
      <div data-col="12">
        <h1>Reservations for {context.state.user.name}</h1>
        {!reservations.length && 'No reservations.'}
        {reservations.map(({ id, start_date, end_date, size }) => {

          return (
            <div key={id} className="reservation">
              <label>{formatDateRange({ start_date, end_date })}</label>
              <p>For {size} {size > 1 ? 'people' : 'person'}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyReservations
