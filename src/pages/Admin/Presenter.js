import React from 'react'
import propTypes from 'prop-types'
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'antd'

import Sidebar from '@/components/Sidebar/Container'
import Posts from '@/components/Posts/Container'

const Presenter = (props) => {
  const history = useHistory()
  const { path } = useRouteMatch()

  function handleMenuClick(e) {
    if (e.key === 'logout') {
      props.removeLoggedInUser()

      return history.push('/')
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout">
        <Icon type="logout" />Logout
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="admin-page">
      <Sidebar />

      <div className="admin-page__content">
        <header className="admin-page__header">
          <Dropdown overlay={menu} trigger={[ 'click' ]}>
            <span className="admin-page__user">
              <Icon className="admin-page__user-icon" type="user" />{props.username}
              <Icon className="ml-xs" type="down" />
            </span>
          </Dropdown>,
        </header>
        <main className="admin-page__main">
          <Switch>
            <Route exact path={path}></Route>
            <Route path={`${path}/posts`}>
              <Posts />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  )
}

Presenter.propTypes = {
  username: propTypes.string.isRequired,
  removeLoggedInUser: propTypes.func.isRequired
}

export default Presenter
