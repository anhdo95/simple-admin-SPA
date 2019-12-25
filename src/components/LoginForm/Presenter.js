import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd'
import reduce from 'lodash/reduce'
import ls from 'local-storage'
import { LOGGED_IN_USER_STORAGE } from '@/constant'

const Presenter = (props) => {
  const history = useHistory()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault()

    props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password, remember } = values

        // A hard-coded account should be passed
        if (username === 'demo' && password === 'demo') {
          props.setLoggedInUser(username, remember)

          const { from } = location.state || { from: { pathname: '/admin' } }

          return history.replace(from)
        }

        notification.error({
          message: 'Your account doesn\'t exist. Please try another one.'
        })
      }
    })
  }

  const fields = (() => {
    const { getFieldDecorator } = props.form
    const { username, remember } = ls(LOGGED_IN_USER_STORAGE) || {}

    const formItems = {
      username: {
        rules: [ { required: true, message: 'Please input your username!' } ],
        initialValue: remember ? username : '',
        element: (
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />
        )
      },
      password: {
        rules: [ { required: true, message: 'Please input your password!' } ],
        element: (
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        )
      },
      remember: {
        valuePropName: 'checked',
        initialValue: remember,
        element: <Checkbox>Remember me</Checkbox>
      }
    }

    return reduce(formItems, (result, value, key) => {
      const decorator = getFieldDecorator(key, value)

      result[key] = decorator(value.element)

      return result
    }, {})
  })()

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Form.Item>{fields.username}</Form.Item>
      <Form.Item>{fields.password}</Form.Item>
      <Form.Item>{fields.remember}
        <div>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          <span className="ml-xs">Or <Link to="#">register now!</Link></span>
        </div>
        <Link className="login-form-forgot" to="#">
          Forgot password
        </Link>
      </Form.Item>
    </Form>
  )
}

export default Form.create()(Presenter)
