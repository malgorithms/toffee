path = require "path"

errorTypes = exports.errorTypes =
  PARSER:         0
  COFFEE_COMPILE: 1
  RUNTIME:        2

class toffeeError

  constructor: (view, err_type, e) ->
    @errType        = err_type
    @view           = view
    @e              = e
    @toffeeSrc      = view.txt
    console.log "Constructing #{err_type}"
    switch @errType
      when errorTypes.PARSER         then @offensiveSrc = @toffeeSrc
      when errorTypes.COFFEE_COMPILE then @offensiveSrc = @view.coffeeScript
      when errorTypes.JS_RUNTIME     then @offensiveSrc = @view.javaScript
    @toffeeSrcLines    = @toffeeSrc.split    "\n"
    @offensiveSrcLines = @offensiveSrc.split "\n"


  getConvertedError: ->

    ### --------------------------------------
    returns a JS style error, but with some extras
    {
      stack:      with converted line numbers
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
      line_range: [0,0]
    }

    if @e?.message? then res.message = @e.message
    if @e?.stack?   then res.stack   = @e.stack
    switch @errType

      when errorTypes.PARSER
        line = @_extractOffensiveLineNo @e.message, /on line ([0-9]+)/
        res.line_range = [line, line + 1]
        res.stack = []
        #res.stack = res.stack[1...]

      when errorTypes.COFFEE_COMPILE
        todo = "TODO: THIS"

      when errorTypes.JS_RUNTIME
        todo = "TODO: THIS"

    res

  getPrettyPrintText: ->
    ###
    returns a TEXT only blob explaining the error
    ###
    cerr = @getConvertedError()
    if cerr.type is errorTypes.PARSER
      header = "#{cerr.dir_name}/#{cerr.file}: #{cerr.message}"
    else
      header = cerr.message    
    res = """
    ---------------------
    ERROR
    =====
    #{header}
    """
    if cerr.stack?.length
      res += """
      STACK
      =====
      #{cerr.stack} 
    """
    res += """
    ---------------------
    """
    res

  getPrettyPrint: ->
    ###
    returns an HTML blob explaining the error 
    with lines highlighted
    ###
    cerr = @getConvertedError()
    res = ""
    if cerr.type is errorTypes.PARSER
      header = "#{cerr.dir_name}/<b>#{cerr.file}</b>: #{cerr.message}"
    else
      header = cerr.message
    res += """
      <div style="border:1px solid #999;margin:10px;padding:10px;background-color:#fff;position:fixed;top:0;left:0;width:960px;z-index:9999;">
        \n<pre>#{header}</pre>
        \n<hr />
        \n<div style=\"font-family:courier new;font-size:10pt;color:#900;\">        
    """

    for i in [(cerr.line_range[0]-3)...(cerr.line_range[1]+1)]
      if (i < 0) or i > @toffeeSrcLines.length - 1
        continue
      line = _ppEscape @toffeeSrcLines[i] 
      padding_len = 5 - ("#{i+1}").length
      padding     = ("&nbsp;" for j in [0...padding_len]).join ""
      if cerr.line_range[0] <= (i+1) < cerr.line_range[1]
        extra = "<span style=\"background-color:#fee\">"
      else
        extra = "<span>"
      res+= "#{extra}\n#{i+1}: #{padding} #{line}</span><br />"
    res += """
        \n</div>
      \n</div>
    """
    res

  _lineRangeToPhrase: (lrange) ->
    if lrange[0] is lrange[1] - 1
      "on line #{lrange[0]}"
    else
      "between lines #{lrange[0]} and #{lrange[1] - 1}"

  _extractOffensiveLineNo: (msg, rxx) ->
    m = msg.match rxx
    if not (m?.length >= 2) then return null
    return parseInt m[1]

  _convertOffensiveLineToToffeeRange: (lineno) ->
    ###
      Given the error line in a converted file, hunts for surrounding
      __toffee.lineno calls and returns a pair array with the error position
      range in the original toffee file.
    ###
    ol            = @offensiveSrcLines
    tl            = @toffeeSrcLines

    if (not lineno?) or isNaN lineno
      return [1,t1.length]

    prev          = ol[0...lineno].join "\n"
    next          = ol[lineno...].join  "\n"
    prev_matches  = prev.match /__toffee.lineno[ ]*=[ ]*([0-9]+)/g
    next_matches  = next.match /__toffee.lineno[ ]*=[ ]*([0-9]+)/g
    res           = [1,tl.length]

    if prev_matches?.length
      res[0] = parseInt prev_matches[prev_matches.length-1].match(/[0-9]+/)[0]
    if after_matches?.length
      res[1] = parseInt next_matches[0].match(/[0-9]+/)[0]
    res


