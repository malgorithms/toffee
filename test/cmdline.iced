{engine} = require '../lib/engine'
fs       = require 'fs'

e = new engine()
d = Date.now()
for i in [0...100]
  locals = 
    age  : 35
    arr  : [1,2,3,4] 
    name : "Chris Coyne"
  await e.run process.argv[2], locals, defer err, res
  await setTimeout defer(), 0
  
console.log Date.now() - d
console.log "-------res--"
console.log res
console.log "-------err--"
console.log err