{spawn, exec}          = require 'child_process'
fs                     = require 'fs'
jison                  = require 'jison'
path                   = require 'path'

task 'build', 'build the whole jam', (cb) ->  
  console.log "Building"
  files = fs.readdirSync 'src'
  files = ('src/' + file for file in files when file.match(/\.coffee$/))
  clearLibJs ->
    buildParser ->
      runCoffee ['-c', '-o', 'lib/'].concat(files), ->
        runCoffee ['-c', 'index.coffee'], ->
          buildCommonHeaders ->
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

buildCommonHeaders = (cb) ->
  {getCommonHeadersJs}   = require './lib/view'
  headers = getCommonHeadersJs true, true
  fs.writeFileSync "./toffee.js", headers, "utf8"
  cb()

generateExpressTest = (cb) ->

  # generate the JS file bundling all the tests

  proc = spawn 'coffee', ['./src/command_line.coffee', '-n', '-m', './test/cases', '-o', './test/express3/public/javascripts/test_cases.js']
  proc.stderr.on 'data', (buffer) -> console.log buffer.toString()
  proc.stdout.on 'data', (buffer) -> console.log buffer.toString()
  proc.on 'exit', (status) ->
    process.exit(1) if status isnt 0
    cb() if typeof cb is 'function'

  {getCommonHeadersJs}   = require './lib/view'
  headers = getCommonHeadersJs true, true
  fs.writeFileSync "./test/express3/public/javascripts/toffee.js", headers, "utf8"

  # generate an index page that tests them all

  test_page = """
  <html>
    <head>
      <title>Test Toffee in the browser</title>
      <script type="text/javascript" src="/javascripts/toffee.js"></script>
      <script type="text/javascript" src="/javascripts/test_cases.js"></script>
      <style>
        .test_case {font-size:10px; font-family:courier new;}
        .test_cell, .server_output, .script_output, .expected_output {padding:10px;border:1px solid #eee;}
      </style>
    </head>
    <body>
      <table>
        <tr><th>FILE</th><th>EXPECTED OUTPUT</th><th>SERVER RENDER</th><th>BROWSER RENDER</th></tr>
  """

  case_dirs = fs.readdirSync "./test/cases/"

  for dir,i in case_dirs
    if dir isnt "custom_escape" # a special case since this isn't actually JSON
      expected_output = fs.readFileSync "./test/cases/#{dir}/output.toffee", "utf8"
      if path.existsSync "./test/cases/#{dir}/vars.js"
        vars     = fs.readFileSync "./test/cases/#{dir}/vars.js", "utf8"
      else
        vars     = "{}"
      rid = i
      test_page += """
        \n\n\n<!-- ************ #{dir} -->
        <tr class="test_case">
          <td class="test_cell">#{dir}</td>
          <td class="expected_output" id="expected_#{rid}">#{expected_output}</td>
          <!-- -->
          <td class="server_output" id="server_#{rid}">\#{partial '../../cases/#{dir}/input.toffee', #{vars}}</td>
          <!-- -->
          <td class="script_output" id="browser_#{rid}"></td>
          <!-- -->
        </tr>
        <script type="text/javascript">
          var gbid = function(x) {return document.getElementById(x); }
          var script_res = toffee.templates["/#{dir}/input.toffee"].render(#{vars});
          gbid("browser_#{rid}").innerHTML = script_res;
          if (gbid("browser_#{rid}").innerHTML == gbid("expected_#{rid}").innerHTML) { 
            gbid("browser_#{rid}").style.backgroundColor="#dfe";
          }
          else {
            gbid("browser_#{rid}").style.backgroundColor="#fcc";
          }
          if (gbid("server_#{rid}").innerHTML == gbid("expected_#{rid}").innerHTML) { 
            gbid("server_#{rid}").style.backgroundColor="#dfe";
          }
          else {
            gbid("server_#{rid}").style.backgroundColor="#fcc";
          }          
        </script>
        \n\n\n
      """

  test_page += """
    </table>
    </body>
  </html>
  """
  fs.writeFileSync "./test/express3/views/index.toffee", test_page, "utf8"