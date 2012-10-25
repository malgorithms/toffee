{parser}                                = require './toffee_lang'
{errorHandler,toffeeError,errorTypes}   = require './errorHandler'
{states, TAB_SPACES}                    = require './consts'
utils                                   = require './utils'
vm                                      = require 'vm'
try 
  coffee                                = require "iced-coffee-script"
catch e
  coffee                                = require "coffee-script"


minimizeJs = (js) ->
  # uglify doesn't seem to be working right; #TODO: This
  try
    jsp     = require("uglify-js").parser
    pro     = require("uglify-js").uglify
    ast     = jsp.parse js, true # parse code and get the initial AST
    ast     = pro.ast_mangle ast              # get a new AST with mangled names
    ast     = pro.ast_squeeze ast             # get an AST with compression optimizations
    js = pro.gen_code ast
  catch e
    console.log js
    console.log e
    process.exit 1
  js

getCommonHeaders = (include_bundle_headers, auto_escape) ->
  ###
  each view will use this, or if they're bundled together,
  it'll only be used once.

  include_bundle_headers: includes some functions needed for browser use
  ###
  """
if not toffee?            then toffee = {}
if not toffee.templates   then toffee.templates = {}

toffee.states = #{JSON.stringify states}

toffee.__json = (locals, o) ->
  if not o? then return "null"
  else return "" + JSON.stringify(o).replace(/</g,'\\\\u003C').replace(/>/g,'\\\\u003E').replace(/&/g,'\\\\u0026')

toffee.__raw = (locals, o) -> o

toffee.__html = (locals, o) ->
  (""+o).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

toffee.__escape = (locals, o) ->
  if locals.__toffee.autoEscape? then ae = locals.__toffee.autoEscape
  else if #{auto_escape?}        then ae = #{auto_escape}
  else                                ae = true
  if ae
    if o is undefined then return ''
    if o? and (typeof o) is "object" then return locals.json o
    return locals.html o
  return o

toffee.__augmentLocals = (locals, bundle_path) ->
  _l = locals
  _t = _l.__toffee = {out: []}
  if not _l.print?   then _l.print    = (o) -> toffee.__print   _l, o
  if not _l.json?    then _l.json     = (o) -> toffee.__json    _l, o
  if not _l.raw?     then _l.raw      = (o) -> toffee.__raw     _l, o
  if not _l.html?    then _l.html     = (o) -> toffee.__html    _l, o
  if not _l.escape?  then _l.escape   = (o) -> toffee.__escape  _l, o
  if not _l.partial? then _l.partial  = (path, vars) -> toffee.__partial toffee.templates["\#{bundle_path}"], _l, path, vars
  if not _l.snippet? then _l.snippet  = (path, vars) -> toffee.__snippet toffee.templates["\#{bundle_path}"], _l, path, vars
  _t.print   = _l.print
  _t.json    = _l.json
  _t.raw     = _l.raw
  _t.html    = _l.html
  _t.escape  = _l.escape
  _t.partial = _l.partial
  _t.snippet = _l.snippet

#{if include_bundle_headers then getBundleHeaders() else ""}
"""

getBundleHeaders = ->
  ###
  header stuff 
  only needed when compiling to a JS file
  ###
  """

toffee.__print = (locals, o) ->
  if locals.__toffee.state is toffee.states.COFFEE
    locals.__toffee.out.push o
    return ''
  else
    return "\#{o}"

toffee.__normalize = (path) ->
  if (not path?) or path is "/"
    return path
  else 
    parts = path.split "/"
    np = []
    # make sure path always starts with '/'
    if parts[0]
      np.push ''
    for part in parts
      if part is ".."
        if np.length > 1
          np.pop()
        else
          np.push part
      else
        if part isnt "."
          np.push part
    path = np.join "/"
    if not path then path = "/"
    return path

toffee.__partial = (parent_tmpl, parent_locals, path, vars) ->
  path = toffee.__normalize parent_tmpl.bundlePath + "/../" + path
  return toffee.__inlineInclude path, vars, parent_locals

toffee.__snippet = (parent_tmpl, parent_locals, path, vars) ->
  path = toffee.__normalize parent_tmpl.bundlePath + "/../" + path
  vars = if vars? then vars else {}
  vars.__toffee = vars.__toffee or {}
  vars.__toffee.noInheritance = true
  return toffee.__inlineInclude path, vars, parent_locals

toffee.__inlineInclude = (path, locals, parent_locals) ->
  options                 = locals or {}
  options.__toffee        = options.__toffee or {}

  # we need to make a shallow copy of parent variables
  if not options.__toffee.noInheritance
    for k,v of parent_locals when not locals?[k]?
      if not (k in ["print", "partial", "snippet", "layout", "__toffee"])
        options[k] = v

  if not toffee.templates[path]
    return "Inline toffee include: Could not find \#{path}"
  else
    return toffee.templates[path].pub options

"""

