# expose the render function
eclass                = require('./lib/engine').engine
exports.engine        = eclass

e                     = new eclass { verbose: false, prettyPrintErrors: true }
exports.expressEngine = e

# a pretty name for general usage
exports.render        = e.run

# express 3.x support
exports.__express     = (filename, options, cb) ->
  e.run filename, options, (err, res) ->
    if err
      cb new Error(err)
    else
      cb null, res

# express 2.x support
exports.compile       = require('./lib/view').expressCompile