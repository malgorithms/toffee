parser          = require('./cojo_lang').parser
coffee          = require 'coffee-script'
vm              = require 'vm'


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
      @javaScript = coffee.compile c
      console.log "Compiled to JavaScript in #{Date.now()-d}ms"
    @javaScript

  _toCoffee: ->
    if not @coffeeScript?
      d = Date.now()
      indent_depth = 1
      res = @_coffeeHeaders()
      for chunk, i in @codeObj
        switch chunk[0]
          when 'COJO'
            res += "\n#{@_space indent_depth}__cojo__.state=\"COJO\""
            res += "\n#{@_space indent_depth}__cojo__.res += " + '"""' + chunk[1] + '"""'
            res += "\n#{@_space indent_depth}__cojo__.state=\"COFFEE\""
          when 'COFFEE'
            res += "\n#{@_space indent_depth}__cojo__.state=\"COFFEE\"" if i is 0
            res += "\n#{@_reindent chunk[1], indent_depth}"
          when 'INDENT'  then indent_depth += 1
          when 'OUTDENT' then indent_depth -= 1
          else throw 'Bad parsing.'
      res += @_coffeeFooters()
      @coffeeScript = res
      console.log "Compiled to CoffeeScript in #{Date.now()-d}ms"
    @coffeeScript


  _reindent: (coffee, indent_depth) ->    
    lines = coffee.split '\n'
    # strip out any leading whitespace lines
    while lines.length and lines[0].match /^[\t\r ]*$/
      lines = lines[1...]
    return '' unless lines.length
    rxx    = /^[\t ]*/
    strip  = lines[0].match(rxx)[0].length
    res = ("#{@_space indent_depth}#{line[strip...]}" for line in lines).join "\n"
    res

  _space: (n) -> ("  " for i in [0...n]).join ""


  _coffeeHeaders: ->
    header = """
run = ->
#{@_space 1}__cojo__.state = "COJO"
"""
    header

  _coffeeFooters: ->
    footer = """

#{@_space 1}return __cojo__.res
run()
"""
    footer


exports.view   = view