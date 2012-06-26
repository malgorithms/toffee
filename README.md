TOFFEE
=========
an express 2.x, 3.x, and browser templating language based on coffeescript with slicker tokens and automatic space sensing.

status
======
Early beta. Don't use this unless you work at OkCupid.

examples
========
Printing variables is easy. Just use CoffeeScript's #{} syntax:
```
<p>Hello, #{user.name}</p>
```

Which of course is very powerful, if you want to get crazy:
```
You have #{(x for x in friends when x.g is "f").length} female friends.
```

But the real power comes froms from switching between `coffee` mode and `toffee` mode:
```
{#
   if @projects.length
    for project in @projects {:
      <a href="#{project.url}">#{project.name}</a>
      <p>#{project.description}</p>
    :}
   else {:No projects:}
#}
```

Elegant nesting support is a very important part of Toffee:
```
{#
   for name, info of friends when info.age < 21 {:
      #{name} would make a great designated driver.
      {#
         info.cars.sort (a,b) -> b.speed - a.speed
         if info.cars.length {: You sould probably take the #{info.cars[0]} :}
         else {: But she has no wheels. :}
      #}      
   :}
#}
```


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