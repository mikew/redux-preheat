function isPromise (p) {
  return p && typeof p.then === 'function'
}

export default function getPreheatPromise (store, components = [], actionArg = null) {
  let promises = []

  components.forEach(function (component) {
    if (!component.preheatList) {
      return
    }

    component.preheatList.forEach(function (action) {
      const result = store.dispatch(action(actionArg))
      let p

      // Handle redux-promise-middleware
      if (result.payload && isPromise(result.payload.promise)) {
        p = result.payload.promise

      // Handle redux-promise
      // Handle redux-thunk
      } else if (isPromise(result)) {
        p = result
      }

      if (!isPromise(p)) {
        return
      }
      promises.push(p)
    })
  })

  return Promise.all(promises).then(function () {
    return store
  })
}
