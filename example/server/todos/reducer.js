import {
  SET_TODOS,
  ADD_TODO,
} from './actions'

const initialState = {
  boobaw:' foo',
  list: [],
}

export default function todos (state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        list: [].concat(action.payload).concat(state.list)
      }
    case SET_TODOS:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}
