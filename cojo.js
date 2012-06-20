
(function(/*! Stitch !*/) {
  if (!this.require) {
    var modules = {}, cache = {}, require = function(name, root) {
      var path = expand(root, name), module = cache[path], fn;
      if (module) {
        return module.exports;
      } else if (fn = modules[path] || modules[path = expand(path, './index')]) {
        module = {id: path, exports: {}};
        try {
          cache[path] = module;
          fn(module.exports, function(name) {
            return require(name, dirname(path));
          }, module);
          return module.exports;
        } catch (err) {
          delete cache[path];
          throw err;
        }
      } else {
        throw 'module \'' + name + '\' not found';
      }
    }, expand = function(root, name) {
      var results = [], parts, part;
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    }, dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };
    this.require = function(name) {
      return require(name, '');
    }
    this.require.define = function(bundle) {
      for (var key in bundle)
        modules[key] = bundle[key];
    };
  }
  return this.require.define;
}).call(this)({"cojo_lang": function(exports, require, module) {/* Jison generated parser */
var cojo_lang = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"starter":3,"cojo_zone":4,"EOF":5,"cojo_code":6,"flip_to_coffee":7,"START_COFFEE":8,"coffee_zone":9,"END_COFFEE":10,"coffee_code":11,"flip_to_cojo":12,"START_COJO":13,"END_COJO":14,"START_INDENTED_COJO":15,"code":16,"CODE":17,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"START_COFFEE",10:"END_COFFEE",13:"START_COJO",14:"END_COJO",15:"START_INDENTED_COJO",17:"CODE"},
productions_: [0,[3,2],[4,1],[4,3],[4,2],[7,3],[9,1],[9,3],[9,2],[12,3],[12,3],[6,1],[11,1],[16,1],[16,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: this.$ = $$[$0-1]; return this.$;
break;
case 2: this.$ = [$$[$0]]; 
break;
case 3: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-2]); for (var i = 0; i < $$[$0-1].length; i++) { $$[$0].splice(1+i,0,$$[$0-1][i]);  } 
break;
case 4: this.$ = $$[$0-1]; for (var i = 0; i < $$[$0].length; i++) { this.$.push($$[$0][i]);  } 
break;
case 5: this.$ = $$[$0-1]; 
break;
case 6: this.$ = [$$[$0]]; 
break;
case 7: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-2]); for (var i = 0; i < $$[$0-1].length; i++) { $$[$0].splice(1+i,0,$$[$0-1][i]);  } 
break;
case 8: this.$ = $$[$0-1]; for (var i = 0; i < $$[$0].length; i++) { this.$.push($$[$0][i]);  } 
break;
case 9: this.$ = $$[$0-1]; 
break;
case 10: this.$ = $$[$0-1]; $$[$0-1].splice(0,0,["INDENT"]); $$[$0-1].push(["OUTDENT"]); 
break;
case 11: this.$ = ["COJO", $$[$0]]; 
break;
case 12: this.$ = ["COFFEE", $$[$0]]; 
break;
case 13: this.$ = $$[$0]; 
break;
case 14: this.$ = $$[$0-1] + $$[$0]; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:[1,6],16:5,17:[1,7]},{1:[3]},{5:[1,8]},{5:[2,2],7:9,8:[1,6],14:[2,2]},{4:10,6:3,7:4,8:[1,6],16:5,17:[1,7]},{5:[2,11],8:[2,11],14:[2,11],17:[1,11]},{9:12,11:13,12:14,13:[1,16],15:[1,17],16:15,17:[1,7]},{5:[2,13],8:[2,13],10:[2,13],13:[2,13],14:[2,13],15:[2,13],17:[2,13]},{1:[2,1]},{4:18,6:3,7:4,8:[1,6],16:5,17:[1,7]},{5:[2,4],14:[2,4]},{5:[2,14],8:[2,14],10:[2,14],13:[2,14],14:[2,14],15:[2,14],17:[2,14]},{10:[1,19]},{10:[2,6],12:20,13:[1,16],15:[1,17]},{9:21,11:13,12:14,13:[1,16],15:[1,17],16:15,17:[1,7]},{10:[2,12],13:[2,12],15:[2,12],17:[1,11]},{4:22,6:3,7:4,8:[1,6],16:5,17:[1,7]},{4:23,6:3,7:4,8:[1,6],16:5,17:[1,7]},{5:[2,3],14:[2,3]},{8:[2,5],17:[2,5]},{9:24,11:13,12:14,13:[1,16],15:[1,17],16:15,17:[1,7]},{10:[2,8]},{14:[1,25]},{14:[1,26]},{10:[2,7]},{13:[2,9],15:[2,9],17:[2,9]},{13:[2,10],15:[2,10],17:[2,10]}],
defaultActions: {8:[2,1],21:[2,8],24:[2,7]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this,
        stack = [0],
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    //this.reductionCount = this.shiftCount = 0;

    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == 'undefined')
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);

    if (typeof this.yy.parseError === 'function')
        this.parseError = this.yy.parseError;

    function popStack (n) {
        stack.length = stack.length - 2*n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

    function lex() {
        var token;
        token = self.lexer.lex() || 1; // $end = 1
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval={},p,len,newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length-1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

        // handle parse error
        _handle_error:
        if (typeof action === 'undefined' || !action.length || !action[0]) {

            if (!recovering) {
                // Report error
                expected = [];
                for (p in table[state]) if (this.terminals_[p] && p > 2) {
                    expected.push("'"+this.terminals_[p]+"'");
                }
                var errStr = '';
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + this.terminals_[symbol]+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == 1 /*EOF*/ ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr,
                    {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol == EOF) {
                    throw new Error(errStr || 'Parsing halted.');
                }

                // discard current lookahead and grab another
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            while (1) {
                // check for error recovery rule in this state
                if ((TERROR.toString()) in table[state]) {
                    break;
                }
                if (state == 0) {
                    throw new Error(errStr || 'Parsing halted.');
                }
                popStack(1);
                state = stack[stack.length-1];
            }

            preErrorSymbol = symbol; // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {

            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = this.lexer.yyleng;
                    yytext = this.lexer.yytext;
                    yylineno = this.lexer.yylineno;
                    yyloc = this.lexer.yylloc;
                    if (recovering > 0)
                        recovering--;
                } else { // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2: // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3: // accept
                return true;
        }

    }

    return true;
}};
/* Jison generated lexer */
var lexer = (function(){
var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
less:function (n) {
        this._input = this.match.slice(n) + this._input;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            tempMatch,
            index,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
            }
        }
        if (match) {
            lines = match[0].match(/\n.*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {first_line: this.yylloc.last_line,
                           last_line: this.yylineno+1,
                           first_column: this.yylloc.last_column,
                           last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
            this.yytext += match[0];
            this.match += match[0];
            this.yyleng = this.yytext.length;
            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;
            else return;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(), 
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.options = {};
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:return 8;
break;
case 1:return 10;
break;
case 2:return 15
break;
case 3:return 13;
break;
case 4:return 14;
break;
case 5:return 17;
break;
case 6:return 5;
break;
}
};
lexer.rules = [/^\{#/,/^#\}/,/^:[\t\r\n ]*\{\{/,/^\{\{/,/^\}\}/,/^[^{}#\\:]+|[\\{}#:]/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = cojo_lang;
exports.parse = function () { return cojo_lang.parse.apply(cojo_lang, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
}}, "engine": function(exports, require, module) {// Generated by IcedCoffeeScript 1.3.3a
(function() {
  var coffee, engine, fs, parser, view, vm;

  parser = require('./cojo_lang').parser;

  coffee = require('coffee-script');

  vm = require('vm');

  fs = require('fs');

  engine = (function() {

    function engine(options) {
      this.viewCache = {};
      this.lastCacheReset = Date.now();
      this.maxCacheAge = 1000;
    }

    engine.prototype.run = function(filename, options, cb) {
      var res, v;
      if (Date.now() - this.lastCacheReset > this.maxCacheAge) this._resetCache();
      if (this.viewCache[filename] != null) {
        v = this.viewCache[filename];
      } else {
        v = this._loadAndCache(filename);
      }
      if (v) {
        res = v.run(options);
        return cb(null, res);
      } else {
        return cb("Couldn't load " + filename, null);
      }
    };

    engine.prototype._loadAndCache = function(filename) {
      var txt, v;
      txt = fs.readFileSync(filename, 'utf-8');
      if (txt) {
        v = new view(txt);
        this.viewCache[filename] = v;
        return v;
      } else {
        console.log("Couldn't load " + filename + ".");
        return null;
      }
    };

    engine.prototype._resetCache = function() {
      this.viewCache = {};
      return this.lastCacheReset = Date.now();
    };

    return engine;

  })();

  view = (function() {

    function view(txt) {
      this.codeObj = null;
      this.coffeeScript = null;
      this.javaScript = null;
      this.scriptObj = null;
      this.loadFromText(txt);
    }

    view.prototype.loadFromText = function(txt) {
      this.txt = txt;
      return this.codeObj = parser.parse(txt);
    };

    view.prototype.run = function(vars) {
      var res, script;
      script = this._toScriptObj();
      vars.__res__ = "";
      script.runInNewContext(vars);
      res = vars.__res__;
      delete vars.__res__;
      return res;
    };

    view.prototype._toScriptObj = function() {
      var d, txt;
      if (!(this.scriptObj != null)) {
        txt = this._toJavascript();
        d = Date.now();
        this.scriptObj = vm.createScript(txt);
        console.log("Compiled to ScriptObj in " + (Date.now() - d) + "ms");
      }
      return this.scriptObj;
    };

    view.prototype._toJavascript = function() {
      var c, d;
      if (!(this.javaScript != null)) {
        c = this._toCoffee();
        d = Date.now();
        this.javaScript = coffee.compile(c);
        console.log("Compiled to JavaScript in " + (Date.now() - d) + "ms");
      }
      return this.javaScript;
    };

    view.prototype._toCoffee = function() {
      var chunk, d, indent_depth, res, _i, _len, _ref;
      if (!(this.coffeeScript != null)) {
        d = Date.now();
        indent_depth = 1;
        res = this._coffeeHeaders();
        _ref = this.codeObj;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          chunk = _ref[_i];
          switch (chunk[0]) {
            case 'COJO':
              res += ("\n" + (this._space(indent_depth)) + "__res__ += ") + '"""' + chunk[1] + '"""';
              break;
            case 'COFFEE':
              res += "\n" + (this._reindent(chunk[1], indent_depth));
              break;
            case 'INDENT':
              indent_depth += 1;
              break;
            case 'OUTDENT':
              indent_depth -= 1;
              break;
            default:
              throw 'Bad parsing.';
          }
        }
        res += this._coffeeFooters();
        this.coffeeScript = res;
        console.log("Compiled to CoffeeScript in " + (Date.now() - d) + "ms");
      }
      return this.coffeeScript;
    };

    view.prototype._reindent = function(coffee, indent_depth) {
      var line, lines, res, rxx, strip;
      lines = coffee.split('\n');
      while (lines.length && lines[0].match(/^[\t\r ]*$/)) {
        lines = lines.slice(1);
      }
      if (!lines.length) return '';
      rxx = /^[\t ]*/;
      strip = lines[0].match(rxx)[0].length;
      res = ((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = lines.length; _i < _len; _i++) {
          line = lines[_i];
          _results.push("" + (this._space(indent_depth)) + line.slice(strip));
        }
        return _results;
      }).call(this)).join("\n");
      return res;
    };

    view.prototype._space = function(n) {
      var i;
      return ((function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= n ? _i < n : _i > n; i = 0 <= n ? ++_i : --_i) {
          _results.push("  ");
        }
        return _results;
      })()).join("");
    };

    view.prototype._coffeeHeaders = function() {
      var header;
      header = "run = ->";
      return header;
    };

    view.prototype._coffeeFooters = function() {
      var footer;
      footer = "\n" + (this._space(1)) + "return __res__\nrun()";
      return footer;
    };

    return view;

  })();

  exports.view = view;

  exports.engine = engine;

}).call(this);
}, "foo": function(exports, require, module) {// Generated by IcedCoffeeScript 1.3.3a
(function() {



}).call(this);
}});
