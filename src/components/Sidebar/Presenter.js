import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Menu, Icon } from 'antd'

const { SubMenu } = Menu

const adminPages = {
  'dashboard:overview': '/admin',
  'posts:list': '/admin/posts'
}

const Presenter = () => {
  const [ current, setCurrent ] = useState('dashboard')
  const history = useHistory()

  const handleClick = e => {
    setCurrent(e.key)
    history.push(adminPages[e.key])
  }

  return (
    <Menu
      className="app-sidebar"
      theme="dark"
      onClick={handleClick}
      // defaultOpenKeys={[ 'posts' ]}
      selectedKeys={[ current ]}
      mode="inline"
    >
      <Menu.Item>
        <h1 className="app-sidebar__heading">Admin Page</h1>
      </Menu.Item>
      <SubMenu
        key="dashboard"
        title={<span><Icon type="dashboard" /> Dashboard</span>}
      >
        <Menu.Item key="dashboard:overview"><Icon type="area-chart" /> Overview</Menu.Item>
      </SubMenu>
      <SubMenu
        key="posts"
        title={<span><Icon type="snippets" /> Posts</span>}
      >
        <Menu.Item key="posts:list"><Icon type="unordered-list" /> List</Menu.Item>
      </SubMenu>
    </Menu>
  )
}

export default Presenter
