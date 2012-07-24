# expose the render function
eclass                = require('./lib/engine').engine
e                     = new eclass { maxCacheAge: 2000 }
exports.expressEngine = e
exports.render        = e.run

# express 3.x support
exports.__express = e.run

# express 2.x support
exports.compile   = require('./lib/view').expressCompile