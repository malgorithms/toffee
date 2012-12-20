fs                              = require 'fs'
path                            = require 'path'
{view, getCommonHeadersJs}      = require '../lib/view'
program                         = require 'commander'
mkdirp                          = require 'mkdirp'

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
  .option('-o, --output [path]',      'file (bundles all output into a single .js)')
  .option('-d, --output_dir [path]',  'compiles templates into parallel .js files')
  .option('-p, --print',              'print to stdout')
  .option('-m, --minimize',           'minimize output (ugly, smaller file(s))')
  .option('-c, --coffee',             'output to CoffeeScript (not JS)')
  .option('-b, --bundle_path [path]', 'bundle_path (instead of "/") for templates')
  .option('-n, --no_headers',         'exclude boilerplate toffee (requires toffee.js included separately)')
  .parse process.argv

# -----------------------------------------------------------------------------

compile = (start_path, full_path) ->
  ###
  e.g., if start_path is /foo/bar
  and   path is /foo/bar/car/thing.toffee
  ###
  source = fs.readFileSync full_path, 'utf8'
  bundle_path = full_path[start_path.length...]

  if start_path is full_path
    bundle_path = "/" + path.basename full_path

  if program.bundle_path
    bundle_path = path.normalize "#{program.bundle_path}/#{bundle_path}"

  v = new view source,
    fileName:     full_path
    bundlePath:   bundle_path
    browserMode:  true
    minimize:     program.minimize? and program.minimize
  if program.coffee
    output = v.toCoffee()
  else
    output = v.toJavaScript()
  if v.error
    process.stderr.write v.error.getPrettyPrintText()
    process.exit 1

  [output, bundle_path]

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
    comp = compile start_path, curr_path
    out_text += "\n;\n" + comp[0]
    if program.output_dir
      file_out_path = path.normalize "#{program.output_dir}/#{comp[1]}"
      file_out_path = "#{path.dirname file_out_path}/#{path.basename file_out_path, '.toffee'}"
      file_out_path += if program.coffee then '.coffee' else '.js'
      if not program.print
        console.log "Outputting #{file_out_path}"
      mkdirp.sync path.dirname file_out_path
      fs.writeFileSync file_out_path, maybeAttachHeaders(comp[0]), "utf8"

  return out_text

# -----------------------------------------------------------------------------

maybeAttachHeaders = (pre_output) ->
  if program.no_headers
    return pre_output
  else
    header_out = getCommonHeadersJs true, true, true
    if program.coffee
      return "`#{header_out}`\n\n#{pre_output}"
    else
      return "#{header_out}\n;\n#{pre_output}"

# -----------------------------------------------------------------------------

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

    if program.output_dir
      try
        mkdirp.sync program.output_dir
      catch e
        console.log "Couldn't make/use #{program.output_dir}; #{e}" 
        process.exit 1

    start_path = path.normalize start_path
    template_out = recurseRun start_path, start_path, ''
    out_text = maybeAttachHeaders template_out

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
