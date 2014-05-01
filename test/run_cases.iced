{engine} = require '../lib/engine'
fs       = require 'fs'
path     = require 'path'
zombie   = require 'zombie'
coffee   = require 'coffee-script'
tablify  = require 'tablify'

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

MULTI_RUNS = 50

file_cache = {}

# ---------------------------------------------------------------

read_file_sync = (fname) ->
  if not file_cache[fname]?
    file_cache[fname] = fs.readFileSync fname, "utf8"
  return file_cache[fname]

# ---------------------------------------------------------------

run_case_dir = (eng, dir, cb) ->
  start = Date.now()
  expected = read_file_sync "#{dir}/output.toffee"
  existsSync = if path.existsSync? then path.existsSync else fs.existsSync
  if existsSync "#{dir}/vars.coffee"
    txt     = read_file_sync "#{dir}/vars.coffee"
    vars    = coffee.compile(txt, {bare: true})
    vars    = eval "#{vars}"
  else if existsSync "#{dir}/vars.js"
    vars     = read_file_sync "#{dir}/vars.js"
    vars     = eval "(#{vars})"
  else
    vars     = {}
  vars["rand_#{Math.random()}"] = ("foo" for i in [0...(~~(20000*Math.random()))]).join ""
  await eng.run "#{dir}/input.toffee", vars, defer err, res
  time_ms = Date.now() - start
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
  start = Date.now()
  case_dirs = fs.readdirSync "#{__dirname}/cases/"
  for dir in case_dirs
    await run_case_dir eng, "#{__dirname}/cases/#{dir}", defer err, ms
    if err
      console.log err
      process.exit 1
  cb null, (Date.now() - start), case_dirs.length

run_multiple_runs = (eng, num_runs, cb) ->
  total_tests = 0
  start       = Date.now()
  for i in [0...num_runs]
    await setTimeout defer(), 1
    await run_all_case_dirs regular_engine, defer err, time, tests_run
    total_tests += tests_run
  cb null, (Date.now() - start), total_tests

run_express_test = (cb) ->
  require('./express3/app').run ->
    zombie.visit 'http://localhost:3033', (e, browser) ->
      if e
        console.log e
      $ = browser.window.$
      successes = $('.success').length
      fails     = $('.fail').length
      if (fails is 0) and (successes > 0)
        console.log "Express SUCCESS: #{successes} succeeded, #{fails} failed"
        return cb()
      console.log "BROWSER ERROR! Server left running at http://localhost:3033 for your convenience"

# ----------------------------------------------------------------
go = ->
  await run_all_case_dirs regular_engine, defer err, time, tests_run
  console.log "Regular Engine:             SUCCESS for #{tests_run} cold tests in #{time}ms (#{(time/tests_run).toFixed 2}ms/test)"
  await run_multiple_runs regular_engine, MULTI_RUNS, defer err, time, tests_run
  console.log "Regular Engine:             SUCCESS for #{tests_run} hot tests in #{time}ms (#{(time/tests_run).toFixed 2}ms/test)"
  await run_all_case_dirs minimized_engine, defer err, time, tests_run
  console.log "Minimized (browser) Engine: SUCCESS for #{tests_run} cold tests in #{time}ms (#{(time/tests_run).toFixed 2}ms/test)"
  await run_multiple_runs minimized_engine, MULTI_RUNS, defer err, time, tests_run
  console.log "Minimized (browser) Engine: SUCCESS for #{tests_run} hot tests in #{time}ms (#{(time/tests_run).toFixed 2}ms/test)"
  await run_express_test defer()
  process.exit 0

if not module.parent?
  go()

else exports.test = go
