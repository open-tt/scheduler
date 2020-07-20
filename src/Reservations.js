import React, { useState, useEffect } from 'react'
import moment from 'moment'

const formatDateRange = ({ start_date, end_date }) => {
  const startM = moment(start_date)
  const endM = moment(end_date)
  console.log(startM)
  return `${startM.format('h:mm a')} - ${endM.format('h:mm a')}`
}

const Reservation = ({ start, end, availability }) => {
  return (
    <div className="block">
      {start} - {end} ({availability} open spots)
    </div>
  )
}

const ReservationsDay = ({ reservations }) => {
  return (
    <>
      {reservations.map(({ id, start_date, end_date, size }) => {
        return (
          <div key={`${id}-${start_date}`} className="reservation">
            <label>{formatDateRange({ start_date, end_date })} ({size} {size > 1 ? 'people' : 'person'})</label>
          </div>
        )
      })}
    </>
  )
}

const Reservations = ({ reservations, reverse }) => {
  const reservationsByDay = {}
  const activeKeys = {}

  reservations.forEach((res) => {
    const { start_date } = res
    const start = moment(start_date)
    const startDay = start.format('dddd, MMMM Do YYYY')
    const key = `${startDay} - ${res.club.name}`
    activeKeys[key] = start.format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')
    reservationsByDay[key] = reservationsByDay[key] || []
    reservationsByDay[key].push({ ...res, key })
  })

  const orderedReservations = reverse
    ? Object.keys(reservationsByDay).reverse()
    : Object.keys(reservationsByDay)

  return (
    <>
      {orderedReservations.map(day => {
        const all = reservationsByDay[day]

        return (
          <div key={day} className="reservations-day">
            <p>{day}</p>
            <ReservationsDay reservations={all} />
          </div>
        )
      })}
    </>
  )
}

export default Reservations
