require 'iced-coffee-script/register'
{spawn, exec}          = require 'child_process'
fs                     = require 'fs'
jison                  = require 'jison'
path                   = require 'path'
express_test           = require './test/generate_express_test'

task 'build', 'build the whole jam', (cb) ->
  console.log "Building"
  files = fs.readdirSync 'src'
  files = ('src/' + file for file in files when file.match(/\.coffee$/))
  clearLibJs ->
    buildParser ->
      runCoffee ['-c', '-o', 'lib/'].concat(files), ->
        runCoffee ['-c', 'index.coffee'], ->
          buildCommonBrowserHeaders ->
            express_test.generate ->
              console.log "Done building."
              cb() if typeof cb is 'function'

task 'test', 'test server and browser support', (cb) ->
  run_cases = require './test/run_cases.iced'
  run_cases.test ->
    console.log "Done."

runCoffee = (args, cb) ->
  console.log args
  proc =  spawn 'coffee', args
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

buildCommonBrowserHeaders = (cb) ->
  {getCommonHeadersJs}   = require './lib/view'
  headers = getCommonHeadersJs true, true
  fs.writeFileSync "./toffee.js", headers, "utf8"
  cb()
