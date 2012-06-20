{view}          = require './view'
fs              = require 'fs'
path            = require 'path'
class engine

  constructor: (options) ->
    @viewCache      = {} # filename
    @lastCacheReset = Date.now()
    @maxCacheAge    = 100 # TODO: move to option

  run: (filename, options, cb) ->
    ###
    "options" contains the pub vars
    may also contain special items:
      __dir: path to look relative to
    ###
    [err, res] = @runSync filename, options
    cb err, res

  runSync: (filename, options) ->
    ###
    returns [err, res];
    "options" the same as run() above
    ###
    options       = options or {}
    options.__dir = options.__dir or process.cwd()
    filename      = "#{options.__dir}/#{filename}"
    realpath      = filename
    pwd           = path.dirname realpath

    @_resetCache() if Date.now() - @lastCacheReset > @maxCacheAge
    v = @viewCache[filename] or @_loadAndCache filename, options
    if v 
      view_options = {
        include_fn: (fname, lvars) => @_inlineInclude fname, lvars, realpath
        parent:     filename
      }
      [err, res] = v.run options, view_options
      return [err, res]
    else
      return ["Couldn't load #{filename}", null]

  _inlineInclude: (filename, local_vars, parent_realpath) =>
    options          = local_vars or {}
    options.__dir    = path.dirname parent_realpath
    options.__parent = parent_realpath

    [err, res] = @runSync filename, options
    if err
      return err
    else
      return res

  _loadAndCache: (filename, options) ->
    try
      txt = fs.readFileSync filename, 'utf-8'
    catch e
      txt = "Error: Could not read #{filename}"
      if options.__parent? then txt += " requested in #{options.__parent}"
    v = new view txt
    @viewCache[filename] = v
    v

  _resetCache: ->
    @viewCache = {}
    @lastCacheReset = Date.now()


exports.engine = engine