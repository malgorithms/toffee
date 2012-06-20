{view}          = require './view'
fs              = require 'fs'
path            = require 'path'
class engine

  constructor: (options) ->
    @viewCache      = {} # filename
    @lastCacheReset = Date.now()
    @maxCacheAge    = 1000 # TODO: move to option

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
    realpath      = fs.realpathSync filename
    pwd           = path.dirname realpath

    if Date.now() - @lastCacheReset > @maxCacheAge
      @_resetCache()
    if @viewCache[filename]?
      v = @viewCache[filename]
    else
      v = @_loadAndCache filename
    if v 
      view_options = {
        include_fn: (filename, lvars) => @_inlineInclude filename, lvars, pwd
        filename:   filename
        pwd:        pwd
      }
      res = v.run options, view_options
      return [null, res]
    else
      return ["Couldn't load #{filename}", null]

  _inlineInclude: (filename, local_vars, dir) =>
    options       = local_vars or {}
    options.__dir = dir
    [err, res] = @runSync filename, options
    if err
      return err
    else
      return res

  _loadAndCache: (filename) ->
    txt = fs.readFileSync filename, 'utf-8'
    if txt
      v = new view txt
      @viewCache[filename] = v
      v
    else
      console.log "Couldn't load #{filename}."
      null

  _resetCache: ->
    @viewCache = {}
    @lastCacheReset = Date.now()


exports.engine = engine