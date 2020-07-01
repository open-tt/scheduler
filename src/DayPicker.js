import React from 'react'
import moment from 'moment'
import context from './lib/context';

const now = Date.now()

const DayPicker = ({ start = now }) => {
  const { user } = context.state
  const startMoment = moment(start)
  startMoment.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  console.log(startMoment)

  const moments = Array(7).fill().map((_, i) => {
    const nextMoment = moment(startMoment)
    return nextMoment.add(i, 'days')
  })

  const schedule = user.schedule || []

  return (
    <div>
      <h3>Select a Day (at some point) </h3>
      <div>
        {schedule.map((d, i) => {
          return (
            <div key={i}>
              <label>{d.name}, {d.date.month}-{d.date.day}</label>
              {d.blocks.map(block => {
                return (
                  <p key={block.start}>{block.start} - {block.end} ({block.availability} open spots)</p>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DayPicker