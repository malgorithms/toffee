{spawn, exec} = require 'child_process'
fs            = require 'fs'
jison         = require 'jison'
stitch        = require 'stitch'

task 'build', 'build the whole jam', (cb) ->  
  console.log "Building"
  files = fs.readdirSync 'src'
  files = ('src/' + file for file in files when file.match(/\.iced$/))
  clearLibJs ->
    buildParser ->
      runIced ['-I', 'inline', '-c', '-o', 'lib/'].concat(files), ->
        runIced ['-I', 'none', '-c', 'index.iced'], ->
          runIced ['package.iced'], ->
            stitchIt ->
              console.log "Done building."
              cb() if typeof cb is 'function'

runIced = (args, cb) ->
  proc =  spawn 'iced', args
  console.log args
  proc.stderr.on 'data', (buffer) -> console.log buffer.toString()
  proc.on        'exit', (status) ->
    process.exit(1) if status != 0
    cb() if typeof cb is 'function'

stitchIt = (cb) ->
  s = stitch.createPackage { paths: ['lib'] }
  s.compile (err, source) ->
    fs.writeFile 'toffee.js', source, (err) ->
      if err then throw err
      console.log "Stitched."
      cb()

clearLibJs = (cb) ->
  files = fs.readdirSync 'lib'
  files = ("lib/#{file}" for file in files when file.match(/\.js$/))
  fs.unlinkSync f for f in files
  cb()

buildParser = (cb) ->
  grammar   = fs.readFileSync './lang/toffee.jison', 'utf8'
  generator = new jison.Generator grammar
  file_name = "toffee_lang.js"
  source    = generator.generate {
    moduleType: 'commonjs'
    moduleName: 'toffee_lang'
  }
  fs.writeFileSync "./lib/#{file_name}", source
  cb()