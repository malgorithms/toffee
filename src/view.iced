parser          = require('./cojo_lang').parser
coffee          = require 'coffee-script'
{states}        = require './consts'
vm              = require 'vm'


TAB_SPACES = 2

class view

  constructor: (txt, options) ->
    options = options or {}
    @fileName     = options.fileName    or null
    @identifier   = options.indentifier or "pub"
    @codeObj      = null # these are all constructed as needed
    @coffeeScript = null # these are all constructed as needed
    @javaScript   = null # these are all constructed as needed
    @scriptObj    = null # these are all constructed as needed 
    @loadFromText txt

  loadFromText: (txt) ->
    @txt          = txt
    @codeObj      = parser.parse txt
    @_cleanTabs()

  _cleanTabs: ->
    tab = @_tabAsSpaces()
    for chunk, i in @codeObj
      if chunk[0] is 'COFFEE'
        chunk[1] = chunk[1].replace /\t/g, tab

  run: (options) ->
    ###
    returns [err, str]
    ###
    script = @_toScriptObj()
    err = null

    try
      sandbox =
        __cojo_run_input: options
      script.runInNewContext sandbox
      res = sandbox.__cojo_run_input.__cojo.res
      delete sandbox.__cojo_run_input.__cojo
      #console.log sandbox
      #process.exit 1
      #res = script options
    catch e
      err =    "Error: #{e.message}"
      err += "\nStack: #{e.stack}"
    return [err, res]

  _toScriptObj: ->

    if not @scriptObj?
      txt = @_toJavaScript()
      d = Date.now()
      @scriptObj = vm.createScript txt
      #@scriptObj = @cojoTemplates["pub"]
      console.log "Compiled to ScriptObj in #{Date.now()-d}ms"
    @scriptObj

  _toJavaScript: ->
    if not @javaScript?
      c = @_toCoffee()
      d = Date.now()
      @javaScript = coffee.compile c, {bare: false}
      console.log "Compiled to JavaScript in #{Date.now()-d}ms"
    @javaScript

  _toCoffee: ->
    if not @coffeeScript?
      d = Date.now()
      res =  @_coffeeHeaders()
      res += @_toCoffeeRecurse(@codeObj, TAB_SPACES, 0)[0]
      res += @_coffeeFooters()
      @coffeeScript = res
      console.log "Compiled to CoffeeScript in #{Date.now()-d}ms"
    @coffeeScript

  _toCoffeeRecurse: (obj, indent_level, indent_baseline) ->
    # returns [res, indent_baseline_delta]
    # indent_level    = # of spaces to add to each coffeescript section
    # indent_baseline = # of chars to strip from each line inside {# #} 

    res = ""
    i_delta = 0
    switch obj[0]
      when "INDENTED_COJO_ZONE"
        indent_level += TAB_SPACES
        for item in obj[1]
          [s, delta] = @_toCoffeeRecurse item, indent_level, indent_baseline
          res += s
      when "COJO_ZONE"
        res += "\n#{@_space indent_level}__cojo.state = states.COJO"
        for item in obj[1]
          [s, delta] = @_toCoffeeRecurse item, indent_level, indent_baseline
          res += s
      when "COFFEE_ZONE"
        res += "\n#{@_space indent_level}__cojo.state = states.COFFEE"
        zone_baseline   = @_getZoneBaseline obj[1]
        temp_indent_level = indent_level
        for item in obj[1]
          [s, delta] = @_toCoffeeRecurse item, temp_indent_level, zone_baseline
          res += s
          temp_indent_level = indent_level + delta
      when "COJO"
        res += "\n#{@_space indent_level}__cojo.state = states.COJO"
        res += "\n#{@_space indent_level}__cojo.out.push " + '"""' + @_escapeForStr(obj[1]) + '"""'
        res += "\n#{@_space indent_level}__cojo.state = states.COFFEE"
      when "COFFEE"
        res += "#{@_space indent_level}# DEBUG: indent_level=#{indent_level} indent_baseline=#{indent_baseline}"
        res += "\n#{@_reindent obj[1], indent_level, indent_baseline}"
        i_delta = @_getIndentationDelta obj[1], indent_baseline
      else 
        throw "Bad parsing. #{obj} not handled."
        return ["",0]

    return [res, i_delta]

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
    lines = coffee.split "\n"
    if lines.length is 0
      return null
    for line in lines
      if not line.match /^[\W]*$/
        return line.match(/[\W]*/)[0].length
    return null

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
      while lines.length and lines[lines.length-1].match /^[\W]*$/
        lines.pop()
      if lines.length < 1
        res = 0
      else 
        y   = lines[lines.length - 1]
        y_l = y.match(/[\W]*/)[0].length
        res = y_l - baseline
    return res

  _reindent: (coffee, indent_level, indent_baseline) ->    
    lines = coffee.split '\n'
    # strip out any leading whitespace lines
    while lines.length and lines[0].match /^[\W]*$/
      lines = lines[1...]
    return '' unless lines.length
    rxx    = /^[\W]*/
    strip  = indent_baseline
    indent = @_space indent_level
    res    = ("#{indent}#{line[strip...]}" for line in lines).join "\n"
    res

  _space: (indent) -> (" " for i in [0...indent]).join ""
    
  _tabAsSpaces: -> (" " for i in [0...TAB_SPACES]).join ""

  _coffeeHeaders: ->
    tab    = @_tabAsSpaces()
    header = """
domain                = this
domain.cojoTemplates  = domain.cojoTemplates or {}
domain.cojoTemplates["#{@identifier}"] = (locals) ->
#{tab}domain                = this
#{tab}locals.__cojo         = {}
#{tab}`with (locals) {`
#{tab}__cojo.out = []
#{tab}states = #{JSON.stringify states}
#{tab}if not include? then include = (fname, vars) -> 
#{tab}
"""
    header

  _coffeeFooters: ->
    tab    = @_tabAsSpaces()
    footer = """\n
#{tab}__cojo.res = __cojo.out.join ""
#{tab}return __cojo.res
#{tab}`} /* closing JS 'with' */ `
# sometimes we want to execute the whole thing in a sandbox
# and just output results
if __cojo_run_input?
#{tab}return domain.cojoTemplates["#{@identifier}"] __cojo_run_input
"""
    footer


exports.view   = view

# express 2.x support
exports.expressCompile = (txt, options) ->
  v = new view txt, options
  return (vars) ->
    res = v.run vars
    console.log res[1]
