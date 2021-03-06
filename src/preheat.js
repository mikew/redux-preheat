import { PropTypes } from 'react'

export default function preheat (clientAction, serverAction) {
  return function (component) {
    injectComponentDidMount(clientAction)(component)
    addToPreheat(serverAction || clientAction)(component)
    return component
  }
}

let storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
})

function injectComponentDidMount (action) {
  return function (component) {
    let contextTypes = component.contextTypes || {}
    contextTypes.store = contextTypes.store || storeShape
    component.contextTypes = contextTypes

    let originalCDM = component.prototype.componentDidMount
    component.prototype.componentDidMount = function () {
      if (originalCDM) {
        originalCDM.call(this)
      }

      let store = this.props.store || this.context.store
      store.dispatch(action(this))
    }
  }
}

function addToPreheat (action) {
  return function (component) {
    component.preheatList = (component.preheatList || []).concat(action)
  }
}