exports.toffeeError = toffeeError


# -----------------------------------------------------------------------------



eh = exports.errorHandler = 

  generateParseError: (view, e) ->
    ###
    e: the error caught when compiling
    ###
    msg = e.message
    res = 
      src_line:           0
      toffee_line_range:  [0,1]
      original_msg:       msg
      converted_msg:      msg

    search = msg.match /on line ([0-9]+)/
    if not (search?.length >= 2) then return res
    res.src_line = parseInt search[1]
    res.toffee_line_range = [res.src_line, res.src_line]
    if view.fileName then res.converted_msg = "#{view.fileName}: #{res.converted_msg}"
    res

  generateRuntimeError: (view, e) ->
    ###
    e: the error caught when running
    ###
    console.log e
    src = view.javaScript
    msg = e.message
    stack = e.stack

    res =
      src_line: 0
      toffee_line_range: [0,1]
      original_msg: msg
      converted_msg: msg

    search = stack.match /pub\ \(undefined\:([0-9]+):[0-9]+/
    if not (search?.length >= 2) then return res
    res.src_line = search[1]
    src_lines = src.split '\n'
    txt_lines = view.txt.split '\n'
    before = src_lines[0...res.src_line].join "\n"
    after  = src_lines[res.src_line...].join  "\n"
    prev_matches  = before.match /__toffee.lineno[ ]*=[ ]*([0-9]+)/g
    after_matches = after.match  /__toffee.lineno[ ]*=[ ]*([0-9]+)/g
    if prev_matches?.length
      res.toffee_line_range[0] = parseInt prev_matches[prev_matches.length-1].match(/[0-9]+/)[0]
    else
      res.toffee_line_range[0] = 1
    if after_matches?.length
      res.toffee_line_range[1] = parseInt after_matches[0].match(/[0-9]+/)[0]
    else
      res.toffee_line_range[1] = txt_lines.length
    res.offensive_lines = txt_lines[(res.toffee_line_range[0]-1)...(res.toffee_line_range[1]-1)]
    if res.toffee_line_range[0] is res.toffee_line_range[1] - 1
      new_msg = "on line #{res.toffee_line_range[0]}"
    else
      new_msg = "between lines #{res.toffee_line_range[0]} and #{res.toffee_line_range[1]}"
    res.converted_msg = res.original_msg + " " + new_msg
    if view.fileName then res.converted_msg = "#{view.fileName}: #{res.converted_msg}"
    res


  generateCompileToJsError: (view, e) ->
    ###
    e: the error caught when compiling
    ###
    src = view.coffeeScript
    msg = e.message
    res =
      src_line: 0
      toffee_line_range: [0,1]
      original_msg: msg
      converted_msg: msg
    search = msg.match /on line ([0-9]+)/
    if search?.length >= 2
      res.src_line = search[1]
      res.toffee_line_range = @_convertSrcLineToToffeeRange view.coffeeScript, res.src_line
      res.offensive_lines = txt_lines[(res.toffee_line_range[0]-1)...(res.toffee_line_range[1]-1)]
      if res.toffee_line_range[0] is res.toffee_line_range[1] - 1
        new_msg = "on line #{res.toffee_line_range[0]}"
      else
        new_msg = "between lines #{res.toffee_line_range[0]} and #{res.toffee_line_range[1]}"
      res.converted_msg = res.original_msg.replace "on line #{res.src_line}", new_msg
      if view.fileName then res.converted_msg = "#{view.fileName}: #{res.converted_msg}"
    res

  prettyPrintError: (view) ->
    if not view.error
      ""
    else
      res = """<div style="border:1px solid #999;margin:10px;padding:10px;background-color:#fff;position:fixed;top:0;left:0;width:960px;z-index:9999;">"""
      res += "<b>#{eh._ppEscape view.error.converted_msg}</b>"
      res += "\n  <br />--------<br />"
      res += "\n<div style=\"font-family:courier new;font-size:10pt;color:#900;\">"
      txt_lines = view.txt.split '\n'
      for i in [(view.error.toffee_line_range[0]-3)...(view.error.toffee_line_range[1]+1)]
        if (i < 0) or i > txt_lines.length - 1
          continue
        line = eh._ppEscape txt_lines[i] 
        lineno = i+1
        padding_len = 5 - ("#{lineno}").length
        padding     = ("&nbsp;" for i in [0...padding_len]).join ""
        res+= "\n#{lineno}: #{padding} #{line} <br />"
      res += "\n</div>"
      res += "\n</div>"
      res    

_ppEscape = (txt) ->
  txt = txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
  # retain leading spaces
  m = txt.match /^[\t ]*/
  txt = txt.replace m[0], ("&nbsp;" for i in [0...(m[0].length)]).join ""
  txt