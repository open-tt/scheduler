import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from 'react-router-dom'
import DayPicker from './DayPicker'
import ReactDOM from 'react-dom'
import Layout from './Layout'
import Login from './Login'
import Admin from './Admin'
import MyReservations from './MyReservations'
import context, { ContextProvider } from './lib/context'

const AuthenticatedRoute = (props) => {
  if (context.state.auth_token) {
    if (!context.state.user) {
      return <p>loading...</p>
    }

    return <Route {...props} />
  }

  return <Redirect to="/login" />
}

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Layout>
          <AuthenticatedRoute exact path="/" component={DayPicker} />
          <Route exact path="/login" component={Login} />
          <AuthenticatedRoute exact path="/admin" component={Admin} />
          <AuthenticatedRoute exact path="/my-reservations" component={MyReservations} />
        </Layout>
      </Router>
    </ContextProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
