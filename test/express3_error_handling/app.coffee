toffee  = require '../../index.js'

run = (port, express_engine, cb) ->
  express = require 'express'
  routes  = require './routes'
  http    = require 'http'
  
  app = express()
  
  
  app.configure ->
    
    app.set 'port', port
    app.set 'views', __dirname + '/views'
    app.engine 'toffee', express_engine
    app.use express.favicon()
    app.use express.logger 'dev'
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use app.router
    app.use express.static __dirname + '/public'
  
  app.configure 'development', ->
    app.use express.errorHandler()
  
  app.get '/', routes.index
  app.get '/:path([^ ]+)', routes.path

  http.createServer(app).listen app.get('port'), ->
    console.log "Express server listening on port #{app.get('port')}"
    if cb? then cb()

# -----------------------------------------------------------------------

run_all = (cb) ->

  # run a standard version on port 3034
  # -----------------------------------
  run 3034, toffee.__express, ->

    # run a version that doesn't catch errors on port 3035
    # ----------------------------------------------------
    e2 = new toffee.engine {
      prettyPrintErrors: false
    }
    run 3035, toffee.toExpress(e2), ->

      cb()

# -----------------------------------------------------------------------


if not module.parent
  run_all ->
    console.log "All running"

else
  exports.run = (cb) -> run_all cb