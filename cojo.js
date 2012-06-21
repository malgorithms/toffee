
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
symbols_: {"error":2,"starter":3,"cojo_zone":4,"EOF":5,"cojo_code":6,"flip_to_coffee":7,"flip_to_cojo_comment":8,"START_COJO_COMMENT":9,"code":10,"END_COJO_COMMENT":11,"START_COFFEE":12,"coffee_zone":13,"END_COFFEE":14,"coffee_code":15,"flip_to_cojo":16,"START_COJO":17,"END_COJO":18,"START_INDENTED_COJO":19,"CODE":20,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",9:"START_COJO_COMMENT",11:"END_COJO_COMMENT",12:"START_COFFEE",14:"END_COFFEE",17:"START_COJO",18:"END_COJO",19:"START_INDENTED_COJO",20:"CODE"},
productions_: [0,[3,2],[4,1],[4,3],[4,2],[4,3],[4,2],[4,0],[8,3],[7,3],[13,1],[13,3],[13,2],[13,0],[16,3],[16,3],[6,1],[15,1],[10,1],[10,2]],
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
case 5: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-2]); 
break;
case 6: this.$ = $$[$0]; 
break;
case 7: this.$ = []; 
break;
case 9: this.$ = $$[$0-1]; 
break;
case 10: this.$ = [$$[$0]]; 
break;
case 11: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-2]); for (var i = 0; i < $$[$0-1].length; i++) { $$[$0].splice(1+i,0,$$[$0-1][i]);  } 
break;
case 12: this.$ = $$[$0-1]; for (var i = 0; i < $$[$0].length; i++) { this.$.push($$[$0][i]);  } 
break;
case 13: this.$ = []; 
break;
case 14: this.$ = $$[$0-1]; 
break;
case 15: this.$ = $$[$0-1]; $$[$0-1].splice(0,0,["INDENT"]); $$[$0-1].push(["OUTDENT"]); 
break;
case 16: this.$ = ["COJO", $$[$0]]; 
break;
case 17: this.$ = ["COFFEE", $$[$0]]; 
break;
case 18: this.$ = $$[$0]; 
break;
case 19: this.$ = $$[$0-1] + $$[$0]; 
break;
}
},
table: [{3:1,4:2,5:[2,7],6:3,7:4,8:5,9:[1,8],10:6,12:[1,7],20:[1,9]},{1:[3]},{5:[1,10]},{5:[2,2],7:11,8:12,9:[1,8],12:[1,7],18:[2,2]},{4:13,5:[2,7],6:3,7:4,8:5,9:[1,8],10:6,12:[1,7],18:[2,7],20:[1,9]},{4:14,5:[2,7],6:3,7:4,8:5,9:[1,8],10:6,12:[1,7],18:[2,7],20:[1,9]},{5:[2,16],9:[2,16],12:[2,16],18:[2,16],20:[1,15]},{10:19,13:16,14:[2,13],15:17,16:18,17:[1,20],19:[1,21],20:[1,9]},{10:22,20:[1,9]},{5:[2,18],9:[2,18],11:[2,18],12:[2,18],14:[2,18],17:[2,18],18:[2,18],19:[2,18],20:[2,18]},{1:[2,1]},{4:23,5:[2,7],6:3,7:4,8:5,9:[1,8],10:6,12:[1,7],18:[2,7],20:[1,9]},{4:24,5:[2,7],6:3,7:4,8:5,9:[1,8],10:6,12:[1,7],18:[2,7],20:[1,9]},{5:[2,4],18:[2,4]},{5:[2,6],18:[2,6]},{5:[2,19],9:[2,19],11:[2,19],12:[2,19],14:[2,19],17:[2,19],18:[2,19],19:[2,19],20:[2,19]},{14:[1,25]},{14:[2,10],16:26,17:[1,20],19:[1,21]},{10:19,13:27,14:[2,13],15:17,16:18,17:[1,20],19:[1,21],20:[1,9]},{14:[2,17],17:[2,17],19:[2,17],20:[1,15]},{4:28,6:3,7:4,8:5,9:[1,8],10:6,12:[1,7],18:[2,7],20:[1,9]},{4:29,6:3,7:4,8:5,9:[1,8],10:6,12:[1,7],18:[2,7],20:[1,9]},{11:[1,30],20:[1,15]},{5:[2,3],18:[2,3]},{5:[2,5],18:[2,5]},{5:[2,9],9:[2,9],12:[2,9],18:[2,9],20:[2,9]},{10:19,13:31,14:[2,13],15:17,16:18,17:[1,20],19:[1,21],20:[1,9]},{14:[2,12]},{18:[1,32]},{18:[1,33]},{5:[2,8],9:[2,8],12:[2,8],18:[2,8],20:[2,8]},{14:[2,11]},{14:[2,14],17:[2,14],19:[2,14],20:[2,14]},{14:[2,15],17:[2,15],19:[2,15],20:[2,15]}],
defaultActions: {10:[2,1],27:[2,12],31:[2,11]},
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
case 0:return 9;
break;
case 1:return 11;
break;
case 2:return 12;
break;
case 3:return 14;
break;
case 4:return 19
break;
case 5:return 17;
break;
case 6:return 18;
break;
case 7:return 20;
break;
case 8:return 5;
break;
}
};
lexer.rules = [/^\{##/,/^##\}/,/^\{#/,/^#\}/,/^:[\t\r\n ]*\{\{/,/^\{\{/,/^\}\}/,/^[^{}#\\:]+|[\\{}#:]/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8],"inclusive":true}};
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
  var engine, fs, path, view,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  view = require('./view').view;

  fs = require('fs');

  path = require('path');

  engine = (function() {

    function engine(options) {
      this._inlineInclude = __bind(this._inlineInclude, this);

      this.run = __bind(this.run, this);
      this.viewCache = {};
      this.lastCacheReset = Date.now();
      this.maxCacheAge = 2000;
    }

    engine.prototype.run = function(filename, options, cb) {
      /*
          "options" contains the pub vars
          may also contain special items:
            __dir: path to look relative to
      */

      var err, res, _ref;
      _ref = this.runSync(filename, options), err = _ref[0], res = _ref[1];
      return cb(err, res);
    };

    engine.prototype.runSync = function(filename, options) {
      /*
          returns [err, res];
          "options" the same as run() above
      */

      var err, pwd, realpath, res, v, view_options, _ref,
        _this = this;
      options = options || {};
      options.__dir = options.__dir || process.cwd();
      if (filename.charAt(0) !== "/") {
        filename = "" + options.__dir + "/" + filename;
      }
      realpath = filename;
      pwd = path.dirname(realpath);
      if (Date.now() - this.lastCacheReset > this.maxCacheAge) this._resetCache();
      v = this.viewCache[filename] || this._loadAndCache(filename, options);
      if (v) {
        view_options = {
          parent: filename,
          prebuilt_functions: {
            include: function(fname, lvars) {
              return _this._fn_include(fname, lvars, realpath, options);
            },
            partial: function(fname, lvars) {
              return _this._inlineInclude(fname, lvars, realpath, options);
            },
            print: function(txt) {
              return _this._fn_print(txt, options);
            }
          }
        };
        _ref = v.run(options, view_options), err = _ref[0], res = _ref[1];
        return [err, res];
      } else {
        return ["Couldn't load " + filename, null];
      }
    };

    engine.prototype._fn_include = function(fname, lvars, realpath, options) {
      var res;
      res = this._inlineInclude(fname, lvars, realpath);
      if (options.__cojo__.state === "COFFEE") {
        return this._fn_print(res, options);
      } else {
        return res;
      }
    };

    engine.prototype._fn_partial = function(fname, lvars, realpath, options) {
      return this._inlineInclude(fname, lvars, realpath);
    };

    engine.prototype._fn_print = function(txt, options) {
      return options.__cojo__.res += txt;
    };

    engine.prototype._inlineInclude = function(filename, local_vars, parent_realpath) {
      var err, options, res, _ref;
      options = local_vars || {};
      options.__dir = path.dirname(parent_realpath);
      options.__parent = parent_realpath;
      _ref = this.runSync(filename, options), err = _ref[0], res = _ref[1];
      if (err) {
        return err;
      } else {
        return res;
      }
    };

    engine.prototype._loadAndCache = function(filename, options) {
      var txt, v;
      try {
        txt = fs.readFileSync(filename, 'utf-8');
      } catch (e) {
        txt = "Error: Could not read " + filename;
        if (options.__parent != null) txt += " requested in " + options.__parent;
      }
      v = new view(txt);
      this.viewCache[filename] = v;
      return v;
    };

    engine.prototype._resetCache = function() {
      this.viewCache = {};
      return this.lastCacheReset = Date.now();
    };

    return engine;

  })();

  exports.engine = engine;

}).call(this);
}, "view": function(exports, require, module) {// Generated by IcedCoffeeScript 1.3.3a
(function() {
  var coffee, parser, view, vm;

  parser = require('./cojo_lang').parser;

  coffee = require('coffee-script');

  vm = require('vm');

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

    view.prototype.run = function(vars, options) {
      /*
          returns [err, str]
      */

      var err, fn, name, res, script, _ref;
      script = this._toScriptObj();
      vars.__cojo__ = {
        res: ""
      };
      err = null;
      if (options.prebuilt_functions != null) {
        _ref = options.prebuilt_functions;
        for (name in _ref) {
          fn = _ref[name];
          vars[name] = fn;
        }
      }
      try {
        script.runInNewContext(vars);
        res = vars.__cojo__.res;
        delete vars.__cojo__;
      } catch (e) {
        err = "Error: " + e.message;
        err += "\nStack: " + e.stack;
      }
      return [err, res];
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
      var chunk, d, i, indent_depth, res, _i, _len, _ref;
      if (!(this.coffeeScript != null)) {
        d = Date.now();
        indent_depth = 1;
        res = this._coffeeHeaders();
        _ref = this.codeObj;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          chunk = _ref[i];
          switch (chunk[0]) {
            case 'COJO':
              res += "\n" + (this._space(indent_depth)) + "__cojo__.state=\"COJO\"";
              res += ("\n" + (this._space(indent_depth)) + "__cojo__.res += ") + '"""' + chunk[1] + '"""';
              res += "\n" + (this._space(indent_depth)) + "__cojo__.state=\"COFFEE\"";
              break;
            case 'COFFEE':
              if (i === 0) {
                res += "\n" + (this._space(indent_depth)) + "__cojo__.state=\"COFFEE\"";
              }
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
      header = "run = ->\n" + (this._space(1)) + "__cojo__.state = \"COJO\"";
      return header;
    };

    view.prototype._coffeeFooters = function() {
      var footer;
      footer = "\n" + (this._space(1)) + "return __cojo__.res\nrun()";
      return footer;
    };

    return view;

  })();

  exports.view = view;

}).call(this);
}});
