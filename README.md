node-toffee
=========
an express 2.x, 3.x, and browser templating language based on coffeescript with slicker tokens and automatic space sensing.

status
======
Early beta. Don't use this unless you work at OkCupid.

the basic idea
==============
A region inside a toffee template is in one of two modes: `toffee` or `coffee`.  Inside your coffee-script you
can put whatever coffee-script you like.

todo
======
- state row should have mode and line number isntead of just "TOFFEE" or "COFFEE"
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