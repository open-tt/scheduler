import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import context from './lib/context';

const now = Date.now()

const toDatetime = ({ date, time }) => {
  const { month, day, year } = date
  const m = moment(`${year}-${month}-${day} ${time}`)
  return m.format('YYYY-MM-DD HH:mm')
}

const SessionPicker = withRouter(({ blocks, date, history }) => {
  const [sessions, setSessions] = useState({})
  const { month, day, year } = date
  const selectedBlocks = Object.keys(sessions).filter(k => sessions[k]).map(k => blocks[k])

  const bookSessions = () => {
    console.log('booking')

    const promises = selectedBlocks.map(block => (
      context.api.createReservation({
        "start_date": toDatetime({ date, time: block.start }),
        "end_date": toDatetime({ date, time: block.end }),
        "size": 1,
        "reservation_type": "play",
      })
    ))

    Promise.all(promises).then(() => {
      console.log('Success!')
    })
    .catch((err) => {
      console.error('Some reservations were not completed:', err)
    })
    .finally(() => {
      console.log('navigating away now')
      setSessions({})
      history.push('/my-reservations')
    })
  }

  return (
    <div className="sessions">
      {blocks.map((block, i) => {
        const isSelected = !!sessions[i]
        const toggleSession = () => {
          const newSessions = { ...sessions, [i]: !sessions[i] }
          setSessions(newSessions)
        }

        return (
          <div key={i} className="session" data-selected={isSelected} onClick={toggleSession}>
            <p>{block.start} - {block.end} ({block.availability} open spots)</p>
          </div>
        )
      })}

      <button onClick={bookSessions} disabled={!selectedBlocks.length}>Book Sessions</button>
    </div>
  )
})

const DayPicker = () => {
  const [day, setDay] = useState(0)
  const { user } = context.state

  const schedule = user.schedule || []

  console.log(schedule)

  const selectedDay = schedule[day]

  if (!selectedDay) {
    return 'No days available.'
  }

  return (
    <div>
      <h1>Book Table Time</h1>
      <div className="day-picker">
        <div className="days">
          {schedule.map((d, i) => {
            return (
              <div key={i} className='day' data-selected={day === i} onClick={() => setDay(i)}>
                <label>{d.name}, {d.date.month}-{d.date.day}</label>
              </div>
            )
          })}
        </div>
        <SessionPicker key={day} {...selectedDay} />
      </div>
    </div>
  )
}

export default DayPicker
