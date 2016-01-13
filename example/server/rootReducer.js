import { combineReducers } from 'redux'

import todos from './todos/reducer'
import clientServerMessage from './clientServerMessage/reducer'

const rootReducer = combineReducers({
  todos,
  clientServerMessage
})

export default rootReducer
