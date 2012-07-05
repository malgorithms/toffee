{view}          = require './view'
{states}        = require './consts'

fs              = require 'fs'
path            = require 'path'
util            = require 'util'

class engine

  constructor: (options) ->
    options             = options or {}
    @maxCacheAge        = options.maxCacheAge or 2000
    @prettyPrintErrors  = if options.prettyPrintErrors then options.prettyPrintErrors else true
    @viewCache          = {} # filename
    @lastCacheReset     = Date.now()

  run: (filename, options, cb) =>
    ###
    "options" contains the pub vars
    may also contain special items:
      __dir: path to look relative to
      layout: path to a template expecting a body var (express 2.x style, but for use with express 3.x)
    ###

    [err, res] = @runSync filename, options

    # if we got an error but want to pretty-print by faking ok result
    if err and @prettyPrintErrors      
      [err, res] = [null, err]

    # if we're using a layout, pub into that
    if (not err) and options?.layout
      options.body = res
      [err, res] = @runSync options.layout, options
      if err and @prettyPrintErrors
        [err, res] = [null, err]

    cb err, res


  runSync: (filename, options) ->
    ###
    returns [err, res];
    "options" the same as run() above
    ###
    options       = options or {}
    options.__dir = options.__dir or process.cwd()
    filename      = "#{options.__dir}/#{filename}" if filename[0] isnt "/"
    realpath      = filename
    pwd           = path.dirname realpath

    @_resetCache() if Date.now() - @lastCacheReset > @maxCacheAge
    v = @viewCache[realpath] or @_loadAndCache realpath, options
    if v 
      options.__parent = realpath
      options.include = options.include or (fname, lvars) => @_fn_include fname, lvars, realpath, options
      options.partial = options.partial or (fname, lvars) => @_fn_partial fname, lvars, realpath, options
      options.snippet = options.snippet or (fname, lvars) => @_fn_snippet fname, lvars, realpath, options
      options.print   = options.print   or (txt)          => @_fn_print   txt, options
      [err, res] = v.run options
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
    if not options.__no_inheritance
      for k,v of parent_options when not local_keys[k]?
        if k[0...2] isnt "__"
          if not (k in ["print", "partial", "include", "snippet"])
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
    if options.__toffee.state is states.COFFEE
      @_fn_print res, options
    else
      res

  _fn_snippet: (fname, lvars, realpath, options) =>
    lvars = if lvars? then lvars else {}
    lvars.__no_inheritance = true
    @_inlineInclude fname, lvars, realpath, options

  _fn_partial: (fname, lvars, realpath, options) =>
    @_inlineInclude fname, lvars, realpath, options

  _fn_print: (txt, options) ->
    options.__toffee.out.push txt

  _loadAndCache: (filename, options) ->
    try
      txt = fs.readFileSync filename, 'utf-8'
    catch e
      txt = "Error: Could not read #{filename}"
      if options.__parent? then txt += " requested in #{options.__parent}"
    v = new view txt, {fileName: filename}
    @viewCache[filename] = v
    v

  _resetCache: ->
    @viewCache = {}
    @lastCacheReset = Date.now()


exports.engine = engine