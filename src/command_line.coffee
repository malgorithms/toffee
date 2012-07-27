fs         = require 'fs'
path       = require 'path'
{view}     = require '../lib/view'
program    = require 'commander'

# -----------------------------------------------------------------------------

getVersionNumber = ->
  p = fs.readFileSync "#{__dirname}/../package.json", "utf8"
  o = JSON.parse p
  o.version

# -----------------------------------------------------------------------------

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
\n       var pubvars   = { name: \"Hans Gruber\", criminal: true };
\n       var some_html = toffee.render (\"views/layout.toffee\", pubvars);
\n    </script>
\n 
  "

program.version(getVersionNumber())
  .option('-o, --output',     'output file')
  .option('-p, --print',      'print output to stdout')
  .parse process.argv

# -----------------------------------------------------------------------------

recurseRun = (start_path, curr_path) ->
  stats = fs.statSync curr_path
  if stats.isDirectory()
    files = fs.readdirSync curr_path
    for file in files
      sub_path = path.normalize "#{curr_path}/#{file}"
      if file.match /\.toffee$/
        recurseRun start_path, sub_path
      else if not (file in ['.','..'])
        sub_stats = fs.statSync sub_path
        if sub_stats.isDirectory()
          recurseRun start_path, sub_path
  else
    console.log "Visiting #{curr_path}"

run = exports.run = ->
  if program.args.length isnt 1
    console.log "Unexpected input. toffee --help for examples"
    process.exit 1
  else
    recurseRun program.args[0], program.args[0]

# -----------------------------------------------------------------------------

if require.main is module
  run()

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