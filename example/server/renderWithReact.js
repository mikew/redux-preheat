import React from 'react'
import { getPreheatPromise } from '../../src'
import { renderToString } from 'react-dom/server'
import { Router, match, RoutingContext } from 'react-router'
import { Provider } from 'react-redux'

import configureStore from './configureStore'
import routes from './routes'
import handleError from './handleError'

export default function renderWithReact (req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      handleError(res)(error)

    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)

    } else if (renderProps) {
      let store = configureStore({})
      let components = renderProps.components
      let actionArg = renderProps

      getPreheatPromise(store, components, actionArg).then(function () {
        const content = renderToString(
          <Provider store={store}>
            <RoutingContext {...renderProps} />
          </Provider>
        )

        res.status(200).send(renderMarkup(content, store.getState()))
      }).catch(handleError(res))

    } else {
      res.status(404).send('Not found')
    }
  })
}

function renderMarkup (content, state) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello World</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />
  </head>
  <body>
    <div id="cosmos">${content}</div>
    <script>var __INITIAL_STATE__ = ${JSON.stringify(state)}</script>
    <script src="app.js"></script>
  </body>
</html>
  `
}
