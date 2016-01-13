export default function getFetchDataPromise (components, store, actionArg) {
  let allPrefetchPromises = []

  components.forEach(function (component) {
    if (!component.fetchDataList) {
      return
    }

    component.fetchDataList.forEach(function (action) {
      let p = store.dispatch(action(actionArg))
      // TODO Handle returning a function for callbacks?
      if (!p || !p.then) {
        return
      }
      allPrefetchPromises.push(p)
    })
  })

  return Promise.all(allPrefetchPromises).then(function () {
    return store
  })
}
