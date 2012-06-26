{engine} = require '../lib/engine'
fs       = require 'fs'

e = new engine(maxCacheAge: 10000)

run_case_dir = (dir, cb) ->
  expected = fs.readFileSync "#{dir}/output.cojo", "utf8"
  vars     = fs.readFileSync "#{dir}/vars.json", "utf8"
  vars     = JSON.parse vars
  d = Date.now()
  await e.run "#{dir}/input.cojo", vars, defer err, res
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
  case_dirs = fs.readdirSync 'cases/'
  for dir in case_dirs
    await run_case_dir "cases/#{dir}", defer err, ms
    time_ms += ms
    if err
      console.log err
      process.exit 1
  cb null, time_ms, case_dirs.length

await run_all_case_dirs defer err, time, tests_run

console.log "SUCCESS for #{tests_run} cold tests in #{time}ms"

times       = []
speed_runs = 100
for i in [0...speed_runs]
  await run_all_case_dirs defer err, times[i], tests_run
total_time = 0
total_time += t for t in times
total_tests = tests_run * speed_runs
console.log "SUCCESS for #{total_tests} hot tests in #{total_time}ms. #{total_time / total_tests}ms/test"