{view}                = require './view'
{states, tweakables}  = require './consts'
utils                 = require './utils'
fs                    = require 'fs'
path                  = require 'path'
util                  = require 'util'

class engine

  constructor: (options) ->
    options             = options or {}
    @verbose            = options.verbose or false
    @minimize           = options.minimize or false

    @prettyPrintErrors      = if options.prettyPrintErrors? then options.prettyPrintErrors else true
    @prettyLogErrors        = if options.prettyLogErrors?   then options.prettyLogErrors   else true
    @autoEscape             = if options.autoEscape?        then options.autoEscape        else true
    @additionalErrorHandler = options.additionalErrorHandler or null

    @viewCache          = {} # filename -> view
    @fsErrorCache       = {} # filename -> timestamp last failed

  _log: (o) -> 
    if @verbose
      if (typeof o) in ["string","number","boolean"]
        console.log "toffee: #{o}"
      else
        console.log "toffee: #{util.inspect o}"

  render: (filename, options, cb) => @run filename, options, cb 

  run: (filename, options, cb) =>
    ###
    "options" contains the pub vars and may contain special items:
        layout:                  path to a template expecting a body var (express 2.x style, but for use with express 3.x)
        __toffee.dir:            path to look relative to
        __toffee.parent:         parent file
        __toffee.noInheritance:  if true, don't pass variables through unless explicitly passed
        __toffee.autoEscape:     if set as false, don't escape output of #{} vars by default
    ###

    if not options.prettyPrintErrors?       then options.prettyPrintErrors        = @prettyPrintErrors
    if not options.prettyLogErrors?         then options.prettyLogErrors          = @prettyLogErrors
    if not options.additionalErrorHandler?  then options.additionalErrorHandler   = @additionalErrorHandler
    if not options.autoEscape?              then options.autoEscape               = @autoEscape

    if options?.layout
      layout_options    = {}
      layout_options[k] = v for k,v of options when k isnt "layout"

    [err, res] = @runSync filename, options

    # if we got an error but want to pretty-print by faking ok result
    if err and @prettyPrintErrors
      [err, res] = [null, err]

    # if we're using a layout, pub into that
    if (not err) and layout_options?
      layout_options.body = res
      [err, res] = @runSync options.layout, layout_options
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

    v = (@_viewCacheGet realpath) or (@_loadCacheAndMonitor realpath, options)

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

  _viewCacheGet: (filename) ->
    if not @viewCache[filename]?
      return null
    else if not @fsErrorCache[filename]?
      return @viewCache[filename]
    else if (Date.now() - @fsErrorCache[filename]) < tweakables.MISSING_FILE_RECHECK
      return @viewCache[filename]
    else
      return null

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
    previous_fs_err = @fsErrorCache[filename]?
    try
      txt = fs.readFileSync filename, 'utf8'
      if @fsErrorCache[filename]? then delete @fsErrorCache[filename]
    catch e
      txt = "Error: Could not read #{filename}"
      if options.__toffee?.parent? then txt += " first requested in #{options.__toffee.parent}"
      @fsErrorCache[filename] = Date.now()
    
    # if we hit an fs error and it already happened, just return that
    if (@fsErrorCache[filename] and previous_fs_err and @viewCache[filename])
      return @viewCache[filename]
    else
      view_options = @_generateViewOptions filename
      v = new view txt, view_options
      @viewCache[filename] = v
      @_monitorForChanges filename, options
      return v

  _reloadFileInBkg: (filename, options) ->
    fs.readFile filename, 'utf8', (err, txt) =>
      if err or (txt isnt @viewCache[filename].txt)
        if err
          @fsErrorCache[filename] = Date.now()
          txt = "Error: Could not read #{filename}"
          if options.__toffee?.parent? then txt += " requested in #{options.__toffee.parent}"
        if not (err and @viewCache[filename].fsError) # i.e., don't just create a new error view
          view_options = @_generateViewOptions filename
          view_options.cb = (v) =>
            @_log "#{filename} updated and ready"
            @viewCache[filename] = v
          if err
            view_options.fsError = true
          v = new view txt, view_options

  _generateViewOptions: (filename) ->
    return {
      fileName:               filename
      verbose:                @verbose
      prettyPrintErrors:      @prettyPrintErrors
      prettyLogErrors:        @prettyLogErrors
      autoEscape:             @autoEscape
      additionalErrorHandler: @additionalErrorHandler
      minimize:               @minimize
    }

  _monitorForChanges: (filename, options) ->
    ###
    we must continuously unwatch/rewatch because some editors/systems invoke a "rename"
    event and we'll end up following the wrong, old 'file' as a new one
    is dropped in its place.

    Files that are missing are ignored here because they get picked up by new calls to _loadCacheAndMonitor
    ###
    if not @fsErrorCache[filename]? # if there's an fsError, this will get rechecked on-demand occasionally
      fsw = null
      try
        @_log "#{filename} starting fs.watch()"
        fsw = fs.watch filename, {persistent: true}, (change) =>
          @_log "#{filename} closing fs.watch()"
          fsw.close()
          @_monitorForChanges filename, options
          @_reloadFileInBkg filename, options
      catch e
        @_log "fs.watch() failed for #{filename}; settings fsErrorCache = true"
        @fsErrorCache[filename] = Date.now()

exports.engine = engine