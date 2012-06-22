{engine} = require '../lib/engine'
fs       = require 'fs'

e = new engine()

run_case_dir = (dir, cb) ->
  expected = fs.readFileSync "#{dir}/output.cojo", "utf8"
  vars     = fs.readFileSync "#{dir}/vars.json", "utf8"
  vars     = JSON.parse vars
  await e.run "#{dir}/input.cojo", vars, defer err, res
  if err
    cb err
  else
    if res isnt expected
      cb "Failure in case #{dir}." +
        "\n\nExpected\n=====\n#{expected}\n=====" +
        "\nGot\n=====\n#{res}\n=====\n" 
    else
      cb null

case_dirs = fs.readdirSync 'cases/'
for dir in case_dirs
  console.log "Running case #{dir}"
  await run_case_dir "cases/#{dir}", defer err
  if err
    console.log err
    process.exit 1

console.log "SUCCESS!"
