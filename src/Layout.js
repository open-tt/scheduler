import React from 'react'
import { Link } from 'react-router-dom'
import context from 'lib/context'

const Layout = ({ children }) => {
  const loggedIn = !!context.state.user

  return (
    <>
      <div data-row="2"></div>
      <header data-page>
        <div data-row>
          <div data-col="4">
            TT Scheduler
          </div>

          {loggedIn && <div className="links" data-col="8">
            <Link to="/admin">Admin</Link>
            <Link to="/reserve">Book</Link>
            <Link to="/my-reservations">My Reservations</Link>
            <button onClick={context.unauthenticate} data-plain data-link>Logout</button>
          </div>}
        </div>
      </header>

      <div data-row="2"></div>

      <main data-page>
        {children}
      </main>
    </>
  )
}

export default Layout
