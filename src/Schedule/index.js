import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import Loading from 'Loading'
import Reserve from './Reserve'
import context from 'lib/context'
import { CLUB_ID_BY_SUBDOMAIN } from '../lib/constants';
import Blocks from '../Reservations';

const now = Date.now()

const toDatetime = ({ date, time }) => {
  const { month, day, year } = date
  const m = moment(`${year}-${month}-${day} ${time}`)
  return m.format('YYYY-MM-DD HH:mm')
}

const SessionPicker = withRouter(({ blocks, date, history, club_id, onSelect }) => {
  const [sessions, setSessions] = useState({})
  const { month, day, year } = date
  const selectedBlocks = Object.keys(sessions).filter(k => sessions[k]).map(k => blocks[k])

  const bookSessions = () => {
    onSelect({ blocks: selectedBlocks })
    return
  }

  return (
    <div className="sessions" data-col="8">
      <label className="instruction">Select Time(s)</label>
      {blocks.map((block, i) => {
        const isSelected = !!sessions[i]
        const toggleSession = () => {
          const newSessions = { ...sessions, [i]: !sessions[i] }
          setSessions(newSessions)
        }

        return (
          <div key={i} className="option session" data-available={block.availability > 0} data-selected={isSelected} onClick={toggleSession}>
            {block.start} - {block.end} ({block.availability} open spots)
          </div>
        )
      })}

      <br />
      <button onClick={bookSessions} disabled={!selectedBlocks.length}>Book Sessions</button>
    </div>
  )
})

const getSubdomain = () => {
  const { host } = window.location
  const parts = host.split('.')
  if (parts.length < 3) return undefined
  return parts[0]
}

const Schedule = withRouter(({ match }) => {
  const [selectedBlocks, setSelectedBlocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [club, setClub] = useState()
  const [day, setDay] = useState(0)

  useEffect(() => {
    const sub = getSubdomain()
    const que = match.params.clubId
    const club_id = CLUB_ID_BY_SUBDOMAIN[sub] || que || '1'

    context.api.getUser(club_id)
      .then(club => {
        setClub(club)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [match.params.clubId])

  if (loading) {
    return <Loading />
  }

  if (!club) {
    return 'No club found.'
  }

  const schedule = club.schedule || []
  const selectedDay = schedule[day]

  if (!selectedDay) {
    return 'No days available.'
  }

  const handleBooking = ({ blocks }) => {
    setSelectedBlocks(blocks)
  }

  if (!!selectedBlocks.length) {
    // if (true) {
    return (
      <Reserve blocks={selectedBlocks} date={selectedDay.date} club={club} />
    )
  }

  return (
    <div data-row>
      <div data-col="12">
        <h3>{club.name}</h3>
        <h1>Book Table Time</h1>
        <p>Make reservations up to 7 days in advance.</p>
        <br />
        <div className="schedule" data-row>
          <div className="day-picker" data-col="4">
            <label className="instruction">Select a day</label>
            <div className="days">

              {schedule.map((d, i) => {
                const abbrev = d.name.substr(0, 3)

                return (
                  <div key={i} className='option day' data-selected={day === i} onClick={() => setDay(i)}>
                    {day === i ? '> ' : ''}{abbrev}, {d.date.month}/{d.date.day}
                  </div>
                )
              })}
            </div>
          </div>
          <SessionPicker key={day} {...selectedDay} club_id={club.id} onSelect={handleBooking} />
        </div>
      </div>
    </div>
  )
})

export default Schedule
