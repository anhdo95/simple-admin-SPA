import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Tag } from 'antd'
import moment from 'moment'
import ls from 'local-storage'
import uuidv4 from 'uuid/v4'

import Modal from '@/components/Modal/Container'
import EditablePost from '@/components/EditablePost/Container'

import i18n from '@/i18n'
import { USER_POSTS_STORAGE, FULL_DATETIME_FORMAT } from '@/constant'

const Presenter = (props) => {
  const [ visible, setVisible ] = useState(false)
  const [ selectedPost, setSelectedPost ] = useState(null)
  const [ canReset, setCanReset ] = useState(false)
  const [ selectedRowKeys, setSelectedRowKeys ] = useState(null)

  const columns = [
    {
      title: i18n.get('common.title'),
      dataIndex: 'title',
      render(text, record) {
        return <Link to="#" onClick={handleUpdate(record)}>{text}</Link>
      }
    },
    {
      title: i18n.get('common.author'),
      dataIndex: 'author',
    },
    {
      title: i18n.get('common.category'),
      dataIndex: 'category',
    },
    {
      title: i18n.get('common.tags'),
      dataIndex: 'tags',
      width: '20%',
      render(tags) {
        return tags.map(tag => (
          <Tag key={tag} color="#87d068">{tag}</Tag>
        ))
      }
    },
    {
      title: i18n.get('common.date'),
      dataIndex: 'published',
      render(text) {
        return (
          <p>
            {i18n.get('common.published')}<br />
            <span>{moment(text).format(FULL_DATETIME_FORMAT)}</span>
          </p>
        )
      }
    },
  ]

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }

  const handleCreate = () => {
    setVisible(true)
    setCanReset(false)
  }

  const handleUpdate = (record) => {
    return () => {
      handleCreate()
      setSelectedPost(record)
    }
  }

  const handleModalClose = () => {
    setVisible(false)
    setCanReset(true)
    setSelectedPost(null)
  }

  const handleFormSubmit = (submittedPost) => {
    const posts = ls(USER_POSTS_STORAGE) || []

    if (selectedPost) {
      const updatedPostIndex = posts.findIndex(p => p.id === selectedPost.id)
      posts[updatedPostIndex] = {
        ...selectedPost,
        ...submittedPost
      }
    } else {
      const id = uuidv4()

      posts.push({
        ...submittedPost,
        id,
        key: id,
        author: props.username
      })
    }

    ls(USER_POSTS_STORAGE, posts)
    handleModalClose()
  }

  const handleDelete = () => {
    if (!selectedRowKeys || !selectedRowKeys.length) {
      return
    }

    if (!confirm(i18n.get('message.notification.post.deletingConfirmation'))) {
      return
    }

    const posts = ls(USER_POSTS_STORAGE)

    const updatedPosts = posts.filter(p => !selectedRowKeys.includes(p.key))

    ls(USER_POSTS_STORAGE, updatedPosts)
    setSelectedRowKeys(null)
  }

  return (
    <div className="app-posts">
      <section className="mb-md app-posts__cta">
        <Button type="primary" icon="plus" onClick={handleCreate}>
          Create New
        </Button>
        <Button className="ml-md" type="danger" icon="delete" onClick={handleDelete}>
          Delete
        </Button>
      </section>
      <Table
        size="small"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={ls(USER_POSTS_STORAGE) || []}
        pagination={false}
        scroll={ { x: true } }
      />
      <Modal
        title={i18n.get('message.form.createNewPost')}
        visible={visible}
        onCancel={handleModalClose}
        footer={null}
      >
        <EditablePost post={selectedPost} canReset={canReset} onSubmit={handleFormSubmit} />
      </Modal>
    </div>
  )
}

export default Presenter
