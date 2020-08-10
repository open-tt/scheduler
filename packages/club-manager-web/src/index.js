import 'babel-polyfill'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from 'react-router-dom'
import * as Reserve from './Reserve'
import ReactDOM from 'react-dom'
import Layout from './Layout'
import Login from './Login'
import Admin from './Admin'
import Loading from 'Loading'
import MyReservations from './MyReservations'
import context, { ContextProvider } from './lib/context'
import AdminReservations from './AdminReservations'
import { ViewportProvider } from './useViewport';
import { ClubProvider } from './useClub';

const AuthenticatedRoute = (props) => {
  if (context.state.auth_token) {
    if (!context.state.user) {
      return <Loading />
    }

    return <Route {...props} />
  }

  return <Redirect to="/login" />
}

const Routes = () => (
  <Switch>
    <AuthenticatedRoute exact path="/" component={MyReservations} />
    <AuthenticatedRoute path="/reserve/edit/:clubId" component={Reserve.Edit} />
    <AuthenticatedRoute path="/reserve/:clubId" component={Reserve.Schedule} />
    <Route exact path="/login" component={Login} />
    <AuthenticatedRoute exact path="/my-reservations" component={MyReservations} />
    <AuthenticatedRoute exact path="/admin" component={Admin} />
    <AuthenticatedRoute exact path="/admin/reservations" component={AdminReservations} />
  </Switch>
)

const App = () => {
  return (
    <Router>
      <ClubProvider>
        <ViewportProvider>
          <ContextProvider>
            <Layout>
              <Routes />
            </Layout>
          </ContextProvider>
        </ViewportProvider>
      </ClubProvider>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
