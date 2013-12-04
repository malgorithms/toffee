path = require "path"
util = require "util"

errorTypes = exports.errorTypes =
  PARSER:           0
  STR_INTERPOLATE:  1
  COFFEE_COMPILE:   2
  RUNTIME:          3

class toffeeError extends Error

  constructor: (view, err_type, e) ->
    @errType        = err_type
    @view           = view
    @e              = e
    @toffeeSrc      = view.txt
    switch @errType
      when errorTypes.PARSER          then @offensiveSrc = @toffeeSrc
      when errorTypes.STR_INTERPOLATE then @offensiveSrc = @toffeeSrc
      when errorTypes.COFFEE_COMPILE  then @offensiveSrc = @view.coffeeScript
      when errorTypes.RUNTIME         then @offensiveSrc = @view.javaScript
    @toffeeSrcLines    = @toffeeSrc.split    "\n"
    @offensiveSrcLines = @offensiveSrc.split "\n"


  getConvertedError: ->

    ### --------------------------------------
    returns a JS style error, but with some extras
    {
      stack:      array of lines
      message:    error message
      line_range: line range in the toffee file
      filename:   filename, if available; or null
      ...etc...
    }
    ------------------------------------------
    ###
    res = {
      stack:      []
      message:    ""
      type:       @errType
      full_path:  @view.fileName
      dir_name:   path.dirname @view.fileName
      file:       path.basename @view.fileName
      line_range: null # will be a pair
    }

    if @e?.message? then res.message = @e.message

    # Error objects now support line numbers in certain cases.
    if @e?.location?.first_line?
      res.line_range = @_convertJsErrorRangeToToffeeRange @e.location

    switch @errType

      when errorTypes.PARSER
        if not res.line_range?
          line            = @_extractOffensiveLineNo @e.message, /on line ([0-9]+)/
          res.line_range  = [line, line + 1]

      when errorTypes.STR_INTERPOLATE
        res.line_range  = [@e.relayed_line_range[0], @e.relayed_line_range[1]]
        res.message     = res.message.replace 'starting on line NaN', @_lineRangeToPhrase res.line_range
        res.message     = res.message.replace 'missing }', 'unclosed `\#{}`'

      when errorTypes.COFFEE_COMPILE
        if not res.line_range?
          line            = @_extractOffensiveLineNo @e.message, /on line ([0-9]+)/
          res.line_range  = @_convertOffensiveLineToToffeeRange line
        if res.message.indexOf('on line') isnt -1
          res.message     = res.message.replace /on line [0-9]+/, @_lineRangeToPhrase res.line_range
        else
          res.message += " " + @_lineRangeToPhrase res.line_range
        

      when errorTypes.RUNTIME
        if not res.line_range?
          res.line_range = [0,0]
        if @e.stack
          res.stack     = @e.stack.split "\n"
          @_convertRuntimeStackLines res
    res

  _convertRuntimeStackLines: (converted_err)->
    ###
    a little more complicated, so extracted. Returns an array
    of dictionaries where there's extra info on each line in the stack.
    ###
    hit_pub_yet  = false # beyond this the stack isn't so important
    stack        = converted_err.stack
    for line, i in stack

      rxx_pub = /// 
        Object[\.].*?pub[\s]\(undefined\:([0-9]+)\:[0-9]+ 
        |
        tmpl[\.]render[\.]tmpl[\.]pub.*\(.*\:([0-9]+)\:[0-9]+ 
        ///
      m           = line.match rxx_pub
      in_src_file = false
      lrange      = [null, null]
      at_pub_call = false
      if m?.length >= 2
        line          = line.replace "undefined", converted_err.full_path
        lineno        = @_extractOffensiveLineNo line, /([0-9]+)\:[0-9]+/
        lrange        = @_convertOffensiveLineToToffeeRange lineno
        line          = line.replace /\:[0-9]+\:[0-9]+/, ""
        hit_pub_yet   = true
        in_src_file   = true
        at_pub_call   = true

      rxx_inline = /// at[\s]undefined\:([0-9]+)\:[0-9]+ ///
      m = line.match rxx_inline
      if m?.length >= 2
        line        = line.replace "undefined", converted_err.full_path
        lineno      = @_extractOffensiveLineNo line, /([0-9]+)\:[0-9]+/
        lrange      = @_convertOffensiveLineToToffeeRange lineno
        line        = line.replace /\:[0-9]+\:[0-9]+/, ""
        in_src_file = true

      stack[i] =
        line:           line
        above_pub_call: not hit_pub_yet
        at_pub_call:    at_pub_call
        in_src_file:    in_src_file
        line_range:     lrange

      if stack[i].line_range[0] and not converted_err.line_range[0]
        converted_err.line_range = stack[i].line_range

  getPrettyPrintText: ->
    ###
    returns a TEXT only blob explaining the error
    ###
    cerr = @getConvertedError()
    header = "#{cerr.dir_name}/#{cerr.file}: #{cerr.message}"
    res = """
    ERROR
    =====
    #{header}
    """
    if cerr.stack?.length
      res += """\n
      STACK
      =====\n
      """
      count = 0
      for item,i in cerr.stack
        if i is 0
          res += "#{count++} #{item.line}"
        else if item.in_src_file and (item.above_pub_call or item.at_pub_call)
          res += "#{count++} [#{@_lineRangeToPhrase item.line_range}] #{cerr.dir_name}/#{cerr.file}"
        else if item.in_src_file
          continue
        else
          res += "#{count++}#{item.line}"
        if i < cerr.stack.length - 1
          res += "\n"
    res += """\n"""
    res

  getPrettyPrint: ->
    ###
    returns an HTML blob explaining the error 
    with lines highlighted
    ###
    cerr = @getConvertedError()
    res = ""
    header = "#{cerr.dir_name}/<span style=\"background-color:#fde\"><b>#{cerr.file}</b>: #{_ppEscape cerr.message}</span>"
    res += """
      <div style="line-height:13px;border:1px solid #999;margin:10px;padding:10px;background-color:#fff;position:fixed;top:0;left:0;max-width:90%;z-index:9999;max-height:90%;overflow:scroll;">
        \n<pre>#{header}</pre>
        \n<hr />
        \n<div style=\"font-family:courier new;font-size:12px;color:#900;width:100%;\">        
    """
    if cerr.stack?.length
      res += "<div style=\"border:1px solid #000;background-color:#eee;width:100%;\">"
      count = 0
      for item,i in cerr.stack
        if i is 0
          res += "<div style=\"color:#333;width:100%\">#{count++} #{item.line}</div>"
        else if item.in_src_file and (item.above_pub_call or item.at_pub_call)
          res += "<div style=\"color:#000;width:100%\">#{count++} [#{@_lineRangeToPhrase item.line_range}] #{cerr.dir_name}/#{cerr.file}</div>"
        else if item.in_src_file
          continue
        else
          res += "<div style=\"color:#999;width:100%\">#{count++}#{item.line}</div>"
      res += "</div>"

    for i in [(cerr.line_range[0]-3)...(cerr.line_range[1]+1)]
      if (i < 0) or i > @toffeeSrcLines.length - 1
        continue
      line = _ppEscape @toffeeSrcLines[i] 
      padding_len = 5 - ("#{i+1}").length
      padding     = ("&nbsp;" for j in [0...padding_len]).join ""
      if (cerr.line_range[0] - 1) <= (i) < cerr.line_range[1]
        extra = "<span style=\"background-color:#fde\">"
      else
        extra = "<span>"
      res+= "#{extra}\n#{i+1}: #{padding} #{line}</span><br />"
    res += """
        \n</div>
      \n</div>
    """
    res

  _lineRangeToPhrase: (lrange) ->
    if lrange[0] is lrange[1]
      "on line #{lrange[0]}"
    else
      "between lines #{lrange[0]} and #{lrange[1]}"

  _extractOffensiveLineNo: (msg, rxx) ->
    m = msg.match rxx
    if not (m?.length >= 2) then return null
    return parseInt m[1]

  _convertJsErrorRangeToToffeeRange: (loc) ->
    range = @_convertOffensiveLineToToffeeRange loc.first_line
    if loc.last_line?
      range2 = @_convertOffensiveLineToToffeeRange loc.last_line
      range[1] = range2[1]
    return range

  _convertOffensiveLineToToffeeRange: (lineno) ->
    ###
      Given the error line in a converted file, hunts for surrounding
      __toffee.lineno calls and returns a pair array with the error position
      range in the original toffee file.
    ###
    ol            = @offensiveSrcLines
    tl            = @toffeeSrcLines

    if (not lineno?) or isNaN lineno
      return [1,tl.length]

    prev          = ol[0...lineno].join "\n"
    next          = ol[lineno...].join  "\n"
    prev_matches  = prev.match /_ln[ ]*\(?[ ]*([0-9]+)/g
    next_matches  = next.match /_ln[ ]*\(?[ ]*([0-9]+)/g
    res           = [1,tl.length]

    if prev_matches?.length
      res[0] = parseInt prev_matches[prev_matches.length-1].match(/[0-9]+/)[0]
    if next_matches?.length
      res[1] = parseInt next_matches[0].match(/[0-9]+/)[0]
    res


exports.toffeeError = toffeeError

_ppEscape = (txt) ->
  txt = txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
  # retain leading spaces
  m = txt.match /^[\t ]*/
  txt = txt.replace m[0], ("&nbsp;" for i in [0...(m[0].length)]).join ""
  txt