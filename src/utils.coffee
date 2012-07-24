lexer           = require './coffee-script/lexer'
lex             = new lexer.Lexer()

exports.interpolateString = (str) ->
  ###
  Similar to the interpolateString function in CoffeeScript,
  except that it doesn't actually work on anything inside an outer #{};
  we're just looking to recognize them.
  ###
  tokens = []
  res    = []
  pi = 0
  i  = -1
  while letter = str.charAt i += 1
    if letter is '\\'
      i += 1
      continue
    unless letter is '#' and str.charAt(i+1) is '{' and
           (expr = lex.balancedString str[i + 1..], '}')
      continue
    tokens.push ['NEOSTRING', str[pi...i]] if pi < i
    inner = expr[1...-1]
    if inner.length
      tokens.push ['TOKENS', inner]
    i += expr.length
    pi = i + 1
  tokens.push ['NEOSTRING', str[pi..]] if i > pi < str.length
  return res.push 'STRING', '""' unless tokens.length
  tokens.unshift ['', ''] unless tokens[0][0] is 'NEOSTRING'
  res.push '(', '(' if interpolated = tokens.length > 1
  for [tag, value], i in tokens
    res.push '+', '+' if i
    if tag is 'TOKENS'
      res.push [tag, value]
    else
      res.push ['STRING', value]
      #res.push 'STRING', @makeString value, '"', heredoc
  res.push ')', ')' if interpolated
  tokens
