fs         = require 'fs'
{engine}   = require '../lib/engine'
{view}     = require '../lib/view'
program    = require 'commander'

getVersionNumber = ->
  p = fs.readFileSync "#{__dirname}/../package.json", "utf8"
  o = JSON.parse p
  o.version

program.on '--help', ->
  console.log "
\n  Examples:
\n
\n    toffee views               # recurses through views and builds views.js
\n    toffee foo.toffee          # builds foo.js
\n    toffee views -o templates  # builds templates.js
\n    toffee -p foo.toffee       # outputs JS to stdout
\n
\n
\n  Then use in your <html>:
\n
\n    <script src=\"views.js\"></script>
\n    <script>
\n       document.write(toffee.render(\"views/layout.toffee\", {username: \"Hans Gruber\"}));
\n    </script>
\n 
  "

program.version(getVersionNumber())
  .option('-o, --output',     'output file')
  .option('-p, --print',      'print output to stdout')
  .parse process.argv



#exports.run = ->
#  e = new engine()
#  args = process.argv.slice 2
#  if args.length is 2
#    coffee = true
#    if args[0] isnt "-c"
#      printUsage()
#  else if args.length isnt 1
#    printUsage()
#  fname = args[-1..][0]
#  source = fs.readFileSync fname, "utf8"
#  v = new view source, {fileName: fname}
#  if coffee
#    console.log v._toCoffee()
#  else
#    console.log v._toJavaScript()