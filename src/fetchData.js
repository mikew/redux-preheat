import { PropTypes } from 'react'

export default function fetchData (getter) {
  return function (component) {
    injectComponentDidMount(getter)(component)
    addToFetchData(getter)(component)
    return component
  }
}

let storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
})

function injectComponentDidMount (getter) {
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
      store.dispatch(getter(this))
    }
  }
}

function addToFetchData (getter) {
  return function (component) {
    component.fetchDataList = (component.fetchDataList || []).concat(getter)
  }
}
