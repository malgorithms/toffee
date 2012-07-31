{spawn, exec} = require 'child_process'
fs            = require 'fs'
jison         = require 'jison'
stitch        = require 'stitch'

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
  proc = spawn 'coffee', ['./src/command_line.coffee', './test/cases', '-o', './test/express3/public/javascripts/test_cases.js']
  proc.stderr.on 'data', (buffer) -> console.log buffer.toString()
  proc.stdout.on 'data', (buffer) -> console.log buffer.toString()
  proc.on 'exit', (status) ->
    process.exit(1) if status isnt 0
    cb() if typeof cb is 'function'