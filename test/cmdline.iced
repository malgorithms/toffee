{engine} = require '../lib/engine'
fs       = require 'fs'

e = new engine()
d = Date.now()
for i in [0...100]
  await e.run process.argv[2],
    name : "Chris Coyne"
    age  : 35
    arr  : [1,2,3,4] 
  , defer err, res
  await setTimeout defer(), 0
  
console.log Date.now() - d
console.log "----------"
console.log res