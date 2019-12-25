import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ls from 'local-storage'

import Admin from '@/pages/Admin/Container'
import Login from '@/pages/Login/Container'

import { setLoggedInUser } from '@action/user'
import { composeContainer } from '@/util'
import { LOGGED_IN_USER_STORAGE } from '@/constant'

import 'antd/dist/antd.css'
import '@/styles/main.scss'

const App = (props) => {
  const user = ls(LOGGED_IN_USER_STORAGE)
  const isLoggedInUser = user && user.isLoggedIn

  useEffect(() => {
    if (isLoggedInUser) {
      props.setLoggedInUser(user.username, user.isLoggedIn)
    }
  }, [ user, isLoggedInUser ])

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        { ...rest }
        render={
          ({ location }) => (
            props.isLoggedIn || isLoggedInUser ? children : <RedirectRoute location={location} />
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

App.propTypes = {
  isLoggedIn: propTypes.bool,
  setLoggedInUser: propTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedInUser(username, isLoggedIn) {
      const user = {
        username,
        isLoggedIn,
      }

      dispatch(setLoggedInUser(user))
    }
  }
}

export default composeContainer(hot(App), mapStateToProps, mapDispatchToProps)