getCommonHeadersJs = (include_bundle_headers, auto_escape, minimize)->
  ch = getCommonHeaders include_bundle_headers, auto_escape
  js = coffee.compile ch, {bare: true}
  if minimize then js = minimizeJs js
  js

class view

  constructor: (txt, options) ->
    ###
    important options:
      cb: if this is set, compilation will happen async and cb will be executed when it's ready
    ###
    options = options or {}
    @fileName               = options.fileName    or options.filename or null
    @bundlePath             = options.bundlePath  or "/" # if to be included inside a bundle, this is the path inside it.
    @browserMode            = options.browserMode or false
    @minimize               = options.minimize    or false # excludes line numbers from coffee ; uses uglify.JS
    @verbose                = options.verbose     or false
    @fsError                = options.fsError     or false # pass true if you could not load the view template and passed in error text
    @prettyPrintErrors      = if options.prettyPrintErrors? then options.prettyPrintErrors else true
    @prettyLogErrors        = if options.prettyLogErrors?   then options.prettyLogErrors   else false
    @autoEscape             = if options.autoEscape?        then options.autoEscape        else false
    @additionalErrorHandler = options.additionalErrorHandler or null
    @txt                    = txt
    @tokenObj               = null # constructed as needed
    @coffeeScript           = null # constructed as needed
    @javaScript             = null # constructed as needed
    @scriptObj              = null # constructed as needed 
    @error                  = null # if err, instance of toffeeError class
    if options.cb
      @_prepAsync txt, =>
        options.cb @

  _prepAsync: (txt, cb) ->
    ###
    Only once it's fully compiled does it callback.
    Defers via setTimeouts in each stage in the compile process
    for CPU friendliness. This is a lot prettier with iced-coffee-script.
    ###
    @_log "Prepping #{if @fileName? then @fileName else 'unknown'} async."
    @_toTokenObj()
    v = @
    setTimeout ->
      v._toCoffee()
      setTimeout ->
        v._toJavaScript()
        setTimeout ->
          v._toScriptObj()
          v._log "Done async prep of #{if v.fileName? then v.fileName else 'unknown'}. Calling back."
          cb()
        , 0
      , 0
    , 0

  _log: (o) ->
    if @verbose
      if (typeof o) in ["string","number","boolean"]
        console.log "toffee: #{o}"
      else
        console.log "toffee: #{util.inspect o}"

  _cleanTabs: (obj) ->
    ###
    replaces tabs with spaces in their coffee regions
    ###
    if obj[0] in ["TOFFEE_ZONE", "COFFEE_ZONE"]
      @_cleanTabs item for item in obj[1]
    else if obj[0] is "COFFEE"
      obj[1] = obj[1].replace /\t/g, @_tabAsSpaces()

  run: (options) ->
    ###
    returns [err, str]
    ###
    script = @_toScriptObj()
    res    = null
    if not @error
      try
        sandbox = { __toffee_run_input: options }
        script.runInNewContext sandbox
        res = sandbox.__toffee_run_input.__toffee.res
        delete sandbox.__toffee_run_input.__toffee
      catch e
        @error = new toffeeError @, errorTypes.RUNTIME, e

    if @error
      if @prettyLogErrors
        txt = @error.getPrettyPrintText()
        for line in txt.split "\n"
          console.log "toffee err: #{line}"
      if @additionalErrorHandler
        @additionalErrorHandler @error.getPrettyPrintText(), @error.getPrettyPrint(), @fileName

      if @prettyPrintErrors
        pair = [null, @error.getPrettyPrint()]
      else
        pair = [@error.getPrettyPrintText(), null]
      if @error.errType is errorTypes.RUNTIME
        # don't hold onto runtime errors after value returned.
        @error = null
    else
      pair = [null, res]
    return pair

  _toTokenObj: ->
    ###
    compiles Toffee to token array
    ###
    if not @tokenObj?
      try
        @tokenObj      = parser.parse @txt
      catch e
        @error = new toffeeError @, errorTypes.PARSER, e
      if not @error?
        @_cleanTabs @tokenObj

    @tokenObj

  _toScriptObj: ->
    if not @scriptObj?
      txt = @_toJavaScript()
      if not @error
        d = Date.now()
        @scriptObj = vm.createScript txt
        @_log "#{@fileName} compiled to scriptObj in #{Date.now()-d}ms"
    @scriptObj

  _toJavaScript: ->
    if not @javaScript?
      c = @_toCoffee()
      if not @error
        d = Date.now()
        try
          @javaScript = coffee.compile c, {bare: false}
        catch e
          @error = new toffeeError @, errorTypes.COFFEE_COMPILE, e
        if @minimize and not @error
          d2 = Date.now()
          @javaScript = minimizeJs @javaScript
        @_log "#{@fileName} compiled to JavaScript in #{Date.now()-d}ms"
    @javaScript

  _toCoffee: ->
    if not @coffeeScript?
      tobj = @_toTokenObj()
      if not @error
        d = Date.now()
        res =  @_coffeeHeaders()
        try
          res += @_toCoffeeRecurse(tobj, TAB_SPACES, 0, {})[0]
          res += @_coffeeFooters()
          @coffeeScript = res
        catch e 
          @error # already assigned inside _toCoffeeRecurse
        @_log "#{@fileName} compiled to CoffeeScript in #{Date.now()-d}ms"
    @coffeeScript

  _printLineNo: (n, ind) ->
    if @minimize or (@lastLineNo? and (n is @lastLineNo))
      return ""
    else
      @lastLineNo = n
      return "\n#{@_space ind}_ln #{n}"

  _snippetHasEscapeOverride: (str) ->
    for token in ['print',' snippet', 'partial', 'raw', 'html', 'json', '__toffee.raw', '__toffee.html', '__toffee.json', 'JSON.stringify']
      if str[0...token.length] is token
        if (str.length > token.length) and (str[token.length] in [' ','\t','\n','('])
          return true
    false

  _snippetIsSoloToken: (str) ->
    ###
    if the inside is something like #{ foo } not #{ foo.bar } or other complex thing.
    ###
    if str.match ///
      ^
      [$A-Za-z_\x7f-\uffff]
      [$\w\x7f-\uffff]*
      $
    ///
      return true
    return false


  _toCoffeeRecurse: (obj, indent_level, indent_baseline, state_carry) ->
    # returns [res, indent_baseline_delta]
    # indent_level    = # of spaces to add to each coffeescript section
    # indent_baseline = # of chars to strip from each line inside {# #} 

    res = ""
    i_delta = 0
    switch obj[0]
      when "TOFFEE_ZONE"
        if state_carry.last_coffee_ends_with_newline is false
          indent_level += TAB_SPACES
        res += "\n#{@_space indent_level}_ts #{states.TOFFEE}"
        for item in obj[1]
          [s, delta] = @_toCoffeeRecurse item, indent_level, indent_baseline, state_carry
          res += s
      when "COFFEE_ZONE"
        res += "\n#{@_space indent_level}_ts #{states.COFFEE}"
        zone_baseline   = @_getZoneBaseline obj[1]
        temp_indent_level = indent_level
        for item in obj[1]
          [s, delta] = @_toCoffeeRecurse item, temp_indent_level, zone_baseline, state_carry
          res += s
          temp_indent_level = indent_level + delta
      when "TOFFEE"
        ind = indent_level
        res += "\n#{@_space ind}_ts #{states.TOFFEE}"
        lineno = obj[2]
        try
          t_int = utils.interpolateString obj[1]
        catch e
          e.relayed_line_range = [lineno, lineno + obj[1].split("\n").length]
          @error = new toffeeError @, errorTypes.STR_INTERPOLATE, e
          throw e
        for part in t_int
          if part[0] is "TOKENS"
            res    += @_printLineNo lineno, ind
            interp  = part[1].replace /(^[\n \t]+)|([\n \t]+)$/g, ''
            if @_snippetIsSoloToken interp
              chunk = "\#{if #{interp}? then escape #{interp} else ''}"
            else if @_snippetHasEscapeOverride interp
              chunk = "\#{#{interp}}"
            else
              chunk = "\#{escape(#{interp})}"
            res    += "\n#{@_space ind}_to #{@_quoteStr chunk}"
            lineno += part[1].split("\n").length - 1
          else
            lines = part[1].split "\n"
            for line,i in lines
              res += @_printLineNo lineno, ind
              lbreak  = if i isnt lines.length - 1 then "\n" else ""
              chunk   = @_escapeForStr "#{line}#{lbreak}"
              if chunk.length
                res    += "\n#{@_space ind}_to #{@_quoteStr(chunk + lbreak)}"
              if i < lines.length - 1 then lineno++
        res += @_printLineNo obj[2] + (obj[1].split('\n').length-1), ind
        res += "\n#{@_space ind}_ts #{states.COFFEE}"
      when "COFFEE"
        c = obj[1]
        res += "\n#{@_reindent c, indent_level, indent_baseline}"
        i_delta = @_getIndentationDelta c, indent_baseline
        state_carry.last_coffee_ends_with_newline = @_doesEndWithNewline c
      else 
        throw "Bad parsing. #{obj} not handled."
        return ["",0]

    return [res, i_delta]

  _quoteStr: (s) ->
    ###
    returns a triple-quoted string, dividing into single quoted
    start and stops, if the string begins with double quotes, since
    coffee doesn't want to let us escape those.
    ###
    lead = ""
    follow = ""
    while s.length and (s[0] is '"')
      s = s[1...]
      lead += '"'
    while s.length and (s[-1...] is '"')
      s = s[...-1]
      follow += '"'
    res = ''
    if lead.length then res += "\'#{lead}\' + "
    res += '"""' + s + '"""'
    if follow.length then res += "+ \'#{follow}\'"
    res

  _doesEndWithNewline: (s) ->
    parts = s.split "\n"
    if (parts.length > 1) and parts[parts.length - 1].match /^[\t ]*$/
      return true
    else
      return false

  _escapeForStr: (s) ->
    ###
    escapes a string so it can make it into coffeescript
    triple quotes without losing whitespace, etc.
    ###
    s = s.replace /\\/g, '\\\\'
    s = s.replace /\n/g, '\\n'
    s = s.replace /\t/g, '\\t'
    s

  _getZoneBaseline: (obj_arr) ->
    for obj in obj_arr
      if obj[0] is "COFFEE"
        ib = @_getIndentationBaseline obj[1]
        return ib if ib?
    return 0

  _getIndentationBaseline: (coffee) ->
    # returns the indentation level of the first line of coffeescript (as a number
    # or null, if the region doesn't have any real code in it
    res = null
    lines = coffee.split "\n"
    if lines.length
      for line, i in lines
        # if it has characters or it's the last chance, use it
        if (not line.match /^[ ]*$/) or i is (lines.length - 1)
          res = line.match(/[ ]*/)[0].length
          break
    if not res?
      res = coffee.length
    return res

  _getIndentationDelta: (coffee, baseline) ->
    ###
    given an arbitrarily indented set of coffeescript, returns the delta
    between the first and last lines, in chars.
    Ignores leading/trailing whitespace lines
    If passed a baseline, uses that instead of own.
    ###
    if not baseline? then baseline = @_getIndentationBaseline coffee
    if not baseline?
      res = 0
    else 
      lines = coffee.split "\n"
      if lines.length < 1
        res = 0
      else 
        y   = lines[lines.length - 1]
        y_l = y.match(/[ ]*/)[0].length
        res = y_l - baseline
    return res

  _reindent: (coffee, indent_level, indent_baseline) ->    
    lines = coffee.split '\n'
    # strip out any leading whitespace lines
    while lines.length and lines[0].match /^[ ]*$/
      lines = lines[1...]
    return '' unless lines.length
    rxx    = /^[ ]*/
    strip  = indent_baseline
    indent = @_space indent_level
    res    = ("#{indent}#{line[strip...]}" for line in lines).join "\n"
    res

  _space: (indent) -> (" " for i in [0...indent]).join ""
    
  _tabAsSpaces: -> (" " for i in [0...TAB_SPACES]).join ""

  _coffeeHeaders: ->
    ___  = @_tabAsSpaces()

    """
#{if @browserMode then '' else getCommonHeaders false, @autoEscape }
tmpl = toffee.templates["#{@bundlePath}"]  =
  bundlePath: "#{@bundlePath}"
tmpl.render = tmpl.pub = (__locals) ->
#{___}_to = (x) -> __locals.__toffee.out.push x
#{___}_ln = (x) -> __locals.__toffee.lineno = x
#{___}_ts = (x) -> __locals.__toffee.state  = x
#{___}toffee.__augmentLocals __locals, "#{@bundlePath}"

#{___}`with (__locals) {`
#{___}__toffee.out = []
"""

  _coffeeFooters: ->
    ___    = @_tabAsSpaces()
    """\n
#{___}__toffee.res = __toffee.out.join ""
#{___}return __toffee.res
#{___}`true; } /* closing JS 'with' */ `
# sometimes we want to execute the whole thing in a sandbox
# and just output results
if __toffee_run_input?
#{___}return tmpl.pub __toffee_run_input
"""

exports.view                = view
exports.getCommonHeaders    = getCommonHeaders
exports.getCommonHeadersJs  = getCommonHeadersJs

# express 2.x support
exports.expressCompile = (txt, options) ->
  v = new view txt, options
  return (vars) ->
    res = v.run vars
    if res[0]
      res[0]
    else
      res[1]
