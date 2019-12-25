import cloneDeep from 'lodash/cloneDeep'

const initialState = {
  isLoggedIn: false,
  username: null,
}

export default (state = initialState, action) => {
  const clonedState = cloneDeep(state)

  switch (action.type) {
  }

  return clonedState
}
