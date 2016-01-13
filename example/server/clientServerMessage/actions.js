export const SET_MESSAGE = 'SET_MESSAGE'

export function setMessage (message) {
  return {
    type: SET_MESSAGE,
    payload: message,
  }
}

export function preheatClient (component) {
  return function (dispatch, getState) {
    if (getState().clientServerMessage !== '') {
      return
    }

    dispatch(setMessage('This component was rendered on the client'))
  }
}

export function preheatServer (component) {
  return setMessage('This component was rendered on the server')
}
