fs                              = require 'fs'
path                            = require 'path'
{view, getCommonHeadersJs}      = require '../lib/view'
program                         = require 'commander'

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
  .option('-o, --output [path]',     'output file')
  .option('-p, --print',      'print output to stdout')
  .option('-c, --coffee',     'output to CoffeeScript (not JS)')
  .parse process.argv

# -----------------------------------------------------------------------------

compile = (start_path, path) ->
  ###
  e.g., if start_path is /foo/bar
  and   path is /foo/bar/car/thing.toffee
  ###
  source = fs.readFileSync path, 'utf8'
  v = new view source,
    fileName:     path
    bundlePath:   path[start_path.length...]
    browserMode:  true
  return v._toJavaScript()

# -----------------------------------------------------------------------------

recurseRun = (start_path, curr_path, out_text) ->
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
    console.log program.args
    process.exit 1
  else
    try
      start_path = fs.realpathSync program.args[0]
    catch e
      console.log "Input file/path not found. toffee --help for examples"
      process.exit 1
    start_path = path.normalize start_path
    out_text = recurseRun start_path, start_path, ""    
    out_text = getCommonHeadersJs() + out_text
    if program.print
      console.log out_text
    if program.output
      try
        console.log "Writing #{program.output}"
        fs.writeFileSync program.output, out_text, "utf8"
      catch e
        console.log e
        process.exit 1


# -----------------------------------------------------------------------------

if require.main is module
  run()
