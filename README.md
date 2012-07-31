TOFFEE
=========
A templating language based on the simplicity and beauty of CoffeeScript.
Compatible with node (including Express 2.x, 3.x) and, very soon, the browser. In Express 3.x, the Toffee engine handles partials/includes 
and smart view caching.

status
======
Beta! And usable! If you hit any snags, let me know and I'll act fast.

examples
========
Printing variables is easy. Just use CoffeeScript's #{} syntax:
```html
<div class="so_classy">
   Hey, #{user.name}. 
   #{flirty_welcome_msg}
</div>
```

The `#{}` syntax is powerful, so be responsible.

```html
<p>
  You have #{(f for f in friends when f.gender is "f").length} female friends.
</p>
```

Including other files is possible thanks to the function `partial`. This works in Express 3.0, too.

```html
<p>
   #{partial "navigation.toffee", {username: user.name, age: 22} }
</p>
```

But the greatest pleasure arises when you enter
`coffee mode`. Note the `{# ... #}` region.

```html
<p>
  {#
    ten_numbers = (Math.random() for i in [0...10])
    ten_numbers.sort (a,b) -> b - a
  #}
  The largest number I can even think of is #{ten_numbers[0]}.
</p>
```

Further, inside `coffee mode`, you can switch back to `toffee mode` with `{: ... :}`. It's endlessly nestable.

```html
<div class="foobar">
 <div class="whatever">
  {#
     if projects.length
      for project in projects {:
        <div>
          <a href="#{project.url}">Read more</a>
        </div>
      :}
  #}
 </div>
</div>
```

This bracket and nesting syntax avoids a lot of large, ugly regions, such
as EJS's unsavory and unethical `<% } %>`. Compare:

EJS, verbose and weak.
```
<% for(var i=0; i<supplies.length; i++) {%>
   <li><%= supplies[i] %></li>
<% } %>
```

TOFFEE, so elegant and proud.
```html
{# 
  for supply in supplies {:<li>#{supply}</li>:} 
#}
```

Or, using the built-in `print`:
```html
{# 
  for supply in supplies 
    print "<li>#{supply}</li>"
#}
```

These are slightly different, as `print` outputs raw text, while `#{}` used in toffee mode safely escapes for HTML. This escaping
is customizable. More on that below.

With nested code, indentation is inferred. 

```html
{#
   for name, profile of friends when profile.is_responsible {:
      <p>
        You know, #{name} would make a great designated driver.
        And she only lives #{profile.distance}km away.
        {#
           profile.cars.sort (a,b) -> b.speed - a.speed
           if profile.cars.length {: And wow, she drives a #{profile.cars[0].model} :}
           else                   {: But, alas, she has no wheels. :}
        #}
      </p>
   :}
#}
```

Switching to toffee mode without indenting
-----
By default, when you enter `{: ... :}`, the Toffee compiler assumes you're entering an indented region, 
probably because of a loop or conditional. 
If you ever want to cut into toffee mode without indenting, use `-{: ... :}`. For example:

```
{#
   name = "Hans Gruber"
   -{:You're a hell of a thief, #{name}:}
#}
```

The above is identical to:

```
{#
   name = "Hans Gruber"
   print "You're a hell of a thief, #{name}"
#}
```

Well, it's not exactly identical.  Let's talk about escaping.


escaping: how it works
==============
In your CoffeeScript, the `print` function lets you print the raw value of a variable:

```
{#
  danger_code = "<script>alert('Eat a bag.');</script>"
  print danger_code
#}
```

But in toffee mode, `#{some_expression}` output is escaped intelligently by default:

```html
<!-- escapes the HTML -->
<p>#{danger_code}</p>
```

You can control the escaping, but here are the defaults: 

 * if it's a string or scalar, it is escaped for HTML safety.
 * it's an array or object, it is converted to JSON.

escaping overrides
----------------

You can bypass the above rules.

 * `#{json foo}`: this outputs foo as JSON.
 * `#{raw foo}`: this outputs foo in raw text.
 * `#{html foo}`: this outputs foo, escaped as HTML. For a scalar, it's the same as `#{foo}`, but it's available in case you 
(1) override the default escaping or (2) turn off auto-escaping (both explained below).
 * `#{partial "foo.toffee"}` and `#{snippet "foo.toffee"}`: unescaped, since you don't want to escape your own templates

When any of the functions mentioned above are leftmost in a `#{}` token in toffee mode, their output is left untouched by the 
built in escape function.

These functions are also available to you in coffee mode.

```html
<p>
	Want to read some JSON, human?
	{#
	   foo = [1,2,3, {bar: "none"}]
	   foo_as_json_as_html = html json foo
	   print foo_as_json_as_html
	#}
</p>
```

*Note!*  if you pass a variable to the template called `json`, `raw`, or `html`, Toffee won't create these helper functions, which would override your vars.
In this case, you can access the escape functions through their official titles, `__toffee.raw`, etc.

