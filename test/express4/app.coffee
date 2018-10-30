
run = (cb) ->
  toffee  = require '../../index.js'
  express = require 'express'
  http    = require 'http'

  app = express()


  app_configure = ->

    toffee.expressEngine.verbose           = not module.parent
    toffee.expressEngine.prettyPrintErrors = false

    app.set 'port', process.env.PORT or 3033
    app.set 'views', __dirname + '/views'
    app.engine 'toffee', toffee.__express
    app.use express.static __dirname + '/public'
    app.route('/').get (req, res) =>
      circular_obj = [1,2,3]
      circular_obj.push circular_obj
      title = 'Express'
      a_bad_test_function = -> return JSON.stringify circular_obj
      vars = {title, a_bad_test_function}
      res.render 'index.toffee', vars

    http.createServer(app).listen app.get('port'), ->
      console.log "Express server listening on port #{app.get('port')}"
      if cb? then cb()

  app_configure()

if not module.parent
  run()

else
  exports.run = (cb) -> run cb
