fs = require 'fs'

obj = 
  name:         "toffee"
  description:  """An Express 3.x and 2.x templating language based on CoffeeScript with slicker tokens and syntax. Built at OkCupid."""
  version:      "0.0.18"
  directories:  {"lib" : "./lib"}
  main:         "index.js"
  author:       "Chris Coyne <ccoyne77@gmail.com>"
  bin:          "./bin/toffee"
  dependencies:
    "coffee-script"      : "1.3.3"
  repository:
    type: "git"
    url:  "http://github.com/malgorithms/toffee"
  licenses: [
    {
      type: "MIT"
      url:  "http://github.com/malgorithms/toffee/raw/master/LICENSE"
    }
  ]

fs.writeFile './package.json', JSON.stringify(obj, null, " "), (err, res) ->
  console.log "package.json written."