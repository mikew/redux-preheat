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

### `preheat(clientAction, serverAction = null)(Component)`

The decorator for your components. If no `serverAction` is given then
`clientAction` will run on both sides.

> **Note:** You will want to group `@preheat` decorators and place them
> as close to the component as possible (aka after any `@connect` or
> other decorators).

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

### `getPreheatPromise(store, components = [], actionArg = null)`

The promise used on the server. This example uses `react-router`.

```javascript
import { getPreheatPromise } from 'redux-preheat'

app.get('/*', function (req, res) {
  match({ routes, location: req.url }, function (error, redirectLocation, renderProps) {
    if (renderProps) {
      // We have to pass the store to `getPreheatPromise`.
      let store = createStore({})

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

## Example

See the app in `example/`.
