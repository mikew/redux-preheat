var Parched = require('parched')
var nodemon = require('nodemon')
var browserSyncInstance = require('parched-tasks-webapp/lib/browserSyncInstance')

var didStartServer = false
function startFromParched (done) {
  if (Parched.isProduction()) {
    return done()
  }

  if (didStartServer) {
    return done()
  }

  nodemon('--ext "js json jade" --watch server/ ./server/index.js')
  nodemon.on('restart', function () {
    // Delay reloading the browser since the process might not be finished
    // starting
    setTimeout(function () {
      browserSyncInstance.reload()
    }, 2000)
  })
  didStartServer = true
  done()
}

Parched.setup({
  gulp: require('gulp'),

  parchedWillBuild: function (done) {
    startFromParched(done)
  },

  webapp: {
    browserSyncOptions: {
      proxy: {
        target: 'localhost:5000',
      },
    },
  },
})
