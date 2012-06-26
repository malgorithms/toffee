node-cojo
=========
an express 3.x templating language based on coffeescript with slicker tokens

status
======
super pre-alpha. don't use this

performance
===========
- drop string concat in favor of array pushing and join 

todo
======
- state row should have mode and line number isntead of just "COJO" or "COFFEE"
- make this thing work as compiled output JS, not just node
- escape functions
- get string escaping working in case something has triple quotes
- add to unit tests
- command line version, like max's
- get error checking working
	 - template errors
	 - runtime errors
- get cache options as parameters available
- meaningful errors (line numbers!)