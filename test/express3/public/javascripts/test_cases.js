var toffee;

if (!(typeof toffee !== "undefined" && toffee !== null)) toffee = {};

if (!toffee.templates) toffee.templates = {};

toffee.states = {
  "TOFFEE": 1,
  "COFFEE": 2
};

toffee.__json = function(locals, o) {
  if (!(o != null)) {
    return "null";
  } else {
    return "" + JSON.stringify(o).replace(/</g, '\\u003C').replace(/>/g, '\\u003E').replace(/&/g, '\\u0026');
  }
};

toffee.__raw = function(locals, o) {
  return o;
};

toffee.__html = function(locals, o) {
  return ("" + o).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

toffee.__escape = function(locals, o) {
  if ((!(locals.__toffee.autoEscape != null)) || locals.__toffee.autoEscape) {
    if (o === void 0) return '';
    if ((o != null) && (typeof o) === "object") return locals.json(o);
    return locals.html(o);
  }
  return o;
};

toffee.__print = function(locals, o) {
  if (locals.__toffee.state === toffee.states.COFFEE) {
    locals.__toffee.out.push(o);
    return '';
  } else {
    return "" + o;
  }
};

toffee.__normalize = function(path) {
  var np, part, parts, _i, _len;
  if ((!(path != null)) || path === "/") {
    return path;
  } else {
    parts = path.split("/");
    np = [];
    if (parts[0]) np.push('');
    for (_i = 0, _len = parts.length; _i < _len; _i++) {
      part = parts[_i];
      if (part === "..") {
        if (np.length > 1) {
          np.pop();
        } else {
          np.push(part);
        }
      } else {
        if (part !== ".") np.push(part);
      }
    }
    path = np.join("/");
    if (!path) path = "/";
    return path;
  }
};

toffee.__partial = function(parent_tmpl, parent_locals, path, vars) {
  path = toffee.__normalize(parent_tmpl.bundlePath + "/../" + path);
  return toffee.__inlineInclude(path, vars, parent_locals);
};

toffee.__snippet = function(parent_tmpl, parent_locals, path, vars) {
  path = toffee.__normalize(parent_tmpl.bundlePath + "/../" + path);
  vars = vars != null ? vars : {};
  vars.__toffee = vars.__toffee || {};
  vars.__toffee.noInheritance = true;
  return toffee.__inlineInclude(path, vars, parent_locals);
};

toffee.__inlineInclude = function(path, locals, parent_locals) {
  var k, options, v;
  options = locals || {};
  options.__toffee = options.__toffee || {};
  if (!options.__toffee.noInheritance) {
    for (k in parent_locals) {
      v = parent_locals[k];
      if (!((locals != null ? locals[k] : void 0) != null)) {
        if (!(k === "print" || k === "partial" || k === "snippet" || k === "layout" || k === "__toffee")) {
          options[k] = v;
        }
      }
    }
  }
  if (!toffee.templates[path]) {
    return "Inline toffee include: Could not find " + path;
  } else {
    return toffee.templates[path].pub(options);
  }
};

(function() {
  var tmpl;

  tmpl = toffee.templates["/big_file/input.toffee"] = {
    bundlePath: "/big_file/input.toffee"
  };

  tmpl.pub = function(locals) {
    var count, i, _i, _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/big_file/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/big_file/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(2);
    count = 0;
    for (i = _i = 0; _i < 2; i = ++_i) {
      _ts(1);
      _ln(3);
      _to("" + (escape(count++)));
      _ln(4);
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _ln(5);
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _ln(6);
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _ln(7);
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _ln(8);
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _ln(9);
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _ln(10);
      _to("...");
      _ts(2);
      _ts(2);
      count += 1;
      print(" " + count + "...");
      _ts(1);
      _ln(13);
      _to(" ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _ln(14);
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _ln(15);
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _ln(16);
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _ln(17);
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _ln(18);
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _ln(19);
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _to("... ");
      _to("" + (escape(count++)));
      _ln(20);
      _to("...");
      _ts(2);
      _ts(2);
      count += 1;
      print(" " + count + "...");
    }
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/big_file/output.toffee"] = {
    bundlePath: "/big_file/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/big_file/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/big_file/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("0... 1... 2... 3... 4... 5... 6... 7... 8... 9... 10... 11... 12... 13... 14... 15... 16... 17... 18... 19... 20... 21... 22... 23... 24... 25... 26... 27... 28... 29... 30... 31... 32... 33... 34... 35... 36... 37... 38... 39... 40... 41... 42... 43... 44... 45... 46... 47... 48... 49... 50... 51... 52... 53... 54... 55... 56... 57... 58... 59... 60... 61... 62... 63... 64... 65... 66... 67... 68... 70... 70... 71... 72... 73... 74... 75... 76... 77... 78... 79... 80... 81... 82... 83... 84... 85... 86... 87... 88... 89... 90... 91... 92... 93... 94... 95... 96... 97... 98... 99... 100... 101... 102... 103... 104... 105... 106... 107... 108... 109... 110... 111... 112... 113... 114... 115... 116... 117... 118... 119... 120... 121... 122... 123... 124... 125... 126... 127... 128... 129... 130... 131... 132... 133... 134... 135... 136... 137... 138... 139... 140... 141... 142... 143... 144... 145... 146... 147... 148... 149... 150... 151... 152... 153... 154... 155... 156... 157... 158... 159... 160... 162...162... 163... 164... 165... 166... 167... 168... 169... 170... 171... 172... 173... 174... 175... 176... 177... 178... 179... 180... 181... 182... 183... 184... 185... 186... 187... 188... 189... 190... 191... 192... 193... 194... 195... 196... 197... 198... 199... 200... 201... 202... 203... 204... 205... 206... 207... 208... 209... 210... 211... 212... 213... 214... 215... 216... 217... 218... 219... 220... 221... 222... 223... 224... 225... 226... 227... 228... 229... 230... 232... 232... 233... 234... 235... 236... 237... 238... 239... 240... 241... 242... 243... 244... 245... 246... 247... 248... 249... 250... 251... 252... 253... 254... 255... 256... 257... 258... 259... 260... 261... 262... 263... 264... 265... 266... 267... 268... 269... 270... 271... 272... 273... 274... 275... 276... 277... 278... 279... 280... 281... 282... 283... 284... 285... 286... 287... 288... 289... 290... 291... 292... 293... 294... 295... 296... 297... 298... 299... 300... 301... 302... 303... 304... 305... 306... 307... 308... 309... 310... 311... 312... 313... 314... 315... 316... 317... 318... 319... 320... 321... 322... 324...");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/comments/input.toffee"] = {
    bundlePath: "/comments/input.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/comments/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/comments/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("\n");
    _ln(2);
    _to("Pass 1\n");
    _ln(3);
    _ts(2);
    _ts(1);
    _ln(8);
    _to("\n");
    _ln(9);
    _to("Pass 2\n");
    _ln(10);
    _ts(2);
    _ts(2);
    /*
      print "FAIL FAIL FAIL"  
      #{ foo }
    */

    _ts(1);
    _ln(19);
    _to("\n");
    _ln(20);
    _to("Pass 3\n");
    _ln(21);
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/comments/output.toffee"] = {
    bundlePath: "/comments/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/comments/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/comments/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("\n");
    _ln(2);
    _to("Pass 1\n");
    _ln(3);
    _to("\n");
    _ln(4);
    _to("Pass 2\n");
    _ln(5);
    _to("\n");
    _ln(6);
    _to("Pass 3\n");
    _ln(7);
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/custom_escape/input.toffee"] = {
    bundlePath: "/custom_escape/input.toffee"
  };

  tmpl.pub = function(locals) {
    var w, x, y, z, _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/custom_escape/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/custom_escape/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(2);
    x = '"Hello world"';
    y = '<td>';
    z = 'click&clack';
    w = [
      1, 2, {
        "place": "The Dreadfort"
      }
    ];
    _ts(1);
    _ln(6);
    _to("<p>\n");
    _ln(7);
    _to(" default x = ");
    _to("" + (x != null ? escape(x) : ''));
    _to("\n");
    _ln(8);
    _to(" default y = ");
    _to("" + (y != null ? escape(y) : ''));
    _to("\n");
    _ln(9);
    _to(" default z = ");
    _to("" + (z != null ? escape(z) : ''));
    _to("\n");
    _ln(10);
    _to(" default w = ");
    _to("" + (w != null ? escape(w) : ''));
    _to("\n");
    _ln(11);
    _to("</p>\n");
    _ln(12);
    _to("<p>\n");
    _ln(13);
    _to(" raw x = ");
    _to("" + (raw(x)));
    _to("\n");
    _ln(14);
    _to(" raw y = ");
    _to("" + (raw(y)));
    _to("\n");
    _ln(15);
    _to(" raw z = ");
    _to("" + (raw(z)));
    _to("\n");
    _ln(16);
    _to(" raw w = ");
    _to("" + (raw(w)));
    _to("\n");
    _ln(17);
    _to("</p>\n");
    _ln(18);
    _to("<script>\n");
    _ln(19);
    _to("  x = ");
    _to("" + (json(x)));
    _to("\n");
    _ln(20);
    _to("  y = ");
    _to("" + (json(y)));
    _to("\n");
    _ln(21);
    _to("  z = ");
    _to("" + (json(z)));
    _to("\n");
    _ln(22);
    _to("  w = ");
    _to("" + (json(w)));
    _to("\n");
    _ln(23);
    _to("</script>\n");
    _ln(24);
    _to("<p>\n");
    _ln(25);
    _ts(2);
    _ts(2);
    print(" raw printed x = " + x + "\n");
    print(" raw printed y = " + y + "\n");
    print(" raw printed z = " + z + "\n");
    print(" raw printed w = " + w);
    _ts(1);
    _ln(30);
    _to("\n");
    _ln(31);
    _to("</p>");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/custom_escape/output.toffee"] = {
    bundlePath: "/custom_escape/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/custom_escape/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/custom_escape/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("<p>\n");
    _ln(2);
    _to(" default x = [\"Hello world\"]\n");
    _ln(3);
    _to(" default y = [<td>]\n");
    _ln(4);
    _to(" default z = [click&clack]\n");
    _ln(5);
    _to(" default w = [1,2,[object Object]]\n");
    _ln(6);
    _to("</p>\n");
    _ln(7);
    _to("<p>\n");
    _ln(8);
    _to(" raw x = \"Hello world\"\n");
    _ln(9);
    _to(" raw y = <td>\n");
    _ln(10);
    _to(" raw z = click&clack\n");
    _ln(11);
    _to(" raw w = 1,2,[object Object]\n");
    _ln(12);
    _to("</p>\n");
    _ln(13);
    _to("<script>\n");
    _ln(14);
    _to("  x = \"\\\"Hello world\\\"\"\n");
    _ln(15);
    _to("  y = \"\\u003Ctd\\u003E\"\n");
    _ln(16);
    _to("  z = \"click\\u0026clack\"\n");
    _ln(17);
    _to("  w = [1,2,{\"place\":\"The Dreadfort\"}]\n");
    _ln(18);
    _to("</script>\n");
    _ln(19);
    _to("<p>\n");
    _ln(20);
    _to(" raw printed x = \"Hello world\"\n");
    _ln(21);
    _to(" raw printed y = <td>\n");
    _ln(22);
    _to(" raw printed z = click&clack\n");
    _ln(23);
    _to(" raw printed w = 1,2,[object Object]\n");
    _ln(24);
    _to("</p>");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/eco_compare/input.toffee"] = {
    bundlePath: "/eco_compare/input.toffee"
  };

  tmpl.pub = function(locals) {
    var f, friends, project, _i, _l, _len, _ln, _ref, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/eco_compare/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/eco_compare/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(2);
    this.projects = [
      {
        url: "http://localhost:3000",
        name: "okcupid",
        description: "A site for singles"
      }, {
        url: "http://localhost:3001",
        name: "tallygram",
        description: "A site for anyone"
      }
    ];
    if (this.projects.length) {
      _ref = this.projects;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        project = _ref[_i];
        _ts(1);
        _ln(8);
        _to("\n");
        _ln(9);
        _to("      <a href=" + '"');
        _to("" + (escape(project.url)));
        _to('"' + ">");
        _to("" + (escape(project.name)));
        _to("</a>\n");
        _ln(10);
        _to("      <p>");
        _to("" + (escape(project.description)));
        _to("</p>\n");
        _ln(11);
        _to("    ");
        _ts(2);
      }
    } else {
      _ts(1);
      _ln(12);
      _to(" No projects ");
      _ts(2);
    }
    friends = [
      {
        gender: "f",
        name: "Jennie"
      }, {
        gender: "f",
        name: "Rachel"
      }, {
        gender: "m",
        name: "Petar"
      }, {
        gender: "f",
        name: "Marissa"
      }
    ];
    _ts(1);
    _ln(20);
    _to("\n");
    _ln(21);
    _to("\n");
    _ln(22);
    _to("You have ");
    _to("" + (escape(((function() {
      var _j, _len1, _results;
      _results = [];
      for (_j = 0, _len1 = friends.length; _j < _len1; _j++) {
        f = friends[_j];
        if (f.gender === "f") _results.push(f);
      }
      return _results;
    })()).length)));
    _to(" female friends.");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/eco_compare/output.toffee"] = {
    bundlePath: "/eco_compare/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/eco_compare/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/eco_compare/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("\n");
    _ln(2);
    _to("      <a href=\"http://localhost:3000\">okcupid</a>\n");
    _ln(3);
    _to("      <p>A site for singles</p>\n");
    _ln(4);
    _to("    \n");
    _ln(5);
    _to("      <a href=\"http://localhost:3001\">tallygram</a>\n");
    _ln(6);
    _to("      <p>A site for anyone</p>\n");
    _ln(7);
    _to("    \n");
    _ln(8);
    _to("\n");
    _ln(9);
    _to("You have 3 female friends.");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/escape/input.toffee"] = {
    bundlePath: "/escape/input.toffee"
  };

  tmpl.pub = function(locals) {
    var w, x, y, z, _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/escape/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/escape/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(2);
    x = '"Hello world"';
    y = '<hr />';
    z = 'click&clack';
    w = [
      1, 2, {
        "place": "The Dreadfort"
      }
    ];
    _ts(1);
    _ln(6);
    _to("<p>\n");
    _ln(7);
    _to(" default x = ");
    _to("" + (x != null ? escape(x) : ''));
    _to("\n");
    _ln(8);
    _to(" default y = ");
    _to("" + (y != null ? escape(y) : ''));
    _to("\n");
    _ln(9);
    _to(" default z = ");
    _to("" + (z != null ? escape(z) : ''));
    _to("\n");
    _ln(10);
    _to(" default w = ");
    _to("" + (w != null ? escape(w) : ''));
    _to("\n");
    _ln(11);
    _to(" default r = ");
    _to("" + (typeof r !== "undefined" && r !== null ? escape(r) : ''));
    _to("\n");
    _ln(12);
    _to(" default w.foo = ");
    _to("" + (escape(w.foo)));
    _to("\n");
    _ln(13);
    _to("</p>\n");
    _ln(14);
    _to("<p>\n");
    _ln(15);
    _to(" raw x = ");
    _to("" + (raw(x)));
    _to("\n");
    _ln(16);
    _to(" raw y = ");
    _to("" + (raw(y)));
    _to("\n");
    _ln(17);
    _to(" raw z = ");
    _to("" + (raw(z)));
    _to("\n");
    _ln(18);
    _to(" raw w = ");
    _to("" + (raw(w)));
    _to("\n");
    _ln(19);
    _to("</p>\n");
    _ln(20);
    _to("<script>\n");
    _ln(21);
    _to("  x = ");
    _to("" + (json(x)));
    _to("\n");
    _ln(22);
    _to("  y = ");
    _to("" + (json(y)));
    _to("\n");
    _ln(23);
    _to("  z = ");
    _to("" + (json(z)));
    _to("\n");
    _ln(24);
    _to("  w = ");
    _to("" + (json(w)));
    _to("\n");
    _ln(25);
    _to("</script>\n");
    _ln(26);
    _to("<p>\n");
    _ln(27);
    _ts(2);
    _ts(2);
    print(" raw printed x = " + x + "\n");
    print(" raw printed y = " + y + "\n");
    print(" raw printed z = " + z + "\n");
    print(" raw printed w = " + w);
    _ts(1);
    _ln(32);
    _to("\n");
    _ln(33);
    _to("</p>\n");
    _ln(34);
    _to("<p>\n");
    _ln(35);
    _ts(2);
    _ts(2);
    print(" json printed x = " + (raw(raw(raw(raw(json(x)))))) + "\n");
    print(" json printed y = " + (raw(raw(raw(raw(json(y)))))) + "\n");
    print(" json printed z = " + (raw(raw(raw(raw(json(z)))))) + "\n");
    print(" json printed w = " + (raw(raw(raw(raw(json(w)))))));
    _ts(1);
    _ln(40);
    _to("\n");
    _ln(41);
    _to("</p>\n");
    _ln(42);
    _to("<p>\n");
    _ln(43);
    _ts(2);
    _ts(2);
    print(" html printed longhand x = " + (__toffee.html(x)) + "\n");
    print(" html printed longhand y = " + (__toffee.html(y)) + "\n");
    print(" html printed longhand z = " + (__toffee.html(z)) + "\n");
    print(" html printed longhand w = " + (__toffee.html(w)));
    _ts(1);
    _ln(48);
    _to("\n");
    _ln(49);
    _to("</p>");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/escape/output.toffee"] = {
    bundlePath: "/escape/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/escape/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/escape/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("<p>\n");
    _ln(2);
    _to(" default x = &quot;Hello world&quot;\n");
    _ln(3);
    _to(" default y = &lt;hr /&gt;\n");
    _ln(4);
    _to(" default z = click&amp;clack\n");
    _ln(5);
    _to(" default w = [1,2,{\"place\":\"The Dreadfort\"}]\n");
    _ln(6);
    _to(" default r = \n");
    _ln(7);
    _to(" default w.foo = \n");
    _ln(8);
    _to("</p>\n");
    _ln(9);
    _to("<p>\n");
    _ln(10);
    _to(" raw x = \"Hello world\"\n");
    _ln(11);
    _to(" raw y = <hr />\n");
    _ln(12);
    _to(" raw z = click&clack\n");
    _ln(13);
    _to(" raw w = 1,2,[object Object]\n");
    _ln(14);
    _to("</p>\n");
    _ln(15);
    _to("<script>\n");
    _ln(16);
    _to("  x = \"\\\"Hello world\\\"\"\n");
    _ln(17);
    _to("  y = \"\\u003Chr /\\u003E\"\n");
    _ln(18);
    _to("  z = \"click\\u0026clack\"\n");
    _ln(19);
    _to("  w = [1,2,{\"place\":\"The Dreadfort\"}]\n");
    _ln(20);
    _to("</script>\n");
    _ln(21);
    _to("<p>\n");
    _ln(22);
    _to(" raw printed x = \"Hello world\"\n");
    _ln(23);
    _to(" raw printed y = <hr />\n");
    _ln(24);
    _to(" raw printed z = click&clack\n");
    _ln(25);
    _to(" raw printed w = 1,2,[object Object]\n");
    _ln(26);
    _to("</p>\n");
    _ln(27);
    _to("<p>\n");
    _ln(28);
    _to(" json printed x = \"\\\"Hello world\\\"\"\n");
    _ln(29);
    _to(" json printed y = \"\\u003Chr /\\u003E\"\n");
    _ln(30);
    _to(" json printed z = \"click\\u0026clack\"\n");
    _ln(31);
    _to(" json printed w = [1,2,{\"place\":\"The Dreadfort\"}]\n");
    _ln(32);
    _to("</p>\n");
    _ln(33);
    _to("<p>\n");
    _ln(34);
    _to(" html printed longhand x = &quot;Hello world&quot;\n");
    _ln(35);
    _to(" html printed longhand y = &lt;hr /&gt;\n");
    _ln(36);
    _to(" html printed longhand z = click&amp;clack\n");
    _ln(37);
    _to(" html printed longhand w = 1,2,[object Object]\n");
    _ln(38);
    _to("</p>");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/hello_world/input.toffee"] = {
    bundlePath: "/hello_world/input.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/hello_world/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/hello_world/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("" + (typeof greeting !== "undefined" && greeting !== null ? escape(greeting) : ''));
    _to(", world.");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/hello_world/output.toffee"] = {
    bundlePath: "/hello_world/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/hello_world/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/hello_world/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("Hello, world.");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/hello_world/temp.toffee"] = {
    bundlePath: "/hello_world/temp.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/hello_world/temp.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/hello_world/temp.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("a\n");
    _ln(2);
    _to("b\n");
    _ln(3);
    _to("c\n");
    _ln(4);
    _to("" + (escape(passed_fn(100))));
    _to("\n");
    _ln(5);
    _to("d\n");
    _ln(6);
    _to("e\n");
    _ln(7);
    _to("f");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/include_order/child.toffee"] = {
    bundlePath: "/include_order/child.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/include_order/child.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/include_order/child.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("a\n");
    _ln(2);
    _ts(2);
    _ts(2);
    say_hi();
    _ts(1);
    _ln(4);
    _to("\n");
    _ln(5);
    _to("b");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/include_order/input.toffee"] = {
    bundlePath: "/include_order/input.toffee"
  };

  tmpl.pub = function(locals) {
    var say_hi, _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/include_order/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/include_order/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(2);
    say_hi = function() {
      _ts(1);
      _ts(1);
      _ln(3);
      _to("hi");
      return _ts(2);
    };
    _ts(1);
    _ln(4);
    _to("1\n");
    _ln(5);
    _to("2\n");
    _ln(6);
    _to("" + (partial("child.toffee", {
      say_hi: say_hi
    })));
    _to("\n");
    _ln(7);
    _to("3\n");
    _ln(8);
    _to("4");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/include_order/output.toffee"] = {
    bundlePath: "/include_order/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/include_order/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/include_order/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("1\n");
    _ln(2);
    _to("2\n");
    _ln(3);
    _to("hia\n");
    _ln(4);
    _to("\n");
    _ln(5);
    _to("b\n");
    _ln(6);
    _to("3\n");
    _ln(7);
    _to("4");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/include_recursion/input.toffee"] = {
    bundlePath: "/include_recursion/input.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/include_recursion/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/include_recursion/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(2);
    if (countdown === 0) {
      _ts(1);
      _ln(2);
      _to("blastoff!");
      _ts(2);
    } else {
      print("" + countdown + "..." + (partial('input.toffee', {
        countdown: countdown - 1
      })));
    }
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/include_recursion/output.toffee"] = {
    bundlePath: "/include_recursion/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/include_recursion/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/include_recursion/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("10...9...8...7...6...5...4...3...2...1...blastoff!");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/include_techniques/input.toffee"] = {
    bundlePath: "/include_techniques/input.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/include_techniques/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/include_techniques/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("" + (partial("message.toffee", {
      from: "Chris <ccoyne77@gmail>"
    })));
    _to("\n");
    _ln(2);
    _to("" + (partial("message.toffee", {
      from: "Max & Sam"
    })));
    _to("\n");
    _ln(3);
    _ts(2);
    _ts(2);
    print(partial("message.toffee", {
      from: "Christian"
    }));
    _ts(1);
    _ts(1);
    _ln(5);
    _to("" + (partial("message.toffee", {
      from: "Jennie"
    })));
    _ts(2);
    print(partial("message.toffee", {
      sender: "The enemy"
    }));
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/include_techniques/message.toffee"] = {
    bundlePath: "/include_techniques/message.toffee"
  };

  tmpl.pub = function(locals) {
    var from, _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/include_techniques/message.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/include_techniques/message.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(2);
    from = from || "Unknown";
    _ts(1);
    _ln(3);
    _to("From: ");
    _to("" + (from != null ? escape(from) : ''));
    _to(" \n");
    _ln(4);
    _to("Msg:  Hello, world\n");
    _ln(5);
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/include_techniques/output.toffee"] = {
    bundlePath: "/include_techniques/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/include_techniques/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/include_techniques/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("From: Chris &lt;ccoyne77@gmail&gt; \n");
    _ln(2);
    _to("Msg:  Hello, world\n");
    _ln(3);
    _to("\n");
    _ln(4);
    _to("From: Max &amp; Sam \n");
    _ln(5);
    _to("Msg:  Hello, world\n");
    _ln(6);
    _to("\n");
    _ln(7);
    _to("From: Christian \n");
    _ln(8);
    _to("Msg:  Hello, world\n");
    _ln(9);
    _to("From: Jennie \n");
    _ln(10);
    _to("Msg:  Hello, world\n");
    _ln(11);
    _to("From: Unknown \n");
    _ln(12);
    _to("Msg:  Hello, world\n");
    _ln(13);
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/indent_attack/input.toffee"] = {
    bundlePath: "/indent_attack/input.toffee"
  };

  tmpl.pub = function(locals) {
    var i, x, _i, _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/indent_attack/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/indent_attack/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("<hr />\n");
    _ln(2);
    _to("    ");
    _ts(2);
    _ts(2);
    if (1 === 1) {
      if (2 === 2) {
        if (3 === 3) {
          _ts(1);
          _ln(5);
          _to("Pass1");
          _ts(2);
        }
      }
    }
    if (1 === 1) {
      if (2 === 3) {
        if (3 === 3) {
          _ts(1);
          _ln(9);
          _to("Fail");
          _ts(2);
        } else {
          _ts(1);
          _ln(11);
          _to("Fail");
          _ts(2);
        }
      } else {
        if (2 === 2) {
          if (3 === 3) {
            _ts(1);
            _ln(14);
            _to("Pass2");
            _ts(2);
          }
        }
      }
    }
    _ts(1);
    _ln(15);
    _to("\n");
    _ln(16);
    _to("<hr />\n");
    _ln(17);
    _to("\n");
    _ln(18);
    _ts(2);
    _ts(2);
    if (1 === 1) {
      if (2 === 2) {
        if (3 === 3) {
          _ts(1);
          _ln(21);
          _to("Pass3");
          _ts(2);
        }
      }
    }
    if (1 === 1) {
      if (2 === 3) {
        if (3 === 3) {
          _ts(1);
          _ln(25);
          _to("Fail");
          _ts(2);
        } else {
          _ts(1);
          _ln(27);
          _to("Fail");
          _ts(2);
        }
      } else {
        if (2 === 2) {
          if (3 === 3) {
            _ts(1);
            _ln(30);
            _to("Pass4");
            _ts(2);
          }
        }
      }
    }
    _ts(1);
    _ln(31);
    _to("\n");
    _ln(32);
    _to("<hr />\n");
    _ln(33);
    _to("\n");
    _ln(34);
    _ts(2);
    _ts(2);
    if (10 === 10) {
      if (20 === 20) {
        if (30 === 30) {
          _ts(1);
          _ln(37);
          _to("Pass5");
          _ts(2);
        }
      }
    }
    if (10 === 10) {
      if (20 === 30) {
        if (30 === 30) {
          _ts(1);
          _ln(41);
          _to("Fail");
          _ts(2);
        } else {
          _ts(1);
          _ln(43);
          _to("Fail");
          _ts(2);
        }
      } else {
        if (20 === 20) {
          if (30 === 30) {
            _ts(1);
            _ln(46);
            _to("Pass6");
            _ts(2);
          }
        }
      }
    }
    _ts(1);
    _ln(47);
    _to("\n");
    _ln(48);
    _to("\n");
    _ln(49);
    _ts(2);
    _ts(2);
    if (99 === 99) {
      print('Pass7');
    } else {
      print('Fail');
      _ts(1);
      _ln(54);
      _to("Fail8");
      _ts(2);
    }
    _ts(1);
    _ts(1);
    _ln(55);
    _to("Pass8");
    _ts(2);
    _ts(1);
    _ln(56);
    _to("\n");
    _ln(57);
    _to("\n");
    _ln(58);
    _ts(2);
    _ts(2);
    _ts(1);
    _ts(1);
    _ln(60);
    _to("...passed with flying colors.");
    _ts(2);
    _ts(1);
    _ln(61);
    _to("\n");
    _ln(62);
    _to("<p>\n");
    _ln(63);
    _to(" ");
    _ts(2);
    _ts(2);
    x = 10;
    if (x > 1) {
      for (i = _i = 0; 0 <= x ? _i < x : _i > x; i = 0 <= x ? ++_i : --_i) {
        _ts(1);
        _ln(67);
        _to("<br />");
        _to("" + (i != null ? escape(i) : ''));
        _ts(2);
        _ts(2);
        if (i === 3) {
          _ts(1);
          _ln(68);
          _to(" (my favorite number) ");
          _ts(2);
        }
      }
    }
    _ts(1);
    _ln(70);
    _to("\n");
    _ln(71);
    _to("</p>");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/indent_attack/output.toffee"] = {
    bundlePath: "/indent_attack/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/indent_attack/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/indent_attack/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("<hr />\n");
    _ln(2);
    _to("    Pass1Pass2\n");
    _ln(3);
    _to("<hr />\n");
    _ln(4);
    _to("\n");
    _ln(5);
    _to("Pass3Pass4\n");
    _ln(6);
    _to("<hr />\n");
    _ln(7);
    _to("\n");
    _ln(8);
    _to("Pass5Pass6\n");
    _ln(9);
    _to("\n");
    _ln(10);
    _to("Pass7Pass8\n");
    _ln(11);
    _to("\n");
    _ln(12);
    _to("...passed with flying colors.\n");
    _ln(13);
    _to("<p>\n");
    _ln(14);
    _to(" <br />0<br />1<br />2<br />3 (my favorite number) <br />4<br />5<br />6<br />7<br />8<br />9\n");
    _ln(15);
    _to("</p>");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/junk/input.toffee"] = {
    bundlePath: "/junk/input.toffee"
  };

  tmpl.pub = function(locals) {
    var supplies, supply, _i, _l, _len, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/junk/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/junk/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(2);
    supplies = ["broom", "mop", "vacuum"];
    _ts(1);
    _ln(3);
    _to("<ul>\n");
    _ln(4);
    _to("  ");
    _ts(2);
    _ts(2);
    for (_i = 0, _len = supplies.length; _i < _len; _i++) {
      supply = supplies[_i];
      _ts(1);
      _to("<li>");
      _to("" + (supply != null ? escape(supply) : ''));
      _to("</li>");
      _ts(2);
    }
    _ts(1);
    _to("\n");
    _ln(5);
    _to("</ul>");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/junk/output.toffee"] = {
    bundlePath: "/junk/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/junk/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/junk/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("<ul>\n");
    _ln(2);
    _to("  <li>broom</li><li>mop</li><li>vacuum</li>\n");
    _ln(3);
    _to("</ul>");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/lambda_fns/input.toffee"] = {
    bundlePath: "/lambda_fns/input.toffee"
  };

  tmpl.pub = function(locals) {
    var echo_it, print_it, print_it_twice, _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/lambda_fns/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/lambda_fns/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(2);
    print_it = function(msg) {
      _ts(1);
      _ln(2);
      _to("" + (msg != null ? escape(msg) : ''));
      return _ts(2);
    };
    print_it_twice = function(msg) {
      var m;
      _ts(1);
      _ts(1);
      _ln(5);
      _to("" + (msg != null ? escape(msg) : ''));
      _ts(2);
      m = msg;
      _ts(1);
      _ts(1);
      _ln(7);
      _to("" + (m != null ? escape(m) : ''));
      return _ts(2);
    };
    echo_it = function(msg) {
      var v;
      v = msg;
      return v;
    };
    print_it("Pass");
    print_it_twice("Pass");
    print(echo_it("Pass"));
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/lambda_fns/output.toffee"] = {
    bundlePath: "/lambda_fns/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/lambda_fns/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/lambda_fns/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("PassPassPassPass");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/multiline_interpolation/foo.toffee"] = {
    bundlePath: "/multiline_interpolation/foo.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/multiline_interpolation/foo.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/multiline_interpolation/foo.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("" + (typeof a !== "undefined" && a !== null ? escape(a) : ''));
    _to(" ");
    _to("" + (typeof b !== "undefined" && b !== null ? escape(b) : ''));
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/multiline_interpolation/input.toffee"] = {
    bundlePath: "/multiline_interpolation/input.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/multiline_interpolation/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/multiline_interpolation/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("" + (escape("Hello, " + "world")));
    _ln(4);
    _to("\n");
    _ln(5);
    _to("<hr />\n");
    _ln(6);
    _to("" + (partial("foo.toffee", {
      a: "Goodbye" + ',',
      b: "world"
    })));
    _ln(10);
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/multiline_interpolation/output.toffee"] = {
    bundlePath: "/multiline_interpolation/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/multiline_interpolation/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/multiline_interpolation/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("Hello, world\n");
    _ln(2);
    _to("<hr />\n");
    _ln(3);
    _to("Goodbye, world");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/plaintext/input.toffee"] = {
    bundlePath: "/plaintext/input.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/plaintext/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/plaintext/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("Hi there.");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/plaintext/output.toffee"] = {
    bundlePath: "/plaintext/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/plaintext/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/plaintext/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("Hi there.");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/snippets/foo/bar/body.toffee"] = {
    bundlePath: "/snippets/foo/bar/body.toffee"
  };

  tmpl.pub = function(locals) {
    var msg, _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/snippets/foo/bar/body.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/snippets/foo/bar/body.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(2);
    msg = msg || "Unknown message";
    print(msg);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/snippets/foo/message.toffee"] = {
    bundlePath: "/snippets/foo/message.toffee"
  };

  tmpl.pub = function(locals) {
    var from, msg, _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/snippets/foo/message.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/snippets/foo/message.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(2);
    from = from || "Unknown sender";
    msg = msg || "Unknown message.";
    print("From: " + from + "\n" + (snippet('./bar/body.toffee', {
      msg: msg
    })));
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/snippets/input.toffee"] = {
    bundlePath: "/snippets/input.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/snippets/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/snippets/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("" + (partial("./foo/message.toffee")));
    _to("\n");
    _ln(2);
    _to("" + (escape(snippet("./foo/message.toffee"))));
    _to("\n");
    _ln(3);
    _to("" + (partial("./foo/message.toffee", {
      from: "Sam"
    })));
    _to("\n");
    _ln(4);
    _to("" + (escape(snippet("./foo/message.toffee", {
      from: "Max"
    }))));
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/snippets/output.toffee"] = {
    bundlePath: "/snippets/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/snippets/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/snippets/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("From: Preloaded sender\n");
    _ln(2);
    _to("Preloaded message.\n");
    _ln(3);
    _to("From: Unknown sender\n");
    _ln(4);
    _to("Unknown message.\n");
    _ln(5);
    _to("From: Sam\n");
    _ln(6);
    _to("Preloaded message.\n");
    _ln(7);
    _to("From: Max\n");
    _ln(8);
    _to("Unknown message.");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/special_cases/input.toffee"] = {
    bundlePath: "/special_cases/input.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/special_cases/input.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/special_cases/input.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(5);
    _to("\n");
    _ln(6);
    _ts(2);
    _ts(2);
    _ts(1);
    _ts(1);
    _ln(7);
    _to('"' + "PASSED" + '"');
    _ts(2);
    _ts(1);
    _ln(8);
    _to("\n");
    _ln(9);
    _ts(2);
    _ts(1);
    _ln(13);
    _to("\n");
    _ln(14);
    _to("<p>\n");
    _ln(15);
    _to("  ");
    _to("" + (print("<a>" + 'click & clack' + "</a>")));
    _to("\n");
    _ln(16);
    _to("</p>\n");
    _ln(17);
    _ts(2);
    _ts(1);
    _ln(21);
    _to("\n");
    _ln(22);
    _to("A backslash is a \\\n");
    _ln(23);
    _to("<script>\n");
    _ln(24);
    _to(" var passed = \"\\\"passed\\\"\";\n");
    _ln(25);
    _to("</script>");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);

