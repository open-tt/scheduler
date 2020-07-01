import React from 'react'
import moment from 'moment'
import context from './lib/context';

const now = Date.now()

const DayPicker = ({ start = now }) => {
  const startMoment = moment(start)
  startMoment.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  console.log(startMoment)

  const moments = Array(7).fill().map((_, i) => {
    const nextMoment = moment(startMoment)
    return nextMoment.add(i, 'days')
  })

  return (
    <div>
      <h3>Select a Day (lol) </h3>
      <div>
        {context.state.user && JSON.stringify(context.state.user.schedule)}
        {/* {moments.map(m => (
          <div>
            {m.format("dddd, MMMM Do YYYY")}
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default DayPicker