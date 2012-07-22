{parser}        = require './toffee_lang'
{errorHandler}  = require './errorHandler'
{states}        = require './consts'
utils           = require './utils'
vm              = require 'vm'
try 
  coffee        = require "iced-coffee-script"
catch e
  coffee        = require "coffee-script"

TAB_SPACES = 2

class view

  constructor: (txt, options) ->
    options = options or {}
    @fileName     = (options.fileName or options.filename) or null
    @identifier   = options.indentifier or "pub"
    @codeObj      = null # these are all constructed as needed
    @coffeeScript = null # these are all constructed as needed
    @javaScript   = null # these are all constructed as needed
    @scriptObj    = null # these are all constructed as needed 
    @error        = null # assigned via errorHandler module
    @loadFromText txt

  loadFromText: (txt) ->
    @txt          = txt
    @_cleanTabs @txt
    try
      @codeObj      = parser.parse txt
      @_cleanTabs @codeObj
    catch e
      @error = errorHandler.generateParseError @, e

  _cleanTabs: (obj) ->
    ###
    replaces tabs with spaces in their coffee regions
    ###
    if obj[0] in ["INDENTED_TOFFEE_ZONE", "TOFFEE_ZONE", "COFFEE_ZONE"]
      @_cleanTabs item for item in obj[1]
    else if obj[0] is "COFFEE"
      obj[1] = obj[1].replace /\t/g, @_tabAsSpaces()

  run: (options) ->
    ###
    returns [err, str]
    ###
    script = @_toScriptObj()
    err = null
    if @error
      console.log @error.converted_msg
      return [errorHandler.prettyPrintError @, null]
    else 
      try
        sandbox =
          __toffee_run_input: options
        script.runInNewContext sandbox
        res = sandbox.__toffee_run_input.__toffee.res
        delete sandbox.__toffee_run_input.__toffee
      catch e
        @error = errorHandler.generateRuntimeError @, e
        console.log @error.converted_msg
        pp = errorHandler.prettyPrintError @
        return [pp, null]
        
      return [err, res]

  _toScriptObj: ->
    if not (@scriptObj? or @error?)
      txt = @_toJavaScript()
      d = Date.now()
      @scriptObj = vm.createScript txt
    @scriptObj

  _toJavaScript: ->
    if not @javaScript?
      c = @_toCoffee()
      d = Date.now()
      try
        @javaScript = coffee.compile c, {bare: false}
      catch e
        @error = errorHandler.generateCompileToJsError @, e
    @javaScript

  _toCoffee: ->
    if not @coffeeScript?
      d = Date.now()
      res =  @_coffeeHeaders()
      res += @_toCoffeeRecurse(@codeObj, TAB_SPACES, 0)[0]
      res += @_coffeeFooters()
      @coffeeScript = res
    @coffeeScript

  _printLineNo: (n, ind) ->
    if @lastLineNo? and (n is @lastLineNo)
      return ""
    else
      @lastLineNo = n
      return "\n#{@_space ind}__toffee.lineno = #{n}"

  _toCoffeeRecurse: (obj, indent_level, indent_baseline) ->
    # returns [res, indent_baseline_delta]
    # indent_level    = # of spaces to add to each coffeescript section
    # indent_baseline = # of chars to strip from each line inside {# #} 

    res = ""
    i_delta = 0
    switch obj[0]
      when "INDENTED_TOFFEE_ZONE"
        indent_level += TAB_SPACES
        for item in obj[1]
          [s, delta] = @_toCoffeeRecurse item, indent_level, indent_baseline
          res += s
      when "TOFFEE_ZONE"
        res += "\n#{@_space indent_level}__toffee.state  = states.TOFFEE"
        for item in obj[1]
          [s, delta] = @_toCoffeeRecurse item, indent_level, indent_baseline
          res += s
      when "COFFEE_ZONE"
        res += "\n#{@_space indent_level}__toffee.state = states.COFFEE"
        zone_baseline   = @_getZoneBaseline obj[1]
        temp_indent_level = indent_level
        for item in obj[1]
          [s, delta] = @_toCoffeeRecurse item, temp_indent_level, zone_baseline
          res += s
          temp_indent_level = indent_level + delta
      when "TOFFEE"
        ind = indent_level
        res += "\n#{@_space ind}__toffee.state = states.TOFFEE"
        t_int = utils.interpolateString obj[1]
        lineno = obj[2]
        for part in t_int
          if part[0] is "TOKENS"
            res    += @_printLineNo lineno, ind
            interp  = part[1].replace /^[\n \t]+/, ''
            if interp[0...7] in ['snippet','include','partial']
              # no re-encoding output of these
              chunk = "\#{#{interp}}"
            else if interp[0...5] is 'json|'
              chunk = "\#{jsonEscape(#{interp[5..]})}"
            else if interp[0...4] is 'raw|'
              chunk = "\#{#{interp[4..]}}"
            else if interp[0...5] is 'html|'
              chunk = "\#{htmlEscape(#{interp[5..]})}" 
            else
              chunk = "\#{escape(#{interp})}" 
            res    += "\n#{@_space ind}__toffee.out.push #{@_quoteStr chunk}"
            lineno += part[1].split("\n").length - 1
          else
            lines = part[1].split "\n"
            for line,i in lines
              res += @_printLineNo lineno, ind
              lbreak  = if i isnt lines.length - 1 then "\n" else ""
              chunk   = @_escapeForStr "#{line}#{lbreak}"
              if chunk.length
                res    += "\n#{@_space ind}__toffee.out.push #{@_quoteStr(chunk + lbreak)}"
              if i < lines.length - 1 then lineno++
        res += @_printLineNo obj[2] + (obj[1].split('\n').length-1), ind
        res += "\n#{@_space ind}__toffee.state = states.COFFEE"
      when "COFFEE"
        c = obj[1]
        res += "\n#{@_reindent c, indent_level, indent_baseline}"
        i_delta = @_getIndentationDelta c, indent_baseline
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

  _escapeForStr: (s) ->
    ###
    escapes a string so it can make it into coffeescript
    triple quotes without losing whitespace, etc.
    ###
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
domain                  = this
domain.toffeeTemplates  = domain.toffeeTemplates or {}
domain.toffeeTemplates["#{@identifier}"] = (locals) ->
#{___}domain                = this
#{___}locals.__toffee       = {}
#{___}`with (locals) {`
#{___}__toffee.out = []

#{___}if not print?
#{___}#{___}print = (txt) -> 
#{___}#{___}#{___}__toffee.out.push txt
#{___}#{___}#{___}''

#{___}jsonEscape = (o) ->
#{___}#{___}res = (""+JSON.stringify o)

#{___}htmlEscape = (o) ->
#{___}#{___}res = (""+o).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

#{___}if not escape?
#{___}#{___}escape = (o) ->
#{___}#{___}#{___}if (not __toffee.autoEscape?) or __toffee.autoEscape
#{___}#{___}#{___}#{___}return htmlEscape o

#{___}states = #{JSON.stringify states}
"""

  _coffeeFooters: ->
    ___    = @_tabAsSpaces()
    """\n
#{___}__toffee.res = __toffee.out.join ""
#{___}return __toffee.res
#{___}`} /* closing JS 'with' */ `
# sometimes we want to execute the whole thing in a sandbox
# and just output results
if __toffee_run_input?
#{___}return domain.toffeeTemplates["#{@identifier}"] __toffee_run_input
"""

exports.view   = view

# express 2.x support
exports.expressCompile = (txt, options) ->
  v = new view txt, options
  return (vars) ->
    res = v.run vars
    if res[0]
      res[0]
    else
      res[1]
