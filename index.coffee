# expose the render function
eclass                = require('./lib/engine').engine
exports.engine        = eclass

e                     = new eclass { verbose: false, prettyPrintErrors: true }
exports.expressEngine = e

# a pretty name for general usage
exports.render        = e.run

# express 3.x support
exports.__express     = e.run

# express 2.x support
exports.compile       = require('./lib/view').expressCompile