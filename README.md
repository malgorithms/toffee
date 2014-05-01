TOFFEE
=========
*Toffee* is a templating language, based on the simplicity and beauty of CoffeeScript.

 * it works with Node.js
 * it works in the browser, too -- even the advanced features.

Newest feature:

 * post-processing! You can let Toffee do your server-side code highighting, and other magic.

Toffee has many cool features. Keep on reading.

Table of Contents
=================
 * [1. Language Basics](#section_1)
 * [2. Notes on Escaping](#section_2)
 * [3. Common Questions](#section_3)
 * [4. Installation & Usage (Node, Express, and the browser)](#section_4)

## <a name="section_1"></a> Language Basics

Printing variables in Toffee is easy. Just use CoffeeScript's #{} syntax:
```html
<div class="welcome">
   Hey, #{user.name}. 
   #{flirty_welcome_msg}
</div>
```

The `#{}` syntax is powerful, so be responsible.

```html
<p>
  You have #{(sheep for sheep in flock when sheep.color is 'black').length} black sheep in the flock.
</p>
```

Including other files is possible thanks to the function `partial`. This works in both Express and the browser.

```html
<p>
   #{partial "navigation.toffee", {username: user.name, age: 22} }
</p>
```

But the greatest pleasure arises when you enter
`coffee mode`. Note the `{# ... #}` region, where you can write multiple lines of CoffeeScript.


```html
<p>
  {#
    ten_numbers = [1,3,2,4,5,8,6,7,69, Math.random()]
    ten_numbers.sort (a,b) -> b - a
  #}
  The largest number I can even think of is #{ten_numbers[0]}.
</p>
```

Against all odds, inside `coffee mode`, you can switch back to `toffee mode` with `{: ... :}`. It's endlessly nestable.

```html
<div class="wrapper">
 <div class="projects">
  {#
     if projects.length
      for project in projects {:
        <div class="project">
          <a href="#{project.url}">#{project.name}</a>
        </div>
      :}
  #}
 </div>
</div>
```

This bracket and nesting syntax avoids a lot of large, ugly regions, such
as EJS's unethical `<% } %>`. It's been wrong for thousands of years
to have control markers surrounded by other control
markers, and it is still wrong.  Witness:

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

Or, using Toffee's `print`:
```html
{# 
  for supply in supplies 
    print "<li>#{supply}</li>"
#}
```

These are slightly different, as `print` outputs raw text, while `#{}` used in toffee mode safely escapes HTML or JSON. This escaping
escaping is customizable. More on that below.

With nested code, indentation of your CoffeeScript is magically maintained.

```html
{#
   if user.is_drunk
     for name, profile of friends when profile.is_responsible {:
        <p class="designated-driver-candidate">
          You know, #{name} would make a great designated driver.
          And she only lives #{profile.distance}km away.
          {#
             if profile.car? {: And wow, she drives a #{profile.car.model} :}
             else            {: But, alas, she has no wheels. :}
          #}
        </p>
    :}
#}
```

### Partials (including other files), both for output and configuration

Including other files in Toffee is easy with the `partial` function, which includes another template file.

```html
<div class="whatever">
  #{partial '../main_navigation.toffee'}
</div>
```

Shallow copies of variables are passed through from the parent document, however you can pass additional variables with a dictionary.

```html
<div class="whatever">
  #{partial '../main_navigation.toffee', {user: elon_musk, iq: 180} }
</div>
```

Again, toffee's `print` function allows you to use partials when in coffeescript mode:

```html
{#
   if user?
      print partial "logged_in_template.toffee"
#}
```

For your safety and convenience, variables are shallow-copied into a template. This means if you redefine or create a variable in a
child template, it won't be available back in the parent template. However, you can relay variables by modifying the special `passback` dictionary
in a the child template.

```html
<!-- parent doc -->
{# partial './config.toffee' #}
<p>Our site's name is #{site_name}.</p>

<!-- inside config.toffee -->
{#
   passback.site_name = "gittub.com"
#}
```

For your naming convenience, you can also use the `load` function, which is identical to `partial` but withholds output.

### Post-processing

New in the latest version of Toffee, you can pass a `postProcess` function to Toffee. This works for individual partials or even
an entire document.  The `postProcess` function performs a final transformation on your output.

One smart use of postProcess is to find anything inside triple tick marks and perform a code higlighting.

```html
{#
   print partial './something.toffee', {
      foo: 1000
      postProcess: (s) -> find_and_higlight_code_in s
   }
#}
```

You could define `find_and_highlight_code_in` anywhere in your publishing stack. You can pass it from your webserver, define it above, whatever. If you're
doing this server-side, consider the popular Node module *highlight.js*. In that case, define a highlight function that hunts for
triple tick marks and then uses highlight's highlighter to transform it.

Your users shouldn't have to wait for client-side JS to re-process your pages.

### Indentation

Since CoffeeScript is sensitive to indenting, so is Toffee.

But...Toffee doesn't care where you start your CoffeeScript. When you want to create a coffee block, 
you can indent it however you like, and all that matters is that the internal, 
relative indenting is correct. For example, these are identical:

```html
<p>
	{#
	      if user.is_awesome {:
	        YAY!
	      :}	      
	#}
</p>
<p>
{#
if user.is_awesome {:
  YAY!
:}
#}
</p>
```

In other words, feel free to pick whatever indentation baseline you want when entering a region of CoffeeScript.

Note that where you put your toffee mode tokens (`{:`) is important, as the following illustrates:

```html
<p>
 {#
    if x is true
      if y is true
        if z is true
          w = true
      {: 
      	x is true! Dunno anything about y or z, though. 
      :}
 #}
</p>
```

Why? Because this is roughly the same as saying:

```html
<p>
 {#
    if x is true
      if y is true
        if z is true
          w = true
      print "\n       x is true! Dunno anything about y or z, though.\n     "
 #}
</p>
```

One syntactic convenience: if you start a `{:` on the same line as some preceeding CoffeeScript, it's 
treated the same as putting it on a new line and indenting one level.
So the following three conditionals are the same:

```html
{#
  if x is true
    {:yay:}
#}
```

```html
{#
  if x is true {:yay:}
#}
```

```html
{#
  if x is true {:
    yay
  :}
#}
```

The third example has extra whitespace around the "yay," but otherwise the three are logically identical.

### One gotcha with indenting



THIS IS AN ERROR
```html
{# if x is 0 {:Yay!:}
   else      {:Burned:}
#}
```

Note that the indentations before the 'if' and the 'else' are technically different,
as the `if` has only 1 space before it, and the `else` has 2. This is better style anyway:

GOOD
```html
{# 
   if x is 0 {:Yay!:}
   else      {:Burned:}
#}
```

With a single line of CoffeeScript, feel free to keep it all on one line:

GOOD
```html
<div>{# foo = "bar" #}</div>
```


## Commenting out a block of toffee

In toffee mode, you can comment out a region with `{##` and `##}`.

```html
<div>
 I don't want to output this anymore...
 {##
     <p>An ode to Ruby on Rails</p>
     <p>#{partial 'ode.toffee'}</p>
 ##}
</div>
```


## <a name="section_2"></a>Escaping

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

### Custom Escaping

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

## <a name="section_3"></a>Common Questions

#### How does it compare to eco?

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
   if projects.length
    for project in projects
      if project.is_active {:
        <p>#{project.name} | #{project.description}</p>
      :}
#}
```

With Toffee's syntax, brackets enclose regions not directives, so your editor 
will let you collapse and expand sections of code. And if you click on one of the brackets in most
editors, it will highlight the matching bracket.

#### Does it cache templates?

In Express 2.0, that's up to Express. When used in Express 3.0, Toffee asynchronously monitors known templates and recompiles them in the background when necessary. So you don't need to restart your production webserver whenever you edit a template.

#### Does it find line numbers in errors?

Yes, Toffee does a very good job of that. There are 3 possible places you can hit an error in Toffee: 
 * in the language itself, say a parse error
 * in the CoffeeScript, preventing it from compiling to JS
 * runtime, in the final JS

Stack traces are converted to lines in Toffee and show you where the problem is. 
By default when Toffee hits an error it replies with some pretty-printed HTML showing you the problem. 
This can be overridden, as explained below in the Express 3.0 section.

### Does it support partials? (a.k.a includes)

Yes.  In Express 2.0, Express itself is responsible for including other files, and they call this system "partials." In Express 3.0 and in the browser, 
Toffee defines the `partial` function, and it works as you'd expect. 

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

#### Does it support `layout`?

Yes, this works in NodeJS and Express 3.0, emulating the Express 2.0 way. The var `layout` is considered special, and should
be the path to your layout file.

## <a name="section_4"></a>Installation & Usage

 * [Using Toffee in NodeJS](https://github.com/malgorithms/toffee/wiki/NodeJS-Usage)
 * [Using Toffee in Express 3](https://github.com/malgorithms/toffee/wiki/Express3-Usage)
 * [Using Toffee in Express 2](https://github.com/malgorithms/toffee/wiki/Express2-Usage)
 * [Using Toffee in the Browser](https://github.com/malgorithms/toffee/wiki/Browser-Usage)


contributing & asking for fixes.
=================
If you have a problem with Toffee let me know, and I'll fix it ASAP.

Also, I'm likely to accept good pull requests.

If you'd like to edit code for this project, note that you should always edit the `.coffee` files,
as the `.js` files are generated automatically by building.

To build and test your changes

```
# icake is iced-coffee-script's version of cake
> icake build
> icake test
```



