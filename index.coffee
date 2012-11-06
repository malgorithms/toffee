# expose the render function
{engine}              = require('./lib/engine')
{view}                = require('./lib/view')

exports.engine        = engine

e                     = new engine { verbose: false, prettyPrintErrors: true }
exports.expressEngine = e

# a pretty name for general usage
exports.render        = e.run

# express 3.x support; by default, caching is on
__express = exports.__express     = (filename, options, cb) ->
  cache = if options.cache? then options.cache else true
  eng = if options.cache then e else new engine { prettyPrintErrors: true }
  eng.run filename, options, (err, res) ->
    if err
      cb new Error(err)
    else
      cb null, res

# consolidate.js support, which doesn't want caching on by default
exports.__consolidate_engine_render = (filename, options, cb) ->
  if not options.cache? then options.cache = false
  __express filename, options, cb

# consolidate.js wants this, but it might generally be useful
exports.str_render = (template_str, options, cb) ->
  v = new view template_str, options
  [err, res] = v.run options
  cb err, res

# express 2.x support
exports.compile       = require('./lib/view').expressCompile