{spawn, exec}          = require 'child_process'
fs                     = require 'fs'
path                   = require 'path'
coffee                 = require 'coffee-script'


generateExpressTest = (cb) ->

  proc = spawn 'coffee', ['./src/command_line.coffee', '-n', '-m', './test/cases', '-o', './test/express3/public/javascripts/test_cases.js']
  proc.stderr.on 'data', (buffer) -> console.log buffer.toString()
  proc.stdout.on 'data', (buffer) -> console.log buffer.toString()
  proc.on 'exit', (status) ->
    if status isnt 0
      console.log "Error running command line. #{status}"
      process.exit 1
    cb() if typeof cb is 'function'

  {getCommonHeadersJs}   = require '../lib/view'
  headers = getCommonHeadersJs true, true
  fs.writeFileSync "./test/express3/public/javascripts/toffee.js", headers, "utf8"

  # generate an index page that tests them all

  test_page = """
  <html>
    <head>
      <title>Testing Toffee in the Browser</title>
      <script type="text/javascript" src="/javascripts/toffee.js"></script>
      <script type="text/javascript" src="/javascripts/test_cases.js"></script>
      <script type="text/javascript" src="/javascripts/jquery-1.9.0.min.js"></script>
      <script>
        $(function() {
          $('.test_case').each(function() {
            var el = $(this);
            el.find('.server_output, .script_output').each(function () {
              if ($(this).html() == el.find('.expected_output').html()) {
                $(this).addClass("success").removeClass("fail");
              }
            });
          });
        })
      </script>
      <style>
        .test_case {font-size:10px; font-family:courier new;}
        .test_cell, .server_output, .script_output, .expected_output {padding:10px;border:1px solid #eee;}
        .fail { background-color:#ffaaaa; }
        .success { background-color:#ccffcc; }
      </style>
    </head>
    <body>
      <table>
        <tr><th>FILE</th><th>EXPECTED OUTPUT</th><th>SERVER RENDER</th><th>BROWSER RENDER</th></tr>
  """

  case_dirs = fs.readdirSync "./test/cases/"

  for dir,i in case_dirs
    expected_output = fs.readFileSync "./test/cases/#{dir}/output.toffee", "utf8"
    if fs.existsSync "./test/cases/#{dir}/vars.coffee"
      coffee_vars = fs.readFileSync "./test/cases/#{dir}/vars.coffee", "utf8"
      js_vars     = coffee.compile(coffee_vars, {bare: true}).replace(/;[ \n]*$/,'')
    else if fs.existsSync "./test/cases/#{dir}/vars.js"
      coffee_vars = fs.readFileSync "./test/cases/#{dir}/vars.js", "utf8"
      js_vars     = coffee_vars;
    else
      if dir == "render_no_args"
        coffee_vars = ""
        js_vars     = ""
      else
        coffee_vars = "{}"
        js_vars     = "{}"
    rid = i
    test_page += """
      \n\n\n<!-- ************ #{dir} -->
      <tr class="test_case">
        <td class="test_cell">#{dir}</td>
        <td class="expected_output" id="expected_#{rid}">#{expected_output}</td>
        <td class="server_output fail" id="server_#{rid}">\#{partial '../../cases/#{dir}/input.toffee', #{coffee_vars}}</td>
        <td class="script_output fail" id="browser_#{rid}"></td>
      </tr>
      <script type="text/javascript">
        var script_res = toffee.templates["/#{dir}/input.toffee"].render(#{js_vars});
        $("#browser_#{rid}").html(script_res);
      </script>
      \n\n\n
    """             

  test_page += """
    </table>
    </body>
  </html>
  """
  fs.writeFileSync "./test/express3/views/index.toffee", test_page, "utf8"

exports.generate = generateExpressTest

