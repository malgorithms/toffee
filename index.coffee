# expose the render function
{engine}              = require('./lib/engine')
{view}                = require('./lib/view')

exports.engine        = engine

e                     = new engine { verbose: false, prettyPrintErrors: true }
exports.expressEngine = e

# a pretty name for general usage
exports.render        = e.run

# express 3.x support;
__express = exports.__express     = (filename, options, cb) ->
  e.run filename, options, (err, res) ->
    if err
      cb new Error(err)
    else
      cb null, res

# consolidate.js support, which doesn't want caching on by default
exports.__consolidate_engine_render = (filename, options, cb) ->
  if (options.cache?) and options.cache
    eng = e
  else
    eng = new engine { verbose: false, prettyPrintErrors: true }
  eng.run filename, options, (err, res) ->
    if err
      cb new Error(err)
    else
      cb null, res

# consolidate.js wants this, but it might generally be useful
exports.str_render = (template_str, options, cb) ->
  v = new view template_str, options
  [err, res] = v.run options
  cb err, res

# express 2.x support
exports.compile       = require('./lib/view').expressCompile