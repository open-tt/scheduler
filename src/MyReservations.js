import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Reservations from './Reservations'
import context from 'lib/context'

const formatDateRange = ({ start_date, end_date }) => {
  const startM = moment(start_date)
  const endM = moment(end_date)
  return `${startM.format('h:mm a')} - ${endM.format('h:mm a')}`
}

const getRanges = (reservations) => {
  const ranges = [[]]

  reservations.forEach((res, i) => {
    const lastRange = ranges[ranges.length - 1]
    const lastRes = reservations[i - 1]

    if (!lastRes) return lastRange.push(res)

    if (
      lastRes.end_date === res.start_date &&
      lastRes.club.id === res.club.id &&
      lastRes.size === res.size
    ) {
      return lastRange.push(res)
    }

    const newRange = [res]
    ranges.push(newRange)
  })

  return ranges.map(range => ({
    reservations: range,
    size: range[0].size,
    club: range[0].club,
    start_date: range[0].start_date,
    end_date: range[range.length - 1].end_date
  }))
}

const MyReservations = () => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    context.api.getReservations()
      .then(data => {
        setReservations(data)
      })
  }, [])

  const isCurrent = res => {
    const { start_date } = res
    const start = moment(start_date)
    return start.format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD')
  }

  const currentReservations = reservations.filter(r => isCurrent(r))
  const pastReservations = reservations.filter(r => !isCurrent(r))

  return (
    <div data-row>
      <div data-col="12">
        <h3>{context.state.user.name}</h3>
        <h1>My Reservations</h1>
        <br />
        {!reservations.length && 'No reservations.'}
        <Reservations reservations={currentReservations} />

        {!!pastReservations.length && (
          <>
            <br />
            <br />
            <label>Past Reservations</label>
            <br />
            <br />
            <Reservations reservations={pastReservations} reverse />
          </>
        )}
      </div>
    </div>
  )
}

export default MyReservations
