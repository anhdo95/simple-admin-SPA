import ls from 'local-storage'
import { setLoggedInUser } from '@action/user'
import { composeContainer } from '@/util'
import { LOGGED_IN_USER_STORAGE } from '@/constant'

import Presenter from './Presenter'

const mapStateToProps = (state) => {
  return {
    username: state.user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeLoggedInUser() {
      const user = {
        username: null,
        isLoggedIn: false,
      }

      dispatch(setLoggedInUser(user))

      ls.remove(LOGGED_IN_USER_STORAGE)
    }
  }
}

export default composeContainer(Presenter, mapStateToProps, mapDispatchToProps)
