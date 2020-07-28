import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import Loading from 'Loading'
import Reserve from './Edit'
import context from 'lib/context'
import Blocks from '../Reservations';
import { STORAGE } from 'lib/constants'
import * as storage from 'lib/storage'
import useClub, { ClubProvider } from 'useClub';

const now = Date.now()

const toDatetime = ({ date, time }) => {
  const { month, day, year } = date
  const m = moment(`${year}-${month}-${day} ${time}`)
  return m.format('YYYY-MM-DD HH:mm')
}

const getDateStr = ({ date }) => {
  let m

  if (date) {
    const { month, day, year } = date
    m = moment(`${year}-${month}-${day}`)
  } else {
    m = moment()
  }

  return m.format('YYYY-MM-DD')
}

const SessionPicker = withRouter(({ blocks, onSelect }) => {
  const data = storage.getObject(STORAGE.RESERVE)
  const cachedBlocks = data.blocks || []
  const date = data.date || {}

  const [sessions, setSessions] = useState(cachedBlocks)

  useEffect(() => {
    const selectedBlocks = Object.keys(sessions).filter(k => sessions[k]).map(k => blocks[k])
    onSelect({ blocks: selectedBlocks })
  }, [sessions])

  return (
    <div className="sessions">
      <label className="instruction" data-faded>Select Time(s)</label>
      {blocks.map((block, i) => {
        const isSelected = !!sessions[i]

        const toggleSession = () => {
          const newSessions = { ...sessions, [i]: !sessions[i] }
          setSessions(newSessions)
        }

        return (
          <div key={i} className="option session" data-available={block.availability > 0} data-selected={isSelected} onClick={toggleSession}>
            <label>{block.start} - {block.end}</label>
            {!!block.availability && (
              <label className="availability">
                {block.availability} open
              </label>
            )}
          </div>
        )
      })}
    </div>
  )
})

const _Schedule = withRouter(({ history, match }) => {
  const { date, blocks } = storage.getObject(STORAGE.RESERVE)
  const cachedBlocks = date ? (blocks || []) : []
  const cachedDay = getDateStr({ date })

  const [selectedBlocks, setSelectedBlocks] = useState(cachedBlocks)
  const [day, setDay] = useState(cachedDay)
  const { club, loading } = useClub()

  if (loading) {
    return <Loading />
  }

  if (!club) {
    return 'No club found.'
  }

  const schedule = club.schedule || []
  const selectedDay = schedule.find(d => getDateStr({ date: d.date }) === day)

  if (!selectedDay) {
    return 'No days available.'
  }

  const onSelect = ({ blocks }) => {
    setSelectedBlocks(blocks)
  }

  const onCancel = () => setSelectedBlocks([])

  // if (!!selectedBlocks.length) {
  //   // if (true) {
  //   return (
  //     <Reserve onCancel={onCancel} blocks={selectedBlocks} date={selectedDay.date} club={club} />
  //   )
  // }

  const reserve = () => {
    console.log('dud')
    storage.setObject(STORAGE.RESERVE, {
      blocks: selectedBlocks,
      date: selectedDay.date
    })
    history.push(`/reserve/edit/${club.id}`)
  }

  console.log(selectedBlocks)

  return (
    <>
      <div data-row>
        <div data-col="12">
          <h3>{club.name}</h3>
          <h1>Book Table Time</h1>
          <p>Make reservations up to 7 days in advance.</p>
          <br />
          <div className="schedule" data-row>
            <div className="day-picker" data-col="4">
              <label className="instruction" data-faded>Select a day</label>
              <div className="days">

                {schedule.map((d, i) => {
                  const abbrev = d.name.substr(0, 3)
                  const str = getDateStr({ date: d.date })
                  const selected = str === day

                  return (
                    <div key={str} className='option day' data-selected={selected} onClick={() => setDay(str)}>
                      <label>{abbrev} {d.date.month}/{d.date.day}</label>
                    </div>
                  )
                })}
              </div>
            </div>

            <div data-col="8">
              <SessionPicker
                key={day}
                {...selectedDay}
                club_id={club.id}
                onSelect={onSelect}
              />
              <div data-row="2" />
              <button onClick={reserve} disabled={!selectedBlocks.length}>
                Reserve {selectedBlocks.length} Session{selectedBlocks.length === 1 ? '' : 's'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export const Schedule = () => (
  <ClubProvider>
    <_Schedule />
  </ClubProvider>
)