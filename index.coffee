# expose the render function
{engine}                                      = require('./lib/engine')
{view, getCommonHeaders, getCommonHeadersJs}  = require('./lib/view')

exports.engine              = engine
exports.view                = view
exports.getCommonHeaders    = getCommonHeaders
exports.getCommonHeadersJs  = getCommonHeadersJs

exports.expressEngine       = e  = new engine { verbose: false, prettyPrintErrors: true }
exports.render              = e.run
cacheless_engine            = new engine { verbose: false, prettyPrintErrors: true, cache: false}

# given a template string, returns a function that can be called
# on an object to render it.
# --------------------------------------------

exports.compileStr          = (template_str, options) ->
  v = new view template_str, options
  return (x) -> v.run x

# express 3.x support from a custom engine;
# this function takes a toffee engine
# and returns a function that matches the __express
# standard.
# --------------------------------------------

to_express = exports.toExpress = (eng) ->
  return (filename, options, cb) ->
    eng.run filename, options, (err, res) ->
      if err
        if typeof(err) is "string"
          err = new Error err
        cb err
      else
        cb null, res

# express 3.x support using the default engine
# --------------------------------------------

__express = exports.__express = to_express e

# consolidate.js support, which doesn't want caching on by default
# --------------------------------------------

exports.__consolidate_engine_render = (filename, options, cb) ->
  eng = if options.cache then e else cacheless_engine
  eng.run filename, options, (err, res) ->
    cb err, res

# consolidate.js wants this, but it might generally be useful
# --------------------------------------------

exports.str_render = exports.strRender = (template_str, options, cb) ->
  v = new view template_str, options
  [err, res] = v.run options
  cb err, res

# express 2.x support
# --------------------------------------------

exports.compile       = require('./lib/view').expressCompile

# better support for string compiling
# --------------------------------------------

exports.configurable_compile = (source, opts) ->
  opts                  = opts or {}
  opts.minimize         = if opts.minimize? then opts.minimize else false
  opts.headers          = if opts.headers? then opts.headers else true
  opts.filename         = opts.filename or null
  opts.to_coffee        = opts.to_coffee or false
  err                   = null

 # this compiles an individual template that you've read while recursing:
  v = new view source, {
    filename:     opts.filename
    bundlePath:   opts.filename
    browserMode:  true
    minimize:     opts.minimize
  }
  if opts.to_coffee
    output = v.toCoffee()
  else
    output = v.toJavaScript()
  if v.error then throw v.error.e
  if opts.headers
    header = getCommonHeadersJs true, true, true
    if opts.coffee then output = "`#{header}`\n\n#{output}"
    else output = "#{header}\n;\n#{output}"
  return output
