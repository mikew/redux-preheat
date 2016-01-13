# redux-preheat

A helpful decorator to run Redux actions in universal React apps with
support for Promises.

## Why?

In a universal app you will want the store's state from the sever to
match on the client side. You can solve this by adding a static method
to a component, or adding a property to the route definition.
`redux-preheat` hopes to solve this with a decorator, a promise, and
your existing Redux actions.

## How?

There are two parts to this package: A promise that will call redux
actions and a decorator to bind those actions to a component.

### `getPreheatPromise(store, components = [], actionArg = null)`

```javascript
import { getPreheatPromise } from 'redux-preheat'

app.get('/*', function (req, res) {
  match({ routes, location: req.url }, function (error, redirectLocation, renderProps) {
    if (renderProps) {
      // We have to pass the store to `getPreheatPromise`.
      let store = configureStore({})

      // Get the list of components for the current route.
      let components = renderProps.components

      // On the client the action will be passed the component instance as an
      // argument, on the server we decide what to pass.
      // You will want this to be something the action can use to get request
      // params or some insight to the request.
      let actionArg = renderProps

      getPreheatPromise(store, components, actionArg).then(function () {
        const content = renderToString(
          <Provider store={store}>
            <RoutingContext {...renderProps} />
          </Provider>
        )

        res.status(200).send(renderMarkup(content, store.getState()))
      })
    }
  })
})
```

### `preheat(clientAction, serverAction = null)(Component)`

```javascript
import { preheat } from 'redux-preheat'
import * as actions from './actions'

// `actions.fetchData` will be called on either the client or server.
@preheat(actions.fetchData)
// `actions.fetchDataClient` will be called on the client.
// `actions.fetchDataServer` will be called on the server.
@preheat(actions.fetchDataClient, actions.fetchDataServer)
class MyComponent extends React.Component {
  render () {
    // ...
  }
}
```

## Example

See the app in `example/`.
