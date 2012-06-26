
fs         = require "fs"
{engine}   = require '../lib/engine'
{view}     = require '../lib/view'

printUsage = ->
  console.log """
    Usage: toffee [-c] input.toffee
  
        -c == output to CoffeeScript (instead of JS)

      TODO: make a more useful command line tool.
  """
  process.exit 1

getVersionNumber = ->
  JSON.parse(fs.readFileSync "#{__dirname}/../package.json", "utf8").version

exports.run = ->
  e = new engine()
  args = process.argv.slice 2
  if args.length is 2
    coffee = true
    if args[0] isnt "-c"
      printUsage()
  else if args.length isnt 1
    printUsage()
  fname = args[-1..][0]
  source = fs.readFileSync fname, "utf8"
  v = new view source
  if coffee
    console.log v._toCoffee()
  else
    console.log v._toJavaScript()