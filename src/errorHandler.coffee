
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
    e: the error caught when compiling
    ###
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
    if res.toffee_line_range[0] is res.toffee_line_range[1]
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
    if res.toffee_line_range[0] is res.toffee_line_range[1]
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
        res+= "\n#{lineno}: #{line} <br />"
      res += "\n</div>"
      res += "\n</div>"
      res    

  _ppEscape: (txt) ->
    txt = txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
    # retain leading spaces
    m = txt.match /^[\t ]*/
    txt = txt.replace m[0], ("&nbsp;" for i in [0...(m[0].length)]).join ""

