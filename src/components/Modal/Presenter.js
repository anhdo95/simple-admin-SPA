import React from 'react'
import { Modal } from 'antd'

const Presenter = (props) => {
  return (
    <Modal
      style={{ top: 20 }}
      title={props.title}
      visible={props.visible}
      footer={props.footer}
      confirmLoading={props.onfirmLoading}
      onOk={props.onOk}
      onCancel={props.onCancel}
    >
      {props.children}
    </Modal>
  )
}

export default Presenter
