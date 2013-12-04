
run = (cb) ->
  toffee  = require '../../index.js'
  express = require 'express'
  routes  = require './routes'
  http    = require 'http'
  
  app = express()
  
  
  app.configure ->
  
    toffee.expressEngine.verbose           = not module.parent
    toffee.expressEngine.prettyPrintErrors = false
  
    app.set 'port', process.env.PORT or 3033
    app.set 'views', __dirname + '/views'
    app.engine 'toffee', toffee.__express
    app.use express.favicon()
    app.use express.logger 'dev'
    app.use express.bodyParser()
    app.use express.methodOverride()
    app.use app.router
    app.use express.static __dirname + '/public'
  
  app.configure 'development', ->
    app.use express.errorHandler()
  
  app.get '/', routes.index
  
  http.createServer(app).listen app.get('port'), ->
    console.log "Express server listening on port #{app.get('port')}"
    if cb? then cb()


if not module.parent
  run()

else
  exports.run = (cb) -> run cb