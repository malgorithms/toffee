TOFFEE
=========
A templating language based on CoffeeScript with slick nesting, tokens, and automatic indentation.
Compatible with Express 2.x, 3.x, and the browser. In Express 3.x, the Toffee engine handles partials/includes 
and smart view caching.

status
======
Beta and in pretty good shape.

examples
========
Printing variables is easy. If it fits on one line, use CoffeeScript's #{} syntax:
```
<p>
   Hey, #{user.name}. 
   #{flirty_welcome_msg}
</p>
```

Which of course is very powerful, even if you want to get crazy:
```
You have #{(f for f in friends when f.gender is "f").length} female friends.
```

But real pleasure arises when switching between `coffee` mode and `toffee` mode:
```
{#
   if projects.length
    for project in projects {:
      <div>
        <a href="#{project.url}">#{project.name}</a>
        <p>#{project.description}</p>
      </div>
    :}
#}
```

To enter coffee mode, use a block of this form: `{# ... #}`. Inside a region of coffee,
you can switch back to toffee with `{: ... :}`. This syntax is nestable and avoids a lot of large, ugly regions, such
as `<% end %>`. Compare:

EJS
```
<% for(var i=0; i<supplies.length; i++) {%>
   <li><%= supplies[i] %></li>
<% } %>
```

TOFFEE, so elegant.
```
{# 
  for supply in supplies {:<li>#{supply}</li>:} 
#}
```

Or, using the built-in print:
```
{# 
  for supply in supplies 
    print "<li>#{supply}</li>"
#}
```


Nesting is both natural and healthy. In a `{: toffee :}` block, 
simply create another '{# coffee #}` block, and indentation is inferred.

```
{#
   for name, info of friends when info.age < 21 {:
      You know, #{name} would make a great designated driver.
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
By default, when you enter `{: ... :}`, the Toffee compiler assumes you're entering an indented region, 
probably because of a loop or conditional. 
If you ever want to cut into toffee mode without indenting, use `-{: ... :}`. For example:

```
{#
   name = "Chris"
   -{:name:}
#}
```

The above is identical to 

```
{#
   name = "Chris"
   print name
#}
```


Questions
========

How does it compare to eco?
--------------------------
Eco is another CoffeeScript templating language and inspiration for Toffee.
The syntaxes are pretty different, so pick the one you prefer.

ECO
```
<% if @foo: %>
  Bar
<% end %>
```

TOFFEE
```
{# 
  if @foo {: Bar :} 
#}
```

Toffee allows multiple lines of CoffeeScript without tagging them all. Compare:

ECO
```
<% if @projects.length: %>
  <% for project in @projects: %>
    <% if project.is_active: %>
      <p><%= project.name %> | <%= project.description %></p>
    <% end %>
  <% end %>
<% end %>
```

TOFFEE
```
{#
   if @projects.length
    for project in @projects
      if project.is_active {:
        <p>#{project.name} | #{project.description}</p>
      :}
#}
```

Note that with Toffee's syntax, since brackets enclose regions not directives, your editor 
will let you collapse and expand sections of code. And if you click on one of the brackets in most
editors, it will highlight the matching bracket.

Eco has a nice auto-escaping feature. If you want to escape for HTML, URL's, or JS in Toffee, 
you can do that with a function of your choice.

Does it find line numbers in errors?
-----------------------------------
Yes, it does a very good job of that. There are 3 possible places you can hit an error in Toffee: 
 * in the language itself, say a parse error
 * in the CoffeeScript, preventing it from compiling to JS
 * runtime, in the final JS

Stack traces are converted to lines in Toffee and show you where the problem is.

Does it support partials?
-------------------------
Yes.  In Express 2.0, Express is responsible for partials. In Express 3.0, Toffee defines the `partial` function, and it 
works as you'd expect. 

```html
<div>#{partial 'foo.toffee', {name: "Chris"}</div>
```

Or inside a region of CoffeeScript, you can print or capture the result of a partial.
```html
<div>
{#
   if session
      print partial 'user_menu.toffee', info: session.info
   else
      print partial 'guest_menu.toffee'
#}
</div>
```

Like Express's `partial` function, Toffee's function passes websrv-published vars to the child template.
For example, in the above code, "session" would also be available the user_menu.toffee file. If you don't want this to be available,
in Express 3.0 you can use Toffee's `snippet` function, which sandboxes it:

```
{#
   if session
      print partial 'user.toffee', info: session.info # session will also be passed
      print snippet 'user.toffee', info: session.info # session will not be passed
#}
```

Another Express 3.0 improvement: Toffee compiles and caches templatess
for bursts that you control. It's high performance without the need to restart your production webserver when
you make a content change.


But how does the indentation work?
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

known issues
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

3. There's a case or two where line numbers aren't right.

command-line
============
Soon I'll have browser compilation working. I'd like partials and everything to work before I release this. In the meantime, if you're
curious to see the CoffeeScript that's compiled from a template:

```
toffee -c foo.toffee
```

Or to see it in JS:
```
toffee foo.toffee
```

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
- stack trace conversion improvement
- support multi-line #{} statements or prevent users from entering them with parser error
