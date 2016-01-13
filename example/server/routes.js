import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from '../app/scripts/components/App'
import Index from '../app/scripts/components/Index'
import Todos from '../app/scripts/components/Todos'
import ClientServer from '../app/scripts/components/ClientServer'

export default <Route path='/' component={App}>
  <IndexRoute component={Index} />
  <Route path='/todos' component={Todos} />
  <Route path='/silly' component={ClientServer} />
</Route>
