import React from 'react'
import moment from 'moment'

const now = Date.now()

const DayPicker = ({ start = now }) => {
  const startMoment = moment(start)
  startMoment.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  console.log(startMoment)

  const moments = Array(7).fill().map((_, i) => {
    const nextMoment = moment(startMoment)
    return nextMoment.add(i, 'days')
  })
  console.log(moments)

  return (
    <div>
      <h3>Select a Day</h3>
      <div>
        {moments.map(m => (
          <div>
            {m.format("dddd, MMMM Do YYYY")}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DayPicker