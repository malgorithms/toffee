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
  var ae;
  if (locals.__toffee.autoEscape != null) {
    ae = locals.__toffee.autoEscape;
  } else if (true) {
    ae = true;
  } else {
    ae = true;
  }
  if (ae) {
    if (o === void 0) return '';
    if ((o != null) && (typeof o) === "object") return locals.json(o);
    return locals.html(o);
  }
  return o;
};

toffee.__augmentLocals = function(locals, bundle_path) {
  var _l, _t;
  _l = locals;
  _t = _l.__toffee = {
    out: []
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
      return toffee.__partial(toffee.templates["" + bundle_path], _l, path, vars);
    };
  }
  if (!(_l.snippet != null)) {
    _l.snippet = function(path, vars) {
      return toffee.__snippet(toffee.templates["" + bundle_path], _l, path, vars);
    };
  }
  _t.print = _l.print;
  _t.json = _l.json;
  _t.raw = _l.raw;
  _t.html = _l.html;
  _t.escape = _l.escape;
  _t.partial = _l.partial;
  return _t.snippet = _l.snippet;
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
