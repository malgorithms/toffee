fs = require 'fs'

obj = 
  name:         "toffee"
  description:  """an express 3.x templating language based on coffeescript with slicker tokens."""
  version:      "0.0.7"
  directories:  {"lib" : "./lib"}
  main:         "index.js"
  author:       "Chris Coyne <ccoyne77@gmail.com>"
  bin:          "./bin/toffee"
  dependencies:
    "coffee-script"      : "1.3.3"
  repository:
    type: "git"
    url:  "http://github.com/malgorithms/toffee"
  devDependencies:
    "iced-coffee-script" : "1.3.1a"
  licenses: [
    {
      type: "MIT"
      url:  "http://github.com/malgorithms/node-toffee/raw/master/LICENSE"
    }
  ]

await fs.writeFile './package.json', JSON.stringify(obj, null, " "), defer err, res