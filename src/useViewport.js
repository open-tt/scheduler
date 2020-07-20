import React, { useContext, createContext, useState, useEffect } from 'react'
import { debounce } from 'lib/util'

const ViewportContext = createContext()

export const ViewportProvider = ({ children }) => {
  const [vw, setVw] = useState(window.innerWidth)
  const [vh, setVh] = useState(window.innerHeight)

  useEffect(() => {
    const onResize = debounce(() => {
      const newVw = window.innerWidth
      const newVh = window.innerHeight

      if (newVw !== vw) setVw(newVw)
      if (newVh !== vh) setVh(newVh)
    }, 100)

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <ViewportContext.Provider value={{ vw, vh }}>
      {children}
    </ViewportContext.Provider>
  )
}

const useViewport = () => useContext(ViewportContext)

export default useViewport