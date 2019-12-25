import { createStore, /* applyMiddleware */ } from 'redux'

import rootReducer from '@/redux'

const store = createStore(rootReducer)

if (process.env.NODE_ENV === 'development') {
  global.$store = store
}

export default store
