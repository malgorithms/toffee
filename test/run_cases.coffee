{engine} = require '../lib/engine'
fs       = require 'fs'
path     = require 'path'

e = new engine({
  verbose:           false
  prettyPrintErrors: false
})

run_case_dir = (dir, cb) ->
  expected = fs.readFileSync "#{dir}/output.toffee", "utf8"
  if path.existsSync "#{dir}/vars.js"
    vars     = fs.readFileSync "#{dir}/vars.js", "utf8"
    vars     = eval "(#{vars})"
  else
    vars     = {}
  d = Date.now()
  e.run "#{dir}/input.toffee", vars, (err, res) ->
    time_ms = Date.now() - d
    if err
      cb err, time_ms
    else
      if res isnt expected
        cb "Failure in case #{dir}." +
          "\n\nExpected\n=====\n#{expected}\n=====" +
          "\nGot\n=====\n#{res}\n=====\n", time_ms
      else
        cb null, time_ms

run_all_case_dirs = (cb) ->
  time_ms = 0
  case_dirs = fs.readdirSync "#{__dirname}/cases/"
  countdown = case_dirs.length
  for dir in case_dirs
    run_case_dir "#{__dirname}/cases/#{dir}", (err, ms) ->
      countdown--
      time_ms += ms
      if err
        console.log err
        process.exit 1
      if countdown is 0
        cb null, time_ms, case_dirs.length

run_all_case_dirs (err, time, tests_run) ->

  console.log "SUCCESS for #{tests_run} cold tests in #{time}ms"

  times       = []
  speed_runs  = 20
  countdown   = speed_runs 
  total_time  = 0
  total_tests = 0
  for i in [0...speed_runs]
    run_all_case_dirs (err, time, tests_run) ->
      countdown--
      total_time += time
      total_tests += tests_run
      if countdown is 0
        console.log "SUCCESS for #{total_tests} hot tests in #{total_time}ms. #{total_time / total_tests}ms/test"        
  process.exit 0