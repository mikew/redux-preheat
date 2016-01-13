require('isomorphic-fetch')

import React from 'react'
import { render } from 'react-dom'
import Router from 'react-router'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import configureStore from '../../server/configureStore'
import routes from '../../server/routes'

const store = configureStore(window.__INITIAL_STATE__)

render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('cosmos')
)
