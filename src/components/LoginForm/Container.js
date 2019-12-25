import ls from 'local-storage'
import { setLoggedInUser } from '@action/user'
import { composeContainer } from '@/util'
import { LOGGED_IN_USER_STORAGE } from '@/constant'

import Presenter from './Presenter'

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedInUser(username, remember) {
      const user = {
        username,
        isLoggedIn: true,
      }

      dispatch(setLoggedInUser(user))

      ls(LOGGED_IN_USER_STORAGE, {
        ...user,
        remember
      })
    }
  }
}

export default composeContainer(Presenter, mapStateToProps, mapDispatchToProps)
