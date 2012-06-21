parser          = require('./cojo_lang').parser
coffee          = require 'coffee-script'
vm              = require 'vm'

TAB_SPACES = 2

class view
  constructor: (txt) ->
    @codeObj      = null # these are all constructed as needed
    @coffeeScript = null # these are all constructed as needed
    @javaScript   = null # these are all constructed as needed
    @scriptObj    = null # these are all constructed as needed 
    @loadFromText txt

  loadFromText: (txt) ->
    @txt          = txt
    @codeObj      = parser.parse txt
    @_cleanTabs()

    console.log " =====txt======="
    console.log @txt
    console.log " =====code======="
    console.log @codeObj
    console.log " ============"

  _cleanTabs: ->
    tab = @_tabAsSpaces()
    for chunk, i in @codeObj
      if chunk[0] is 'COFFEE'
        chunk[1] = chunk[1].replace /\t/g, tab

  run: (vars, options) ->
    ###
    returns [err, str]
    ###
    script = @_toScriptObj()
    vars.__cojo__ =
      res: ""
    err = null

    # make some functions available
    if options.prebuilt_functions?
      for name, fn of options.prebuilt_functions
        vars[name] = fn
    try
      script.runInNewContext vars
      res = vars.__cojo__.res
      delete vars.__cojo__
    catch e
      err =    "Error: #{e.message}"
      err += "\nStack: #{e.stack}"
    return [err, res]

  _toScriptObj: ->
    if not @scriptObj?
      txt = @_toJavascript()
      d = Date.now()
      @scriptObj = vm.createScript txt
      console.log "Compiled to ScriptObj in #{Date.now()-d}ms"
    @scriptObj

  _toJavascript: ->
    if not @javaScript?
      c = @_toCoffee()
      d = Date.now()
      @javaScript = coffee.compile c, {bare: false}
      console.log "Compiled to JavaScript in #{Date.now()-d}ms"
    @javaScript

  _toCoffee: ->
    if not @coffeeScript?
      d            = Date.now()
      indent_stack = [0] # will be a series of numbers ; e.g., [2,3,2]
      indent_baseline_stack = [] # series of strings to strip from {# #} regions
      res          = @_coffeeHeaders()
      for chunk, i in @codeObj
        switch chunk[0]
          when 'COFFEE_REGION'
            indent_baseline_stack.push @_getIndentationBaseline @codeObj[i+1][1]
          when 'END_COFFEE_REGION'
            indent_baseline_stack.pop()
          when 'COJO'
            res += "\n#{@_space indent_stack}__cojo__.state = \"COJO\""
            res += "\n#{@_space indent_stack}__cojo__.res += " + '"""' + chunk[1] + '"""'
            res += "\n#{@_space indent_stack}__cojo__.state = \"COFFEE\""
            indent_stack.pop()
          when 'COFFEE' 
            res += "\n#{@_space indent_stack}__cojo__.state = \"COFFEE\"" if i is 0
            res += "\n#{@_reindent chunk[1], indent_stack, indent_baseline_stack}"
            i_delta = @_getIndentationDelta chunk[1]
            indent_stack.push i_delta
          when 'INDENT'  then indent_stack.push TAB_SPACES
          when 'OUTDENT' then indent_stack.pop()

          else throw 'Bad parsing.'
      res += @_coffeeFooters()
      @coffeeScript = res
      console.log res
      console.log "Compiled to CoffeeScript in #{Date.now()-d}ms"
    @coffeeScript

  _getIndentationBaseline: (coffee) ->
    # returns the indentation level of the first line of coffeescript (as a string)
    lines = coffee.split "\n"
    if lines.length is 0
      return ""
    for line in lines
      if not line.match /^[\W]*$/
        return line.match(/[\W]*/)[0]
    return ""

  _getIndentationDelta: (coffee) ->
    ###
    given an arbitrarily indented set of coffeescript, returns the delta
    between the first and last lines, in chars.
    Ignores leading/trailing whitespace lines
    ###
    lines = coffee.split "\n"
    while lines.length and lines[0].match /^[\W]*$/
      lines.splice 0,1
    while lines.length and lines[lines.length-1].match /^[\W]*$/
      lines.pop()
    if lines.length < 2
      return 0
    x   = lines[0]
    y   = lines[lines.length - 1]
    x_l = x.match(/[\W]*/)[0].length
    y_l = y.match(/[\W]*/)[0].length
    res = y_l - x_l
    res

  _reindent: (coffee, indent_stack, indent_baseline_stack) ->    
    lines = coffee.split '\n'
    # strip out any leading whitespace lines
    while lines.length and lines[0].match /^[\W]*$/
      lines = lines[1...]
    return '' unless lines.length
    rxx    = /^[\W]*/
    strip  = indent_baseline_stack[indent_baseline_stack.length-1].length #lines[0].match(rxx)[0].length
    indent = @_space indent_stack
    res = ("#{indent}#{line[strip...]}" for line in lines).join "\n"
    res

  _space: (indent_stack) ->
    sum = 0
    sum += x for x in indent_stack
    (" " for i in [0...sum]).join ""

  _tabAsSpaces: -> (" " for i in [0...TAB_SPACES]).join ""

  _coffeeHeaders: ->
    header = """
__cojo__.state = "COJO"
"""
    header

  _coffeeFooters: ->
    footer = """
"""
    footer


exports.view   = view