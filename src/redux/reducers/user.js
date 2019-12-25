import cloneDeep from 'lodash/cloneDeep'

import { SET_LOGGED_IN_USER } from '@/constant'

const initialState = {
  isLoggedIn: false,
  username: null,
}

export default (state = initialState, action) => {
  const clonedState = cloneDeep(state)

  switch (action.type) {
    case SET_LOGGED_IN_USER: {
      clonedState.isLoggedIn = action.payload.isLoggedIn
      clonedState.username = action.payload.username
      break
    }
  }

  return clonedState
}
