export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'

export function setTodos (json) {
  return {
    type: SET_TODOS,
    payload: json,
  }
}

export function addTodo (obj) {
  return function (dispatch, getState) {
    if (!obj || !obj.title || obj.title.length === 0) {
      return
    }

    return dispatch({
      type: ADD_TODO,
      payload: obj,
    })
  }
}

export function fetchData () {
  return function (dispatch, getState) {
    if (getState().todos.list.length !== 0) {
      return
    }

    return fetch('http://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => json.slice(0, 20))
        .then(json => dispatch(setTodos(json)))
  }
}
