{view}                = require './view'
{states, tweakables}  = require './consts'
{Pool}                = require './pool'
utils                 = require './utils'
fs                    = require 'fs'
path                  = require 'path'
util                  = require 'util'
vm                    = require 'vm'

MAX_CACHED_SANDBOXES = 100

sandboxCons = () ->
  vm.createContext({})

class engine

  constructor: (options) ->
    options                 = options or {}
    @verbose                = options.verbose or false
    @minimize               = options.minimize or false
    @pool                   = new Pool(sandboxCons, options.poolSize or MAX_CACHED_SANDBOXES)
    @prettyPrintErrors      = if options.prettyPrintErrors? then options.prettyPrintErrors else true
    @prettyLogErrors        = if options.prettyLogErrors?   then options.prettyLogErrors   else true
    @autoEscape             = if options.autoEscape?        then options.autoEscape        else true
    @cache                  = if options.cache?             then options.cache             else true
    @additionalErrorHandler = options.additionalErrorHandler or null

    @viewCache              = {} # filename -> view
    @fsErrorCache           = {} # filename -> timestamp last failed

    @filenameCache = {} # caches dir -> filename -> path.normalize path.resolve dir, filename

  _log: (o) ->
    if @verbose
      if (typeof o) in ["string","number","boolean"]
        console.log "toffee: #{o}"
      else
        console.log "toffee: #{util.inspect o}"

  # basically returns `path.normalize path.resolve dir, filename`, but caches it to speed up multiple inclusions
  normalizeFilename: (dir, filename) ->
    cache = @filenameCache[dir]
    if not cache?
      @filenameCache[dir] = {}
      cache = {}
    normalized = cache[filename]
    if not normalized?
      normalized = path.normalize path.resolve dir, filename
      @filenameCache[dir][filename] = normalized
    return normalized


  render: (filename, options, cb) => @run filename, options, cb

  run: (filename, options, cb) =>
    ###
    "options" contains the pub vars and may contain special items:
        layout:                  path to a template expecting a body var (express 2.x style, but for use with express 3.x)
        postProcess:             a function which takes the string of output and post processes it (returning new string)
        __toffee.dir:            path to look relative to
        __toffee.parent:         parent file
        __toffee.noInheritance:  if true, don't pass variables through unless explicitly passed
        __toffee.repress         if true, don't output anything; useful with including definition files with passback of vars
        __toffee.autoEscape:     if set as false, don't escape output of #{} vars by default
    ###

    if not options.prettyPrintErrors?       then options.prettyPrintErrors        = @prettyPrintErrors
    if not options.prettyLogErrors?         then options.prettyLogErrors          = @prettyLogErrors
    if not options.additionalErrorHandler?  then options.additionalErrorHandler   = @additionalErrorHandler
    if not options.autoEscape?              then options.autoEscape               = @autoEscape

   # we only want to pass post_process into the layout
    post_process = options.postProcess
    options.postProcess = null

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

    # post processing
    if (not err) and (typeof(post_process) is "function")
      [err, res] = @postProcess post_process, res

    cb err, res

  postProcess: (fn, res) ->
    err = null
    try 
      res = fn res
    catch e
      err = e
    return [err, res]

  runSync: (filename, options) ->
    ###
    "options" the same as run() above
    ###

    start_time = Date.now()

    options              = options or {}
    options.__toffee     = options.__toffee or {}
    options.__toffee.dir = options.__toffee.dir or process.cwd()
    realpath = @normalizeFilename options.__toffee.dir, filename

    if @cache
      v = (@_viewCacheGet realpath) or (@_loadCacheAndMonitor realpath, options)
    else
      v = @_loadWithoutCache realpath, options

    if v
      if @fsErrorCache[realpath]
        [err, res] = [new Error("Couldn't load #{realpath}"), null]
      else
        options.__toffee.parent = realpath
        options.partial = options.partial or (fname, lvars) => @_fn_partial fname, lvars, realpath, options
        options.snippet = options.snippet or (fname, lvars) => @_fn_snippet fname, lvars, realpath, options
        options.load    = options.load    or (fname, lvars) => @_fn_load    fname, lvars, realpath, options
        options.print   = options.print   or (txt)          => @_fn_print   txt, options
        if not options.console? then options.console = log: console.log
        ctx = @pool.get()
        [err, res] = v.run options, ctx
        @pool.release(ctx)
    else
      [err, res] = [new Error("Couldn't load #{realpath}"), null]

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
    options.passback        = {}
    options.__toffee        = options.__toffee or {}
    options.__toffee.dir    = path.dirname parent_realpath
    options.__toffee.parent = parent_realpath
    noInheritance           = options.__toffee.noInheritance
    repress                 = options.__toffee.repress

    # we need to make a shallow copy of parent variables
    reserved = {}
    reserved[k] = true for k in ["passback", "load", "print", "partial", "snippet", "layout", "__toffee", "postProcess"]
    if not noInheritance
      for k,v of parent_options when not local_vars?[k]?
        if not reserved[k]?
          options[k] = v

    [err, res] = @runSync filename, options

    for k,v of options.passback
      parent_options[k] = v

    return err or res

  _fn_load: (fname, lvars, realpath, options) =>
    lvars = if lvars? then lvars else {}
    lvars.__toffee = lvars.__toffee or {}
    lvars.__toffee.repress  = true
    @_inlineInclude fname, lvars, realpath, options

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

  _loadWithoutCache: (filename, options) ->
    try
      txt = fs.readFileSync filename, 'utf8'
    catch e
      txt = "Error: Could not read #{filename}"
      if options.__toffee?.parent? then txt += " first requested in #{options.__toffee.parent}"

    view_options = @_generateViewOptions filename
    v = new view txt, view_options
    return v

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
          ctx = @pool.get()
          view_options.ctx = ctx
          view_options.cb = (v) =>
            @_log "#{filename} updated and ready"
            @viewCache[filename] = v
            @pool.release(ctx)
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