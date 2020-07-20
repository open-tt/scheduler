import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import context from 'lib/context'
import IconOpenTT from './icons/OpenTT';

const Menu = () => {
  const [open, setOpen] = useState(false)
  const { user } = context.state
  const loggedIn = !!user

  const close = () => setOpen(false)

  const logout = () => {
    context.unauthenticate()
    close()
  }

  if (!open) {
    return (
      <button data-plain onClick={() => setOpen(true)}>
        menu
      </button>
    )
  }

  return (
    <div className="menu inner" data-row>
      <div className="close" onClick={close}>X</div>
      {loggedIn && <div className="links">
        <Link onClick={close} to="/admin">Admin</Link>
        <Link onClick={close} to="/reserve/1">Book (Test Club)</Link>
        <Link onClick={close} to={`/reserve/${user.id}`}>Book (My Club)</Link>
        <Link onClick={close} to="/my-reservations">My Reservations</Link>
        <button onClick={logout} data-plain data-link>Logout</button>
      </div>}
    </div>
  )
}

const Layout = ({ children }) => {
  const { user } = context.state
  const loggedIn = !!user

  return (
    <>
      <div className="inner" data-row>
        <header data-page>
          <div data-row className="header-inner">
            <div data-col="8">
              <div className="logo">
                <IconOpenTT /> <label>Reservations</label>
              </div>
            </div>

            <Menu />
          </div>
        </header>

        <div data-row="2"></div>

        <main data-page>
          {children}
          <div data-row="5"></div>
        </main>
      </div>
    </>
  )
}

export default Layout
