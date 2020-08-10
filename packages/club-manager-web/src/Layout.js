import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import context from 'lib/context'
import IconOpenTT from './icons/OpenTT';

const MenuLink = withRouter(({ location, children, to = '#', onClick }) => {
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      onClick={onClick}
      className="menu-link"
      data-active={isActive}
      tabIndex={isActive ? -1 : ''}
    >
      <label>
        {children}
      </label>
    </Link>
  )
})

const Menu = () => {
  const [open, setOpen] = useState(false)
  const { user } = context.state
  const loggedIn = !!user

  const close = () => setOpen(false)

  const logout = () => {
    context.unauthenticate()
    close()
  }

  const toggleMenu = () => {
    setOpen(!open)
  }

  return (
    <>
      <button className="menu-toggle" data-plain onClick={toggleMenu} data-open={open}>
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </button>
      <div className="menu-overlay" onClick={close} data-open={open} />
      <div className="menu inner" data-row data-open={open}>
        {loggedIn && <div className="links">
          <MenuLink onClick={close} to="/admin">Admin</MenuLink>
          <MenuLink onClick={close} to="/reserve/1">Book (Test Club)</MenuLink>
          <MenuLink onClick={close} to={`/reserve/${user.id}`}>Book (My Club)</MenuLink>
          <MenuLink onClick={close} to="/my-reservations">My Reservations</MenuLink>
          <MenuLink onClick={logout} data-plain data-link>Logout</MenuLink>
        </div>}
      </div>
    </>
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
          <div data-row="2"></div>
        </header>

        <main data-page>
          {/* scrollable exists just so the scrollbar can have a litle space */}
          <div className="scrollable">
            <div className="inner" data-row>
              <div data-col="12">
                <div data-row="2"></div>
                {children}
                <div data-row="5"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Layout
