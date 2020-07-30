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

const getDayId = day => getDateStr({ date: day.date })
const getBlockId = block => `${block.start}-${block.end}`

const SessionPicker = withRouter(({ blocks, selectedBlocks, onSelect }) => {
  const [sessions, setSessions] = useState(selectedBlocks)

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

export const Schedule = withRouter(({ history, match }) => {
  const [selectedBlocks, setSelectedBlocks] = useState([])
  const [selectedDay, setSelectedDay] = useState()
  const { club, loading, schedule } = useClub()

  useEffect(() => {
    if (!club || !schedule) return

    setSelectedDay(schedule.getSelectedDay())
    setSelectedBlocks(schedule.getSelectedBlocks())
  }, [club, schedule])

  if (loading || !selectedDay) return <Loading />
  if (!club) return 'Club not found.'

  const onSelect = ({ day, blocks }) => {
    schedule.setSelection({ ...(day || selectedDay), blocks: blocks || selectedBlocks })
    setSelectedDay(schedule.getSelectedDay())
    setSelectedBlocks(schedule.getSelectedBlocks())
  }

  const reserve = () => {
    history.push(`/reserve/edit/${club.id}`)
  }

  const allDays = schedule.getDays()
  const allBlocks = schedule.getBlocks(selectedDay)

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

                {allDays.map((d, i) => {
                  const abbrev = d.name.substr(0, 3)
                  const str = getDateStr({ date: d.date })
                  const selected = d.id === selectedDay.id

                  return (
                    <div key={d.id} className='option day' data-selected={selected} onClick={() => onSelect({ day: d })}>
                      <label>{abbrev} {d.date.month}/{d.date.day}</label>
                    </div>
                  )
                })}
              </div>
            </div>

            <div data-col="8">
              <SessionPicker
                key={selectedDay.id}
                blocks={allBlocks}
                club_id={club.id}
                selectedBlocks={selectedBlocks}
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