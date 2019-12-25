import { composeContainer } from '@/util'

import Presenter from './Presenter'

const mapStateToProps = (state) => {
  return {
    username: state.user.username
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

export default composeContainer(Presenter, mapStateToProps, mapDispatchToProps)