Overriding the default `escape`:
 * If you pass a variable to your template called `escape`, this will be used as the default escape. In toffee mode, everything inside `#{}` that isn't subject to an above-mentioned exception will go through your `escape` function.

Turning off autoescaping entirely:
 * If you set `autoEscape: false` when creating the engine, the default will be raw across your project. (See more on that below under Express 3.x settings.)
 * Alternatively, you could pass the var `escape: (x) -> x` to turn off escaping for a given template.

questions
========

How does it compare to eco?
--------------------------
Eco is another CoffeeScript templating language and inspiration for Toffee.
The syntaxes are pretty different, so pick the one you prefer.

One big Toffee advantage: multiple lines of CoffeeScript just look like CoffeeScript. Compare:

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
```html
{#
   if @projects.length
    for project in @projects
      if project.is_active {:
        <p>#{project.name} | #{project.description}</p>
      :}
#}
```

With Toffee's syntax, brackets enclose regions not directives, so your editor 
will let you collapse and expand sections of code. And if you click on one of the brackets in most
editors, it will highlight the matching bracket.

Does it cache templates?
------------------------
In Express 2.0, that's up to Express. When used in Express 3.0, Toffee asynchronously monitors known templates and recompiles them in the background when necessary. So you don't need to restart your production webserver whenever you edit a template.

Does it find line numbers in errors?
-----------------------------------
Yes, Toffee does a very good job of that. There are 3 possible places you can hit an error in Toffee: 
 * in the language itself, say a parse error
 * in the CoffeeScript, preventing it from compiling to JS
 * runtime, in the final JS

Stack traces are converted to lines in Toffee and show you where the problem is. 
By default when Toffee hits an error it replies with some pretty-printed HTML showing you the problem. 
This can be overridden, as explained below in the Express 3.0 section.

Does it support partials? (a.k.a includes)
-------------------------
Yes.  In Express 2.0, Express itself is responsible for including other files, and they call this system "partials." In Express 3.0, Toffee defines the `partial` function, and it 
works as you'd expect. 

```html
<div>#{partial '../foo/bar.toffee', name: "Chris"}</div>
```

Inside a region of CoffeeScript, you can print or capture the result of a partial.
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

Like Express's `partial` function, Toffee's function passes all available vars to the child template.
For example, in the above code, `session` would also be available in the user_menu.toffee file. If you don't want this scoping, use Toffee's `snippet` function, which sandboxes it:

```
{#
   if session
      print partial 'user.toffee', info: session.info # session will also be passed
      print snippet 'user.toffee', info: session.info # session will not be passed
#}
```

Does it support `layout`?
-------------------------
Yes, this works in Express 3.0, emulating the Express 2.0 way. If you publish a file `foo.toffee` and pass a `layout` filename to it as a var, `foo.toffee` is rendered, and the results are put into
a var called `body`. Then your layout is rendered, using all your vars plus the new `body` var.


How does the indentation work?
-----
Toffee realigns all your coffeescript inside a `{# region #}` by normalizing the indentation of that region.
So it doesn't matter how you indent things, as long as it makes local sense inside that region. 

For example, these are all identical:

```html
<p>{# if x is 0 {:Yay!:} else  {:Burned:} #}</p>
```

```html
<p>{# 
  if x is 0 {:Yay!:} else {:Burned:}
#}</p>
```

```html
<p>
{# 
             if x is 0 {:Yay!:}
             else      {:Burned:}
#}</p>
```

However, this would cause an error:

ERROR
```html
<p>
{# 
             if x is 0 {:Yay!:}
               else      {:Burned:}
#}</p>
```

As would this more subtle case:

ERROR
```html
<p>
{#   if x is 0 {:Yay!:}
     else      {:Burned:}
#}</p>
```

In the above 2 cases, note that the leading whitespaces before the `if` and `else` are different, which is a CoffeeScript error.




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

Pretty-print errors
-----

Express's default error page is great for stack traces but not so great for pretty-printing template errors.
So by default, when Toffee hits any kind of error (in your templates, in your CoffeeScript, or even at runtime), 
it fakes an okay result by returning some pretty HTML showing the error. If you don't like this - say you want to catch render errors - 
you can turn it off.

```
toffee = require 'toffee'
toffee.expressEngine.prettyPrintErrors = false
```

Turning off auto-escaping for HTML
---------
By default, Toffee escapes `#{}` output for HTML. You can turn this off in your engine with:
```
toffee = require 'toffee'
toffee.expressEngine.autoEscape = false
```


known issues
===============
1. comments in `{## ##}` cannot contain other toffee code. Hope to have this fixed soon, as these tokens should
be useful for temporarily commenting off a region of a template.

3. There's a case where line numbers aren't right.

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
- continue to add to unit tests
- stack trace conversion improvement
