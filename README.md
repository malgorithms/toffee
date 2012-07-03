TOFFEE
=========
A templating language based on CoffeeScript with slicker tokens and automatic space sensing. 
Compatible with Express 2.x, 3.x, and the browser. In Express 3.x, the Toffee engine handles partials 
and view caching (with convenient time limits). 

status
======
Beta with a few bugs. Don't use unless you work at OkCupid 
or don't mind changing syntax. At the bottom of this page you'll see a couple key language issues.

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

But real pleasure arises when switching between `coffee` mode and `toffee` mode:
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

To enter coffee mode, use a block of this form: `{# ... #}`. Inside a region of coffee,
you can switch back to toffee with `{: ... :}`. This syntax is nestable and avoids a lot of large, ugly regions, such
as `<% end %>`. Compare:

EJS
```
<ul>
<% for(var i=0; i<supplies.length; i++) {%>
   <li><%= supplies[i] %></li>
<% } %>
</ul>
```

TOFFEE
```
<ul>
  {# for supply in supplies {:<li>#{supply}</li>:} #}
</ul>
```


Nesting is a very important part of Toffee. When you're in a `{: toffee :}` block, 
feel free to create a nested '{# coffee #}` block, and indentation is inferred.

```
{#
   for name, info of friends when info.age < 21 {:
      #{name} would make a great designated driver.
      {#
         info.cars.sort (a,b) -> b.speed - a.speed
         if info.cars.length {: And she drives a #{info.cars[0].model} :}
         else                {: But she has no wheels. :}
      #}      
   :}
#}
```

Switching to pub mode without indenting
-----
By default, when you enter `{: ... :}`, the Toffee compiler assumes you're entering an indented region. 
If you ever want to cut into toffee mode without indenting, use `-{: ... :}`. For example:

```
{#
   name = "Chris"
   -{:name:}
#}
```

Questions
========

How does it compare to eco?
--------------------------
Eco is another CoffeeScript templating language. 
The syntaxes are pretty different, so pick the one you prefer. Some examples:

ECO
```
<% if @projects.length: %>
  <% for project in @projects: %>
    <a href="<%= project.url %>"><%= project.name %></a>
    <p><%= project.description %></p>
  <% end %>
<% else: %>
  No projects
<% end %>
```

TOFFEE
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

Here's the nested example, from above, in eco.

ECO
```
<% for name, info of friends when info.age < 21 : %>
  <%= name %> would make a great designated driver.
  <% info.cars.sort (a,b) -> b.speed - a.speed %>
  <% if info.cars.length : %> And she drives a <%= info.cars[0].model %>
  <% else: %> But she has no wheels
  <% end %>
<% end %>
```

One nice feature that eco has is auto-escaping output. If you want to escape for HTML, URL's, or JS in Toffee, 
you can do that with a function of your choice.

A note on indentation
-----
Toffee realigns all your coffeescript inside a `{# region #}` by normalizing the indentation of that region.
So it doesn't matter how you indent things, as long as it makes local sense inside that region. For example, these
are all identical:

```
<p>{# if x == 0 {:Yay!:} else  {:Burned:} #}</p>
```

```
<p>{# 
  if x == 0 {:Yay!:} else {:Burned:}
#}</p>
```

```
<p>
{# 
             if x == 0 {:Yay!:}
             else      {:Burned:}
#}</p>
```

However, this would cause an error:

ERROR
```
<p>
{# 
             if x == 0 {:Yay!:}
               else      {:Burned:}
#}</p>
```

As would this more subtle case:

ERROR
```
<p>
{#   if x == 0 {:Yay!:}
     else      {:Burned:}
#}</p>
```

In the above 2 cases, note that the leading whitespaces before the `if` and `else` are different.

Comments
-----
Inside a region of coffee, you can use coffee's `#` or `###` syntax to comment. 
Inside toffee mode, you can comment with `{## ... ##}`.

```
{## This isn't output ##}
But this is.
```


installation & usage
===========
```
npm install -g toffee
```

In Express 3.x to make it your default engine:
```
app.set 'view engine', 'toffee'
```

In Express 3.x to use it just for .toffee files:
```
toffee = require 'toffee'
app.engine 'toffee', toffee.__express
```

Express 2.x:
```
toffee      = require 'toffee'
app.register '.toffee', toffee
```

express 3.x options
===================

Express's default error page is very hard to read, and Toffee is capable of highlighting error lines in your 
source code. So by default, when Toffee hits any kind of error (in your templates, in your CoffeeScript, or even at runtime), 
it fakes an okay result by returning some pretty HTML showing the error. If you don't like this - say you want to catch render errors - 
you can turn it off.

```
toffee = require 'toffee'
toffee.expressEngine.prettyPrintErrors = false
```

Caching.  Toffee doesn't read from the disk every time you request a template. It compiles and caches for short periods (2 seconds, by default),
to save IO and compile time. You can set this cache, in milliseconds, anywhere from 0 to Infinity. 

You might consider different rules for production and development, although a short cache time performs well in both cases.

```
toffee = require 'toffee'
toffee.expressEngine.maxCacheAge = Infinity # infinity milliseconds, that is.
```

a couple issues
===============
1. currently `#{}` regions have to be on a single line. For example:
```
#{3 + 5}
```
...is ok. But not:
```
#{3
+ 5}
```
...which will cause an error.

2. comments in `{## ##}` cannot contain other toffee code. Hope to have this fixed soon, as these tokens should
be useful for temporarily commenting off a region of a template.

contributing
=============
I'm likely to accept good pull requests.

If you'd like to edit code for this project, note that you should always edit the `.coffee` files,
as the `.js` files as generated automatically by building.

To build
```
> cake build
```

To make sure you didn't break something
```
> coffee tests/run_cases.coffee
```

I'm also very interested in someone building a Sublime/Textmate package for Toffee.

todo
======
- finish browser-side include and command-line compiler
- ...then add instructions on how to use it
- escapeHTML, JS, etc. functions
- continue to add to unit tests
- better line numbers on errors
- support multi-line #{} statements or prevent users from entering them with parser error
