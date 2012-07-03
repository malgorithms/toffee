# expose the render function
eclass                = require('./lib/engine').engine
e                     = new eclass { maxCacheAge: Infinity }
exports.expressEngine = e 
exports.render        = e.run

# express 3.x support
exports.__express = e.run

# express 2.x support
exports.compile   = require('./lib/view').expressCompile