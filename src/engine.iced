{view}          = require './view'
fs              = require 'fs'
path            = require 'path'
util            = require 'util'

class engine

  constructor: (options) ->
    options         = options or {}
    @maxCacheAge    = options.maxCacheAge or 2000
    @viewCache      = {} # filename
    @lastCacheReset = Date.now()

  run: (filename, options, cb) =>
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
    filename      = "#{options.__dir}/#{filename}" if filename.charAt(0) isnt "/"
    realpath      = filename
    pwd           = path.dirname realpath

    @_resetCache() if Date.now() - @lastCacheReset > @maxCacheAge
    v = @viewCache[filename] or @_loadAndCache filename, options
    if v 
      view_options = {
        parent: filename
        prebuilt_functions:
          include: (fname, lvars) => @_fn_include fname, lvars, realpath, options
          partial: (fname, lvars) => @_fn_partial fname, lvars, realpath, options
          print:   (txt)          => @_fn_print   txt, options
      }
      [err, res] = v.run options, view_options
      return [err, res]
    else
      return ["Couldn't load #{filename}", null]

  _inlineInclude: (filename, local_vars, parent_realpath, parent_options) =>
    local_keys       = {}
    local_keys[k]    = true for k of local_vars
    options          = local_vars or {}
    options.__dir    = path.dirname parent_realpath
    options.__parent = parent_realpath

    # we need to make a shallow copy of parent variables
    for k,v of parent_options when (k[0...2] isnt "__") and not local_keys[k]?
      options[k] = v

    [err, res] = @runSync filename, options

    # now sync any changes back up to the parent
    # TODO: make a decision if this is allowed. If not, 
    # how do we protect objects from being modified?

    # for k,v of options
    #   console.log "Considering copy of #{k} back to parent."
    #   if  k[0...2] isnt "__"
    #     console.log " Not reserved."
    #     if not local_keys[k]?
    #       console.log " and not local. COPIED."
    #       parent_options[k] = v
    #     else
    #       console.log " local. NOT COPIED."
    #   else
    #     console.log " reserved. NOT COPIED."

    if err
      return err
    else
      return res


  _fn_include: (fname, lvars, realpath, options) ->
    # include works differently depending on whether
    # the user calls it inside coffeescript (it prints output)
    # or calls it inside a #{} container (it returns output)
    res = @_inlineInclude fname, lvars, realpath, options
    if options.__cojo__.state is "COFFEE"
      @_fn_print res, options
    else
      res

  _fn_partial: (fname, lvars, realpath, options) ->
    @_inlineInclude fname, lvars, realpath, options

  _fn_print: (txt, options) ->
    options.__cojo__.res += txt

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