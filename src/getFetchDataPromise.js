export default function getFetchDataPromise (components, store, actionArg) {
  let promises = []

  components.forEach(function (component) {
    if (!component.preheatList) {
      return
    }

    component.preheatList.forEach(function (action) {
      let p = store.dispatch(action(actionArg))
      // TODO Handle returning a function for callbacks?
      if (!p || !p.then) {
        return
      }
      promises.push(p)
    })
  })

  return Promise.all(promises).then(function () {
    return store
  })
}
