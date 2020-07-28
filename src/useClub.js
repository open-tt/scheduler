import React, { useContext, createContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import context from 'lib/context'
import { CLUB_ID_BY_SUBDOMAIN } from 'lib/constants';

const ClubContext = createContext()

const getSubdomain = () => {
  const { host } = window.location
  const parts = host.split('.')
  if (parts.length < 3) return undefined
  return parts[0]
}

export const ClubProvider = withRouter(({ children, match }) => {
  const [loading, setLoading] = useState(true)
  const [club, setClub] = useState()

  useEffect(() => {
    setLoading(true)
    const sub = getSubdomain()
    const que = match.params.clubId
    const club_id = CLUB_ID_BY_SUBDOMAIN[sub] || que || '1'

    context.api.getUser(club_id)
      .then(club => {
        setClub(club)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <ClubContext.Provider value={{ club, loading }}>
      {children}
    </ClubContext.Provider>
  )
})

const useClub = () => useContext(ClubContext)

export default useClub