import 'babel-polyfill'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from 'react-router-dom'
import Schedule from './Schedule'
import ReactDOM from 'react-dom'
import Layout from './Layout'
import Login from './Login'
import Admin from './Admin'
import Loading from 'Loading'
import MyReservations from './MyReservations'
import context, { ContextProvider } from './lib/context'

const AuthenticatedRoute = (props) => {
  if (context.state.auth_token) {
    if (!context.state.user) {
      return <Loading />
    }

    return <Route {...props} />
  }

  return <Redirect to="/login" />
}

const App = () => {
  return (
    <Router>
      <ContextProvider>
        <Layout>
          <Switch>
            <AuthenticatedRoute exact path="/" component={MyReservations} />
            <AuthenticatedRoute path="/reserve/:club_id" component={Schedule} />
            <Route exact path="/login" component={Login} />
            <AuthenticatedRoute exact path="/admin" component={Admin} />
            <AuthenticatedRoute exact path="/my-reservations" component={MyReservations} />
          </Switch>
        </Layout>
        </ContextProvider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
