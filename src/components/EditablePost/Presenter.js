import React from 'react'
import { Form, Input, Icon, Select, Button, AutoComplete, DatePicker } from 'antd'
import moment from 'moment'
import reduce from 'lodash/reduce'

import { disabledDate } from '@/util'
import { FAKE_CATEGORIES, FULL_DATETIME_FORMAT, TIME_FORMAT, DEFAULT_TIME } from '@/constant'

const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
}

const Presenter = (props) => {
  if (props.canReset) {
    props.form.resetFields()
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        props.onSubmit(values)
      }
    })
  }

  const fields = (() => {
    const { post, form: { getFieldDecorator } } = props

    const formItems = {
      title: {
        rules: [ { required: true, message: 'Please input a post title!', } ],
        initialValue: post && post.title,
        element: <Input placeholder="Please enter a post title" />
      },
      content: {
        rules: [ { required: true, message: 'Please input a post content!', } ],
        initialValue: post && post.content,
        element: (
          <TextArea placeholder="Please enter a post content" autoSize={{ minRows: 3, maxRows: 6 }} />
        )
      },
      category: {
        rules: [ { required: true, message: 'Please select a post category!', } ],
        initialValue: post && post.category,
        element: (
          <AutoComplete dataSource={FAKE_CATEGORIES} placeholder="Search categories">
            <Input suffix={<Icon type="search" />} />
          </AutoComplete>
        )
      },
      tags: {
        rules: [ { required: true, message: 'Please input post tags!', } ],
        initialValue: (post && post.tags) || undefined,
        element: (
          <Select
            mode="tags"
            placeholder="Please input post tags"
            dropdownRender={() => <span />}
            tokenSeparators={ [ ',' ] }
          />
        )
      },
      published: {
        rules: [ { required: true, message: 'Please choose a published date!', } ],
        initialValue: post && moment(post.published),
        element: (
          <DatePicker
            style={{ width: '100%' }}
            format={FULL_DATETIME_FORMAT}
            disabledDate={disabledDate}
            showTime={{ defaultValue: moment(DEFAULT_TIME, TIME_FORMAT) }}
          />
        )
      },
    }

    return reduce(formItems, (result, value, key) => {
      const decorator = getFieldDecorator(key, value)

      result[key] = decorator(value.element)

      return result
    }, {})
  })()

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label="Title">{fields.title}</Form.Item>
      <Form.Item label="Content">{fields.content}</Form.Item>
      <Form.Item label="Category">{fields.category}</Form.Item>
      <Form.Item label="Tags">{fields.tags}</Form.Item>
      <Form.Item label="Published">{fields.published}</Form.Item>

      <div className="text-right">
        <Button type="primary" htmlType="submit">
          {props.post ? 'Save changes' : 'Create New'}
        </Button>
      </div>
    </Form>
  )
}

export default Form.create()(Presenter)