(function() {
  var tmpl;

  tmpl = toffee.templates["/special_cases/output.toffee"] = {
    bundlePath: "/special_cases/output.toffee"
  };

  tmpl.pub = function(locals) {
    var _l, _ln, _t, _to, _ts;
    _l = locals;
    _t = _l.__toffee = {
      out: []
    };
    _to = function(x) {
      return locals.__toffee.out.push(x);
    };
    _ln = function(x) {
      return locals.__toffee.lineno = x;
    };
    _ts = function(x) {
      return locals.__toffee.state = x;
    };
    if (!(_l.print != null)) {
      _l.print = function(o) {
        return toffee.__print(_l, o);
      };
    }
    if (!(_l.json != null)) {
      _l.json = function(o) {
        return toffee.__json(_l, o);
      };
    }
    if (!(_l.raw != null)) {
      _l.raw = function(o) {
        return toffee.__raw(_l, o);
      };
    }
    if (!(_l.html != null)) {
      _l.html = function(o) {
        return toffee.__html(_l, o);
      };
    }
    if (!(_l.escape != null)) {
      _l.escape = function(o) {
        return toffee.__escape(_l, o);
      };
    }
    if (!(_l.partial != null)) {
      _l.partial = function(path, vars) {
        return toffee.__partial(toffee.templates["/special_cases/output.toffee"], _l, path, vars);
      };
    }
    if (!(_l.snippet != null)) {
      _l.snippet = function(path, vars) {
        return toffee.__snippet(toffee.templates["/special_cases/output.toffee"], _l, path, vars);
      };
    }
    _t.print = _l.print;
    _t.json = _l.json;
    _t.raw = _l.raw;
    _t.html = _l.html;
    _t.escape = _l.escape;
    _t.partial = _l.partial;
    _t.snippet = _l.snippet;
    with (locals) {;

    __toffee.out = [];
    _ts(1);
    _ts(1);
    _ln(1);
    _to("\n");
    _ln(2);
    _to('"' + "PASSED\"\n");
    _ln(3);
    _to("\n");
    _ln(4);
    _to("<p>\n");
    _ln(5);
    _to("  <a>click & clack</a>\n");
    _ln(6);
    _to("</p>\n");
    _ln(7);
    _to("\n");
    _ln(8);
    _to("A backslash is a \\\n");
    _ln(9);
    _to("<script>\n");
    _ln(10);
    _to(" var passed = \"\\\"passed\\\"\";\n");
    _ln(11);
    _to("</script>");
    _ts(2);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return tmpl.pub(__toffee_run_input);
  }

}).call(this);
