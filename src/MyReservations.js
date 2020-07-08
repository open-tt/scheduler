import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import context from 'lib/context'

const formatDateRange = ({ start_date, end_date }) => {
  const startM = moment(start_date)
  const endM = moment(end_date)
  return `${startM.format('h:mm a')} - ${endM.format('h:mm a')}`
}

const MyReservations = () => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    context.api.getReservations()
      .then(data => {
        setReservations(data)
      })
  }, [])

  const reservationsByDay = {}

  reservations.forEach((res) => {
    const { start_date } = res
    const start = moment(start_date)
    const startDay = start.format('dddd, MMMM Do YYYY')
    reservationsByDay[startDay] = reservationsByDay[startDay] || []
    reservationsByDay[startDay].push(res)
  })

  return (
    <div data-row>
      <div data-col="12">
        <h3>{context.state.user.name}</h3>
        <h1>My Reservations</h1>
        <br />
        {!reservations.length && 'No reservations.'}
        {Object.keys(reservationsByDay).map(day => {
          const all = reservationsByDay[day]
          return (
            <div key={day}>
              <label>{day}</label>
              {all.map(({ id, start_date, end_date, size }) => {

                return (
                  <div key={id} className="reservation">
                    <label>{formatDateRange({ start_date, end_date })}</label>
                    <p>For {size} {size > 1 ? 'people' : 'person'}</p>
                  </div>
                )
              })}
              <br />
              <br />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyReservations
