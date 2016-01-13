import {
  SET_MESSAGE,
} from './actions'

export default function clientServerMessage (state = '', action) {
  switch (action.type) {
    case SET_MESSAGE:
      return action.payload
    default:
      return state
  }
}
