{spawn, exec} = require 'child_process'
fs            = require 'fs'
jison         = require 'jison'
path          = require 'path'

task 'build', 'build the whole jam', (cb) ->  
  console.log "Building"
  files = fs.readdirSync 'src'
  files = ('src/' + file for file in files when file.match(/\.coffee$/))
  clearLibJs ->
    buildParser ->
      runCoffee ['-c', '-o', 'lib/'].concat(files), ->
        runCoffee ['-c', 'index.coffee'], ->
          generateExpressTest ->
            console.log "Done building."
            cb() if typeof cb is 'function'

runCoffee = (args, cb) ->
  proc =  spawn 'coffee', args
  console.log args
  proc.stderr.on 'data', (buffer) -> console.log buffer.toString()
  proc.on        'exit', (status) ->
    process.exit(1) if status isnt 0
    cb() if typeof cb is 'function'

clearLibJs = (cb) ->
  files = fs.readdirSync 'lib'
  files = ("lib/#{file}" for file in files when file.match(/\.js$/))
  fs.unlinkSync f for f in files
  cb()

buildParser = (cb) ->
  grammar   = fs.readFileSync './src/toffee.jison', 'utf8'
  generator = new jison.Generator grammar
  file_name = "toffee_lang.js"
  source    = generator.generate {
    moduleType: 'commonjs'
    moduleName: 'toffee_lang'
  }
  fs.writeFileSync "./lib/#{file_name}", source
  cb()

generateExpressTest = (cb) ->

  # generate the JS file bundling all the tests

  proc = spawn 'coffee', ['./src/command_line.coffee', './test/cases', '-o', './test/express3/public/javascripts/test_cases.js']
  proc.stderr.on 'data', (buffer) -> console.log buffer.toString()
  proc.stdout.on 'data', (buffer) -> console.log buffer.toString()
  proc.on 'exit', (status) ->
    process.exit(1) if status isnt 0
    cb() if typeof cb is 'function'

  # generate an index page that tests them all

  test_page = """
  <html>
    <head>
      <title>Test Toffee in the browser</title>
      <script type="text/javascript" src="/javascripts/test_cases.js"></script>
      <style>
        .test_case {font-size:10px; font-family:courier new;}
        .server_output, .script_output, .expected_output {padding:10px;float:left;width:300px;border:1px solid #eee;}
      </style>
    </head>
    <body>
  """

  case_dirs = fs.readdirSync "./test/cases/"

  for dir in case_dirs
    if dir isnt "custom_escape" # a special case since this isn't actually JSON
      expected_output = fs.readFileSync "./test/cases/#{dir}/output.toffee", "utf8"
      if path.existsSync "./test/cases/#{dir}/vars.js"
        vars     = fs.readFileSync "./test/cases/#{dir}/vars.js", "utf8"
      else
        vars     = "{}"
      rid = Math.floor 100000 * Math.random()
      test_page += """
        \n\n\n<!-- ************ #{dir} -->
        <div class="test_case">
          <div class="server_output">\#{partial '../../cases/#{dir}/input.toffee', #{vars}}</div>
          <!-- -->
          <div class="expected_output">#{expected_output}</div>
          <!-- -->
          <div class="script_output" id="#{rid}">
          </div>
          <!-- -->
          <div style="clear:both;"></div>
        </div>
        <script type="text/javascript">
          var script_res = toffee.templates["/#{dir}/input.toffee"].pub(#{vars});
          document.getElementById("#{rid}").innerHTML = script_res;
        </script>
        \n\n\n
      """

  test_page += """
    </body>
  </html>
  """
  fs.writeFileSync "./test/express3/views/index.toffee", test_page, "utf8"