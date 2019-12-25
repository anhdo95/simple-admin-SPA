import { SET_LOGGED_IN_USER } from '@/constant'

export const setLoggedInUser = (loggedInUser) => {
  return {
    type: SET_LOGGED_IN_USER,
    payload: loggedInUser
  }
}
