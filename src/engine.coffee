{view}          = require './view'
{states}        = require './consts'
utils           = require './utils'
fs              = require 'fs'
path            = require 'path'
util            = require 'util'

class engine

  constructor: (options) ->
    options             = options or {}
    @verbose            = options.verbose or false
    @prettyPrintErrors  = options.prettyPrintErrors or false
    @viewCache          = {} # filename

  _log: (o) ->
    if @verbose
      if (typeof o) in ["string","number","boolean"]
        console.log "toffee: #{o}"
      else
        console.log "toffee: #{util.inspect o}"

  run: (filename, options, cb) =>
    ###
    "options" contains the pub vars and may contain special items:
        layout:                  path to a template expecting a body var (express 2.x style, but for use with express 3.x)
        __toffee.dir:            path to look relative to
        __toffee.parent:         parent file
        __toffee.noInheritance:  if true, don't pass variables through unless explicitly passed
        __toffee.autoEscape:     if set as false, don't escape output of #{} vars by default
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
    "options" the same as run() above
    ###

    start_time = Date.now()

    options              = options or {}
    options.__toffee     = options.__toffee or {}
    options.__toffee.dir = options.__toffee.dir or process.cwd()
    filename             = if filename[0] isnt "/" then "#{options.__toffee.dir}/#{filename}" else filename
    realpath             = path.normalize filename
    pwd                  = path.dirname realpath

    v = @viewCache[realpath] or @_loadCacheAndMonitor realpath, options
    if v
      options.__toffee.parent = realpath
      options.partial = options.partial or (fname, lvars) => @_fn_partial fname, lvars, realpath, options
      options.snippet = options.snippet or (fname, lvars) => @_fn_snippet fname, lvars, realpath, options
      options.print   = options.print   or (txt)          => @_fn_print   txt, options
      if not options.console? then options.console = log: console.log
      [err, res] = v.run options
    else
      [err, res] = ["Couldn't load #{realpath}", null]

    @_log "#{realpath} run in #{Date.now() - start_time}ms"
    return [err, res]

  _inlineInclude: (filename, local_vars, parent_realpath, parent_options) =>
    options                 = local_vars or {}
    options.__toffee        = options.__toffee or {}
    options.__toffee.dir    = path.dirname parent_realpath
    options.__toffee.parent = parent_realpath

    # we need to make a shallow copy of parent variables
    if not options.__toffee.noInheritance
      for k,v of parent_options when not local_vars?[k]?
        if not (k in ["print", "partial", "snippet", "layout", "__toffee"])
          options[k] = v

    [err, res] = @runSync filename, options
    return err or res

  _fn_snippet: (fname, lvars, realpath, options) =>
    lvars = if lvars? then lvars else {}
    lvars.__toffee = lvars.__toffee or {}
    lvars.__toffee.noInheritance = true
    @_inlineInclude fname, lvars, realpath, options

  _fn_partial: (fname, lvars, realpath, options) =>
    @_inlineInclude fname, lvars, realpath, options

  _fn_print: (txt, options) ->
    if options.__toffee.state is states.COFFEE
      options.__toffee.out.push txt
      return ''
    else
      return txt

  _loadCacheAndMonitor: (filename, options) ->
    try
      txt = fs.readFileSync filename, 'utf8'
    catch e
      txt = "Error: Could not read #{filename}"
      if options.__toffee?.parent? then txt += " requested in #{options.__toffee.parent}"
    view_options = 
      fileName:          filename
      verbose:           @verbose
      prettyPrintErrors: @prettyPrintErrors
    v = new view txt, view_options    
    @viewCache[filename] = v
    @_monitorForChanges filename, options
    v

  _monitorForChanges: (filename, options) ->
    ###
    we must continuously unwatch/rewatch because some editors/systems invoke a "rename"
    event and we'll end up following the wrong, old 'file' as a new one
    is dropped in its place.
    ###
    fsw = null
    fsw = fs.watch filename, {persistent: true}, (change) =>
      fsw.close()
      @_log "Got an fs.watch hit on #{filename}"
      fs.readFile filename, 'utf8', (err, txt) =>
        @_monitorForChanges filename, options
        if txt isnt @viewCache[filename].txt
          if err
            txt = "Error: Could not read #{filename} after fs.watch() hit."
            if options.__toffee?.parent? then txt += " requested in #{options.__toffee.parent}"
          view_options = 
            fileName:          filename
            verbose:           @verbose
            prettyPrintErrors: @prettyPrintErrors
            cb: (v) =>
              @_log "#{filename} updated and ready"
              @viewCache[filename] = v
          v = new view txt, view_options

exports.engine = engine