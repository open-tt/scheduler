import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import DayPicker from './DayPicker'
import ReactDOM from 'react-dom'
import Layout from './Layout'
import Login from './Login'
import { ContextProvider } from './lib/context';

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Layout>
          <Route exact path="/" component={DayPicker} />
          <Route exact path="/login" component={Login} />
        </Layout>
      </Router>
    </ContextProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
