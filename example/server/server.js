require('isomorphic-fetch')

import express from 'express'
import http from 'http'
import renderWithReact from './renderWithReact'

const app = express()
app.use(express.static('public'))
app.get('/*', renderWithReact)

const httpServer = http.createServer(app)
const port = 5000
httpServer.listen(port, function () {
  console.log('App listening at http://localhost:%s', port)
})
