import React, { useContext, createContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import context from 'lib/context'
import { CLUB_ID_BY_SUBDOMAIN, STORAGE } from 'lib/constants';
import * as storage from 'lib/storage'

const ClubContext = createContext()

const getSubdomain = () => {
  const { host } = window.location
  const parts = host.split('.')
  if (parts.length < 3) return undefined
  return parts[0]
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

const getDayId = day => getDateStr({ date: day.date })
const getBlockId = block => `${block.start}-${block.end}`

class Schedule {
  constructor(club) {
    this.club = club
    this.schedule = club.schedule || []

    // const { date, blocks } = storage.getObject(STORAGE.RESERVE)

    // const cachedDay = getDateStr({ date })
    // const selectedDay = allDays.find(d => d.id === cachedDay)

    // const allBlocks = selectedDay.blocks.map(b => ({ ...b, id: getBlockId(b) }))
    // const cachedBlocks = (blocks || [])
    // const selectedBlocks = cachedBlocks.filter(b => allBlocks.find(a => a.id === b.id))
  }

  getDays = () => {
    return this.schedule.map(d => ({ ...d, id: getDayId(d) }))
  }

  getBlocks = (day) => {
    return day.blocks.map(b => ({ ...b, id: getBlockId(b) }))
  }

  getSelectedDay = () => {
    const { day: cachedId } = storage.getObject(STORAGE.RESERVE)
    return this.getDays().find(d => d.id === cachedId) || this.getDays()[0]
  }

  getSelectedBlocks = () => {
    const { blocks: cachedIds } = storage.getObject(STORAGE.RESERVE)
    const day = this.getSelectedDay()
    return this.getBlocks(day).filter(b => (cachedIds || []).includes(b.id))
  }

  setSelection = (day) => {
    const blockIds = day.blocks.map(getBlockId)
    const dayId = getDayId(day)
    storage.setObject(STORAGE.RESERVE, { blocks: blockIds, day: dayId })
  }
}

export const ClubProvider = withRouter(({ children, match }) => {
  const [loading, setLoading] = useState(true)
  const [club, setClub] = useState()
  const [schedule, setSchedule] = useState()

  useEffect(() => {
    setLoading(true)
    const sub = getSubdomain()
    const que = match.params.clubId
    const club_id = CLUB_ID_BY_SUBDOMAIN[sub] || que || '1'

    context.api.getUser(club_id)
      .then(club => {
        setClub(club)
        setSchedule(new Schedule(club))
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <ClubContext.Provider value={{ club, loading, schedule }}>
      {children}
    </ClubContext.Provider>
  )
})

const useClub = () => useContext(ClubContext)

export default useClub