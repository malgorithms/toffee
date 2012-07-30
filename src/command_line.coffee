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
  .option('-c, --coffee',     'output to CoffeeScript (not JS)')
  .parse process.argv

# -----------------------------------------------------------------------------

compile = (start_path, path) ->
  ###
  e.g., if start_path is /foo/bar
  and   path is /foo/bar/car/thing.toffee
  this compiles it specifically as
    {identifier}/car/thing
  where identifier is "bar" if nothing passed from cmd line
  ###
  source = fs.readFileSync path, 'utf8'
  v = new view source, {fileName: path}
  return v._toJavaScript()

# -----------------------------------------------------------------------------

recurseRun = (start_path, curr_path, out_text) ->
  console.log out_text[0...1000]
  stats = fs.statSync curr_path
  if stats.isDirectory()
    files = fs.readdirSync curr_path
    for file in files
      sub_path = path.normalize "#{curr_path}/#{file}"
      if file.match /\.toffee$/
        out_text = recurseRun start_path, sub_path, out_text
      else if not (file in ['.','..'])
        sub_stats = fs.statSync sub_path
        if sub_stats.isDirectory()
          out_text = recurseRun start_path, sub_path, out_text
  else
    out_text += compile start_path, curr_path

  return out_text

run = exports.run = ->
  if program.args.length isnt 1
    console.log "Unexpected input. toffee --help for examples"
    process.exit 1
  else
    try
      start_path = fs.realpathSync program.args[0]
    catch e
      console.log "Input file/path not found. toffee --help for examples"
      process.exit 1
    start_path = path.normalize start_path
    out_text = recurseRun start_path, start_path, ""    
    console.log out_text

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