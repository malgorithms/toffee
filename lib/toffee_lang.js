/* Jison generated parser */
var toffee_lang = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"starter":3,"toffee_zone":4,"EOF":5,"toffee_code":6,"flip_to_coffee":7,"flip_to_toffee_comment":8,"START_TOFFEE_COMMENT":9,"toffee_commented_region":10,"END_TOFFEE_COMMENT":11,"START_COFFEE":12,"END_COFFEE":13,"START_TOFFEE":14,"END_TOFFEE":15,"CODE":16,"coffee_zone":17,"coffee_code":18,"flip_to_toffee":19,"code":20,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",9:"START_TOFFEE_COMMENT",11:"END_TOFFEE_COMMENT",12:"START_COFFEE",13:"END_COFFEE",14:"START_TOFFEE",15:"END_TOFFEE",16:"CODE"},
productions_: [0,[3,2],[4,1],[4,3],[4,2],[4,3],[4,2],[4,0],[8,3],[10,2],[10,2],[10,2],[10,2],[10,2],[10,0],[7,3],[17,1],[17,3],[17,2],[17,0],[19,3],[6,1],[18,1],[20,1],[20,2]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: this.$ = ["TOFFEE_ZONE", $$[$0-1]]; return this.$;
break;
case 2: this.$ = [$$[$0]]; 
break;
case 3: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-2],$$[$0-1]); 
break;
case 4: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-1]); 
break;
case 5: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-2]); 
break;
case 6: this.$ = $$[$0];  
break;
case 7: this.$ = []; 
break;
case 15: this.$ = ["COFFEE_ZONE", $$[$0-1]]; 
break;
case 16: this.$ = [$$[$0]]; 
break;
case 17: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-2],$$[$0-1]); 
break;
case 18: this.$ = $$[$0]; $$[$0].splice(0,0,$$[$0-1]); 
break;
case 19: this.$ = []; 
break;
case 20: this.$ = ["TOFFEE_ZONE", $$[$0-1]]; 
break;
case 21: this.$ = ["TOFFEE", $$[$0][0], $$[$0][1] ]; 
break;
case 22: this.$ = ["COFFEE", $$[$0][0], $$[$0][1] ]; 
break;
case 23: var ln = yylineno + 1 - $$[$0].split("\n").length + 1; 
                                           this.$ = [$$[$0], ln]; 
                                         
break;
case 24: var c = $$[$0-1][0] + $$[$0]; 
                                           var ln = yylineno + 1 - c.split("\n").length + 1; 
                                           this.$ = [c, ln]; 
                                         
break;
}
},
table: [{3:1,4:2,5:[2,7],6:3,7:4,8:5,9:[1,8],12:[1,7],16:[1,9],20:6},{1:[3]},{5:[1,10]},{5:[2,2],7:11,8:12,9:[1,8],12:[1,7],15:[2,2]},{4:13,5:[2,7],6:3,7:4,8:5,9:[1,8],12:[1,7],15:[2,7],16:[1,9],20:6},{4:14,5:[2,7],6:3,7:4,8:5,9:[1,8],12:[1,7],15:[2,7],16:[1,9],20:6},{5:[2,21],9:[2,21],12:[2,21],15:[2,21],16:[1,15]},{13:[2,19],14:[1,20],16:[1,9],17:16,18:17,19:18,20:19},{10:21,11:[2,14],12:[2,14],13:[2,14],14:[2,14],15:[2,14],16:[2,14]},{5:[2,23],9:[2,23],12:[2,23],13:[2,23],14:[2,23],15:[2,23],16:[2,23]},{1:[2,1]},{4:22,5:[2,7],6:3,7:4,8:5,9:[1,8],12:[1,7],15:[2,7],16:[1,9],20:6},{4:23,5:[2,7],6:3,7:4,8:5,9:[1,8],12:[1,7],15:[2,7],16:[1,9],20:6},{5:[2,4],15:[2,4]},{5:[2,6],15:[2,6]},{5:[2,24],9:[2,24],12:[2,24],13:[2,24],14:[2,24],15:[2,24],16:[2,24]},{13:[1,24]},{13:[2,16],14:[1,20],19:25},{13:[2,19],14:[1,20],16:[1,9],17:26,18:17,19:18,20:19},{13:[2,22],14:[2,22],16:[1,15]},{4:27,6:3,7:4,8:5,9:[1,8],12:[1,7],15:[2,7],16:[1,9],20:6},{11:[1,28],12:[1,29],13:[1,30],14:[1,31],15:[1,32],16:[1,33]},{5:[2,3],15:[2,3]},{5:[2,5],15:[2,5]},{5:[2,15],9:[2,15],12:[2,15],15:[2,15],16:[2,15]},{13:[2,19],14:[1,20],16:[1,9],17:34,18:17,19:18,20:19},{13:[2,18]},{15:[1,35]},{5:[2,8],9:[2,8],12:[2,8],15:[2,8],16:[2,8]},{11:[2,9],12:[2,9],13:[2,9],14:[2,9],15:[2,9],16:[2,9]},{11:[2,10],12:[2,10],13:[2,10],14:[2,10],15:[2,10],16:[2,10]},{11:[2,11],12:[2,11],13:[2,11],14:[2,11],15:[2,11],16:[2,11]},{11:[2,12],12:[2,12],13:[2,12],14:[2,12],15:[2,12],16:[2,12]},{11:[2,13],12:[2,13],13:[2,13],14:[2,13],15:[2,13],16:[2,13]},{13:[2,17]},{13:[2,20],14:[2,20],16:[2,20]}],
defaultActions: {10:[2,1],26:[2,18],34:[2,17]},
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
case 2:return 15;
break;
case 3:return 14;
break;
case 4:return 12;
break;
case 5:return 13;
break;
case 6:return 16;
break;
case 7:return 5;
break;
}
};
lexer.rules = [/^\{##/,/^##\}/,/^:\}/,/^\{:/,/^\{#/,/^#\}/,/^[^{}#\\:\-]+|[\\{}#:\-]/,/^$/];
lexer.conditions = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7],"inclusive":true}};
return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = toffee_lang;
exports.parse = function () { return toffee_lang.parse.apply(toffee_lang, arguments); }
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
}