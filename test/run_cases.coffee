{engine} = require '../lib/engine'
fs       = require 'fs'
path     = require 'path'

regular_engine = new engine({
  verbose:           false
  prettyPrintErrors: false
})

minimized_engine = new engine({
  verbose:           false
  prettyPrintErrors: false
  minimize:          true
})

# ---------------------------------------------------------------

run_case_dir = (eng, dir, cb) ->
  expected = fs.readFileSync "#{dir}/output.toffee", "utf8"
  existsSync = if path.existsSync? then path.existsSync else fs.existsSync
  if existsSync "#{dir}/vars.js"
    vars     = fs.readFileSync "#{dir}/vars.js", "utf8"
    vars     = eval "(#{vars})"
  else
    vars     = {}
  d = Date.now()
  eng.run "#{dir}/input.toffee", vars, (err, res) ->
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

run_all_case_dirs = (eng, cb) ->
  time_ms = 0
  case_dirs = fs.readdirSync "#{__dirname}/cases/"
  countdown = case_dirs.length
  for dir in case_dirs
    run_case_dir eng, "#{__dirname}/cases/#{dir}", (err, ms) ->
      countdown--
      time_ms += ms
      if err
        console.log err
        process.exit 1
      if countdown is 0
        cb null, time_ms, case_dirs.length

run_multiple_runs = (eng, num_runs, cb) ->
  times       = []
  countdown   = num_runs
  total_time  = 0
  total_tests = 0
  for i in [0...num_runs]
    run_all_case_dirs regular_engine, (err, time, tests_run) ->
      countdown--
      total_time += time
      total_tests += tests_run
      if countdown is 0
        cb null, total_time, total_tests

# ----------------------------------------------------------------

run_all_case_dirs regular_engine, (err, time, tests_run) ->
  console.log "Regular Engine: SUCCESS for #{tests_run} cold tests in #{time}ms (#{(time/tests_run).toFixed 2}ms/test)"
  run_multiple_runs regular_engine, 30, (err, time, tests_run) ->
    console.log "Regular Engine: SUCCESS for #{tests_run} hot tests in #{time}ms (#{(time/tests_run).toFixed 2}ms/test)"
    run_all_case_dirs minimized_engine, (err, time, tests_run) ->
      console.log "Minimized (browser) Engine: SUCCESS for #{tests_run} cold tests in #{time}ms (#{(time/tests_run).toFixed 2}ms/test)"
      run_multiple_runs minimized_engine, 30, (err, time, tests_run) ->
        console.log "Minimized (browser) Engine: SUCCESS for #{tests_run} hot tests in #{time}ms (#{(time/tests_run).toFixed 2}ms/test)"
        process.exit 0