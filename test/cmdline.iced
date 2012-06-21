{engine} = require '../lib/engine'
fs       = require 'fs'

e = new engine()
locals = 
  age  : 35
  arr  : [1,2,3,4] 
  name : "Chris Coyne"

await e.run process.argv[2], locals, defer err, res
  
console.log "-------res--"
console.log res
console.log "-------/res--"
console.log "-------err--"
console.log err
console.log "-------/err--"
