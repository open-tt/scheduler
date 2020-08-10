import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import Loading from 'Loading'
import useClub from 'useClub';

const toggleArrayItem = (arr, item) => {
  const newArr = arr.slice()
  const index = newArray.indexOf(item)

  if (index === -1) newArr.push(item)
  else newArr.splice(index, 1)
  return newArr
}

const BlockPicker = withRouter(({ blocks, selectedIds, onSelect }) => {
  return (
    <div className="sessions">
      <label className="instruction" data-faded>Select Time(s)</label>
      {blocks.map((block, i) => {
        const isSelected = selectedIds.includes(block.id)

        const toggleBlock = () => {
          const newSelectedIds = toggleArrayItem(selectedIds, block.id)
          const newBlocks = newSelectedIds.map(id => blocks.find(b => b.id === id))
          onSelect({ blocks: newBlocks })
        }

        return (
          <div
            key={block.id}
            className="option session"
            data-available={block.availability > 0}
            data-selected={isSelected}
            onClick={toggleBlock}
          >
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
              <BlockPicker
                key={selectedDay.id}
                blocks={allBlocks}
                club_id={club.id}
                selectedIds={selectedBlocks.map(b => b.id)}
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