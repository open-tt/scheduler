import React from 'react'
import context from 'lib/context'

const Layout = ({ children }) => {
  console.log('rerender')
  console.log(context.state)
  return (
    <main>
      {context.state.user && `logged in as ${context.state.user.name}`}
      {children}
    </main>
  )
}

export default Layout