
import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { composeContainer } from '@/util'

const App = (props) => {
  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        { ...rest }
        render={
          ({ location }) => (
            props.isLoggedIn || true ? children : <RedirectRoute location={location} />
          )
        }
      />
    )
  }

  const RedirectRoute = ({ location }) => {
    const toProps = {
      pathname: '/',
      state: { from: location }
    }

    return <Redirect to={toProps} />
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <PrivateRoute path="/admin">
          <Admin />
        </PrivateRoute>
        <Route exact path="*">
            The requested page not found!
        </Route>
      </Switch>
    </Router>
  )
}

const Login = () => <div>Login</div>
const Admin = () => <div>Admin</div>

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default composeContainer(hot(App), mapStateToProps, mapDispatchToProps)
