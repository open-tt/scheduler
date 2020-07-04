import React, { useState } from 'react'
import moment from 'moment'
import context from './lib/context';

const now = Date.now()

const toDatetime = ({ date, time }) => {
  const { month, day, year } = date
  const m = moment(`${year}-${month}-${day} ${time}`)
  return m.format('YYYY-MM-DD HH:mm')
}

const SessionPicker = ({ blocks, date }) => {
  const [sessions, setSessions] = useState({})
  const { month, day, year } = date

  const bookSessions = () => {
    const selectedBlocks = Object.keys(sessions).filter(k => sessions[k]).map(k => blocks[k])
    console.log('booking')
    console.log(selectedBlocks)
  }

  return (
    <div className="sessions">
      {blocks.map((block, i) => {
        const isSelected = !!sessions[i]
        const toggleSession = () => {
          const data = {
            "start_date": toDatetime({ date, time: block.start }),
            "end_date": toDatetime({ date, time: block.end }),
            "size": 1,
            "reservation_type": "play",
          }

          const newSessions = { ...sessions, [i]: !sessions[i] }
          setSessions(newSessions)
        }

        return (
          <div key={i} className="session" data-selected={isSelected} onClick={toggleSession}>
            <p>{block.start} - {block.end} ({block.availability} open spots)</p>
          </div>
        )
      })}

      <button onClick={bookSessions}>Book Sessions</button>
    </div>
  )
}

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
    <div className="day-picker">
      <div className="days">
        <h3>Select a Day</h3>
        <br />
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
  )
}

export default DayPicker
