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
    console.log JSON.stringify @codeObj
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
      d = Date.now()
      res =  @_coffeeHeaders()
      res += @_toCoffeeRecurse(@codeObj, 0, 0)[0]
      res += @_coffeeFooters()
      @coffeeScript = res
      console.log res
      console.log "Compiled to CoffeeScript in #{Date.now()-d}ms"
    @coffeeScript

  _toCoffeeRecurse: (obj, indent_level, indent_baseline) ->
    # returns [res, indent_baseline_delta]
    # indent_level    = # of spaces to add to each coffeescript section
    # indent_baseline = # of chars to strip from each line inside {# #} 

    res = ""
    # console.log "-v--"
    # console.log obj
    # console.log "Handling obj size #{obj.length}; type=#{obj[0]}; children=#{if obj.length > 1 then obj[1]}"
    # console.log "-^--"
    i_delta = 0
    switch obj[0]
      when "INDENTED_COJO_ZONE"
        indent_level += TAB_SPACES
        for item in obj[1]
          [s, delta] = @_toCoffeeRecurse item, indent_level, indent_baseline
          #i_delta += delta
          #indent_level += delta
          #i_delta = indent_baseline + delta - indent_baseline
          res += s
      when "COJO_ZONE"
        res += "\n#{@_space indent_level}__cojo__.state = \"COJO\""
        for item in obj[1]
          [s, delta] = @_toCoffeeRecurse item, indent_level, indent_baseline
          console.log "INDENTING BY #{delta}"
          #indent_level += delta
          #i_delta += delta
          #if item[0] is "COFFEE"
          #  indent_level += 100#delta
          #indent_baseline += delta
          #i_delta = delta
          res += s
      when "COFFEE_ZONE"
        res += "\n#{@_space indent_level}__cojo__.state = \"COFFEE\""
        zone_baseline   = @_getZoneBaseline obj[1]
        temp_indent_level = indent_level
        for item in obj[1]
          [s, delta] = @_toCoffeeRecurse item, temp_indent_level, zone_baseline
          res += s
          temp_indent_level = indent_level + delta

          #if item[0] is "COFFEE"
          #  rel_baseline = @_getIndentationBaseline item[1], zone_baseline
          #  console.log "Rel = #{rel_baseline} Zone baseline = #{zone_baseline}"
          #  indent_level = rel_baseline
      when "COJO"
        res += "\n#{@_space indent_level}__cojo__.state = \"COJO\""
        res += "\n#{@_space indent_level}__cojo__.res += " + '"""' + obj[1] + '"""'
        res += "\n#{@_space indent_level}__cojo__.state = \"COFFEE\""
      when "COFFEE"
        console.log obj
        res += "#{@_space indent_level}# DEBUG: indent_level=#{indent_level} indent_baseline=#{indent_baseline}"
        res += "\n#{@_reindent obj[1], indent_level, indent_baseline}"
        i_delta = @_getIndentationDelta obj[1], indent_baseline
        #console.log i_delta
        #indent_level += i_delta
      else 
        throw "Bad parsing. #{obj} not handled."
        #console.log "Bad parsing. #{obj} not handled."
        return ["",0]

    return [res, i_delta]

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
    console.log "Getting indentation delta from #{baseline }for\n-------\n#{coffee}\n--------"

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
    
    console.log "#{res}\n======="
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
    res = ("#{indent}#{line[strip...]}" for line in lines).join "\n"
    res

  _space: (indent) -> (" " for i in [0...indent]).join ""
    
  _tabAsSpaces: -> (" " for i in [0...TAB_SPACES]).join ""

  _coffeeHeaders: ->
    header = """
"""
    header

  _coffeeFooters: ->
    footer = """
"""
    footer


exports.view   = view