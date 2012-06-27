# express 3.x support
eclass         = require('./lib/engine').engine
e              = new eclass { maxCacheAge: 2000 }
exports.engine = e.run

# express 2.x support
exports.compile   = require('./lib/view').expressCompile
