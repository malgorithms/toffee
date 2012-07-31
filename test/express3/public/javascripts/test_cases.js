var toffee;

if (!(typeof toffee !== "undefined" && toffee !== null)) toffee = {};

if (!toffee.templates) toffee.templates = {};

toffee.states = {
  "TOFFEE": 1,
  "COFFEE": 2
};

toffee.__print = function(locals, o) {
  if (locals.__toffee.state === toffee.states.COFFEE) {
    locals.__toffee.out.push(o);
    return '';
  } else {
    return "" + o;
  }
};

toffee.__json = function(locals, o) {
  var json;
  try {
    json = JSON.stringify(o).replace(/</g, '\\u003C').replace(/>/g, '\\u003E').replace(/&/g, '\\u0026');
  } catch (e) {
    throw {
      stack: [],
      message: "JSONify error (" + e.message + ") on line " + locals.__toffee.lineno,
      toffee_line_base: locals.__toffee.lineno
    };
  }
  return "" + json;
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
(function() {

  toffee.templates["/big_file/input.toffee"] = {};

  toffee.templates["/big_file/input.toffee"].pub = function(locals) {
    var count, i, localsPointer, _i;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.COFFEE;
    count = 0;
    for (i = _i = 0; _i < 2; i = ++_i) {
      __toffee.state = toffee.states.TOFFEE;
      __toffee.lineno = 3;
      __toffee.out.push("" + (escape(count++)));
      __toffee.lineno = 4;
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.lineno = 5;
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.lineno = 6;
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.lineno = 7;
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.lineno = 8;
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.lineno = 9;
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.lineno = 10;
      __toffee.out.push("...");
      __toffee.state = toffee.states.COFFEE;
      __toffee.state = toffee.states.COFFEE;
      count += 1;
      print("" + count + "...");
      __toffee.state = toffee.states.TOFFEE;
      __toffee.lineno = 13;
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.lineno = 14;
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.lineno = 15;
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.lineno = 16;
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.lineno = 17;
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.lineno = 18;
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.lineno = 19;
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.out.push("...");
      __toffee.out.push("" + (escape(count++)));
      __toffee.lineno = 20;
      __toffee.out.push("...");
      __toffee.state = toffee.states.COFFEE;
      __toffee.state = toffee.states.COFFEE;
      count += 1;
      print("" + count + "...");
    }
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/big_file/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/big_file/output.toffee"] = {};

  toffee.templates["/big_file/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("0...1...2...3...4...5...6...7...8...9...10...11...12...13...14...15...16...17...18...19...20...21...22...23...24...25...26...27...28...29...30...31...32...33...34...35...36...37...38...39...40...41...42...43...44...45...46...47...48...49...50...51...52...53...54...55...56...57...58...59...60...61...62...63...64...65...66...67...68...70...70...71...72...73...74...75...76...77...78...79...80...81...82...83...84...85...86...87...88...89...90...91...92...93...94...95...96...97...98...99...100...101...102...103...104...105...106...107...108...109...110...111...112...113...114...115...116...117...118...119...120...121...122...123...124...125...126...127...128...129...130...131...132...133...134...135...136...137...138...139...140...141...142...143...144...145...146...147...148...149...150...151...152...153...154...155...156...157...158...159...160...162...162...163...164...165...166...167...168...169...170...171...172...173...174...175...176...177...178...179...180...181...182...183...184...185...186...187...188...189...190...191...192...193...194...195...196...197...198...199...200...201...202...203...204...205...206...207...208...209...210...211...212...213...214...215...216...217...218...219...220...221...222...223...224...225...226...227...228...229...230...232...232...233...234...235...236...237...238...239...240...241...242...243...244...245...246...247...248...249...250...251...252...253...254...255...256...257...258...259...260...261...262...263...264...265...266...267...268...269...270...271...272...273...274...275...276...277...278...279...280...281...282...283...284...285...286...287...288...289...290...291...292...293...294...295...296...297...298...299...300...301...302...303...304...305...306...307...308...309...310...311...312...313...314...315...316...317...318...319...320...321...322...324...");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/big_file/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/comments/input.toffee"] = {};

  toffee.templates["/comments/input.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("\n");
    __toffee.lineno = 2;
    __toffee.out.push("Pass 1\n");
    __toffee.lineno = 3;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 8;
    __toffee.out.push("\n");
    __toffee.lineno = 9;
    __toffee.out.push("Pass 2\n");
    __toffee.lineno = 10;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    /*
      print "FAIL FAIL FAIL"  
      #{ foo }
    */

    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 19;
    __toffee.out.push("\n");
    __toffee.lineno = 20;
    __toffee.out.push("Pass 3\n");
    __toffee.lineno = 21;
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/comments/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/comments/output.toffee"] = {};

  toffee.templates["/comments/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("\n");
    __toffee.lineno = 2;
    __toffee.out.push("Pass 1\n");
    __toffee.lineno = 3;
    __toffee.out.push("\n");
    __toffee.lineno = 4;
    __toffee.out.push("Pass 2\n");
    __toffee.lineno = 5;
    __toffee.out.push("\n");
    __toffee.lineno = 6;
    __toffee.out.push("Pass 3\n");
    __toffee.lineno = 7;
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/comments/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/custom_escape/input.toffee"] = {};

  toffee.templates["/custom_escape/input.toffee"].pub = function(locals) {
    var localsPointer, w, x, y, z;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.COFFEE;
    x = '"Hello world"';
    y = '<td>';
    z = 'click&clack';
    w = [
      1, 2, {
        "place": "The Dreadfort"
      }
    ];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 6;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 7;
    __toffee.out.push(" default x = ");
    __toffee.out.push("" + (x != null ? escape(x) : ''));
    __toffee.out.push("\n");
    __toffee.lineno = 8;
    __toffee.out.push(" default y = ");
    __toffee.out.push("" + (y != null ? escape(y) : ''));
    __toffee.out.push("\n");
    __toffee.lineno = 9;
    __toffee.out.push(" default z = ");
    __toffee.out.push("" + (z != null ? escape(z) : ''));
    __toffee.out.push("\n");
    __toffee.lineno = 10;
    __toffee.out.push(" default w = ");
    __toffee.out.push("" + (w != null ? escape(w) : ''));
    __toffee.out.push("\n");
    __toffee.lineno = 11;
    __toffee.out.push("</p>\n");
    __toffee.lineno = 12;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 13;
    __toffee.out.push(" raw x = ");
    __toffee.out.push("" + (raw(x)));
    __toffee.out.push("\n");
    __toffee.lineno = 14;
    __toffee.out.push(" raw y = ");
    __toffee.out.push("" + (raw(y)));
    __toffee.out.push("\n");
    __toffee.lineno = 15;
    __toffee.out.push(" raw z = ");
    __toffee.out.push("" + (raw(z)));
    __toffee.out.push("\n");
    __toffee.lineno = 16;
    __toffee.out.push(" raw w = ");
    __toffee.out.push("" + (raw(w)));
    __toffee.out.push("\n");
    __toffee.lineno = 17;
    __toffee.out.push("</p>\n");
    __toffee.lineno = 18;
    __toffee.out.push("<script>\n");
    __toffee.lineno = 19;
    __toffee.out.push("  x = ");
    __toffee.out.push("" + (json(x)));
    __toffee.out.push("\n");
    __toffee.lineno = 20;
    __toffee.out.push("  y = ");
    __toffee.out.push("" + (json(y)));
    __toffee.out.push("\n");
    __toffee.lineno = 21;
    __toffee.out.push("  z = ");
    __toffee.out.push("" + (json(z)));
    __toffee.out.push("\n");
    __toffee.lineno = 22;
    __toffee.out.push("  w = ");
    __toffee.out.push("" + (json(w)));
    __toffee.out.push("\n");
    __toffee.lineno = 23;
    __toffee.out.push("</script>\n");
    __toffee.lineno = 24;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 25;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    print(" raw printed x = " + x + "\n");
    print(" raw printed y = " + y + "\n");
    print(" raw printed z = " + z + "\n");
    print(" raw printed w = " + w);
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 30;
    __toffee.out.push("\n");
    __toffee.lineno = 31;
    __toffee.out.push("</p>");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/custom_escape/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/custom_escape/output.toffee"] = {};

  toffee.templates["/custom_escape/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 2;
    __toffee.out.push(" default x = [\"Hello world\"]\n");
    __toffee.lineno = 3;
    __toffee.out.push(" default y = [<td>]\n");
    __toffee.lineno = 4;
    __toffee.out.push(" default z = [click&clack]\n");
    __toffee.lineno = 5;
    __toffee.out.push(" default w = [1,2,[object Object]]\n");
    __toffee.lineno = 6;
    __toffee.out.push("</p>\n");
    __toffee.lineno = 7;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 8;
    __toffee.out.push(" raw x = \"Hello world\"\n");
    __toffee.lineno = 9;
    __toffee.out.push(" raw y = <td>\n");
    __toffee.lineno = 10;
    __toffee.out.push(" raw z = click&clack\n");
    __toffee.lineno = 11;
    __toffee.out.push(" raw w = 1,2,[object Object]\n");
    __toffee.lineno = 12;
    __toffee.out.push("</p>\n");
    __toffee.lineno = 13;
    __toffee.out.push("<script>\n");
    __toffee.lineno = 14;
    __toffee.out.push("  x = \"\"Hello world\"\"\n");
    __toffee.lineno = 15;
    __toffee.out.push("  y = \"\u003Ctd\u003E\"\n");
    __toffee.lineno = 16;
    __toffee.out.push("  z = \"click\u0026clack\"\n");
    __toffee.lineno = 17;
    __toffee.out.push("  w = [1,2,{\"place\":\"The Dreadfort\"}]\n");
    __toffee.lineno = 18;
    __toffee.out.push("</script>\n");
    __toffee.lineno = 19;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 20;
    __toffee.out.push(" raw printed x = \"Hello world\"\n");
    __toffee.lineno = 21;
    __toffee.out.push(" raw printed y = <td>\n");
    __toffee.lineno = 22;
    __toffee.out.push(" raw printed z = click&clack\n");
    __toffee.lineno = 23;
    __toffee.out.push(" raw printed w = 1,2,[object Object]\n");
    __toffee.lineno = 24;
    __toffee.out.push("</p>");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/custom_escape/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/eco_compare/input.toffee"] = {};

  toffee.templates["/eco_compare/input.toffee"].pub = function(locals) {
    var f, friends, localsPointer, project, _i, _len, _ref;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.COFFEE;
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
        __toffee.state = toffee.states.TOFFEE;
        __toffee.lineno = 8;
        __toffee.out.push("\n");
        __toffee.lineno = 9;
        __toffee.out.push("      <a href=" + '"');
        __toffee.out.push("" + (escape(project.url)));
        __toffee.out.push('"' + ">");
        __toffee.out.push("" + (escape(project.name)));
        __toffee.out.push("</a>\n");
        __toffee.lineno = 10;
        __toffee.out.push("      <p>");
        __toffee.out.push("" + (escape(project.description)));
        __toffee.out.push("</p>\n");
        __toffee.lineno = 11;
        __toffee.out.push("    ");
        __toffee.state = toffee.states.COFFEE;
      }
    } else {
      __toffee.state = toffee.states.TOFFEE;
      __toffee.lineno = 12;
      __toffee.out.push(" No projects ");
      __toffee.state = toffee.states.COFFEE;
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
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 20;
    __toffee.out.push("\n");
    __toffee.lineno = 21;
    __toffee.out.push("\n");
    __toffee.lineno = 22;
    __toffee.out.push("You have ");
    __toffee.out.push("" + (escape(((function() {
      var _j, _len1, _results;
      _results = [];
      for (_j = 0, _len1 = friends.length; _j < _len1; _j++) {
        f = friends[_j];
        if (f.gender === "f") _results.push(f);
      }
      return _results;
    })()).length)));
    __toffee.out.push(" female friends.");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/eco_compare/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/eco_compare/output.toffee"] = {};

  toffee.templates["/eco_compare/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("\n");
    __toffee.lineno = 2;
    __toffee.out.push("      <a href=\"http://localhost:3000\">okcupid</a>\n");
    __toffee.lineno = 3;
    __toffee.out.push("      <p>A site for singles</p>\n");
    __toffee.lineno = 4;
    __toffee.out.push("    \n");
    __toffee.lineno = 5;
    __toffee.out.push("      <a href=\"http://localhost:3001\">tallygram</a>\n");
    __toffee.lineno = 6;
    __toffee.out.push("      <p>A site for anyone</p>\n");
    __toffee.lineno = 7;
    __toffee.out.push("    \n");
    __toffee.lineno = 8;
    __toffee.out.push("\n");
    __toffee.lineno = 9;
    __toffee.out.push("You have 3 female friends.");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/eco_compare/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/escape/input.toffee"] = {};

  toffee.templates["/escape/input.toffee"].pub = function(locals) {
    var localsPointer, w, x, y, z;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.COFFEE;
    x = '"Hello world"';
    y = '<td>';
    z = 'click&clack';
    w = [
      1, 2, {
        "place": "The Dreadfort"
      }
    ];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 6;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 7;
    __toffee.out.push(" default x = ");
    __toffee.out.push("" + (x != null ? escape(x) : ''));
    __toffee.out.push("\n");
    __toffee.lineno = 8;
    __toffee.out.push(" default y = ");
    __toffee.out.push("" + (y != null ? escape(y) : ''));
    __toffee.out.push("\n");
    __toffee.lineno = 9;
    __toffee.out.push(" default z = ");
    __toffee.out.push("" + (z != null ? escape(z) : ''));
    __toffee.out.push("\n");
    __toffee.lineno = 10;
    __toffee.out.push(" default w = ");
    __toffee.out.push("" + (w != null ? escape(w) : ''));
    __toffee.out.push("\n");
    __toffee.lineno = 11;
    __toffee.out.push(" default r = ");
    __toffee.out.push("" + (typeof r !== "undefined" && r !== null ? escape(r) : ''));
    __toffee.out.push("\n");
    __toffee.lineno = 12;
    __toffee.out.push(" default w.foo = ");
    __toffee.out.push("" + (escape(w.foo)));
    __toffee.out.push("\n");
    __toffee.lineno = 13;
    __toffee.out.push("</p>\n");
    __toffee.lineno = 14;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 15;
    __toffee.out.push(" raw x = ");
    __toffee.out.push("" + (raw(x)));
    __toffee.out.push("\n");
    __toffee.lineno = 16;
    __toffee.out.push(" raw y = ");
    __toffee.out.push("" + (raw(y)));
    __toffee.out.push("\n");
    __toffee.lineno = 17;
    __toffee.out.push(" raw z = ");
    __toffee.out.push("" + (raw(z)));
    __toffee.out.push("\n");
    __toffee.lineno = 18;
    __toffee.out.push(" raw w = ");
    __toffee.out.push("" + (raw(w)));
    __toffee.out.push("\n");
    __toffee.lineno = 19;
    __toffee.out.push("</p>\n");
    __toffee.lineno = 20;
    __toffee.out.push("<script>\n");
    __toffee.lineno = 21;
    __toffee.out.push("  x = ");
    __toffee.out.push("" + (json(x)));
    __toffee.out.push("\n");
    __toffee.lineno = 22;
    __toffee.out.push("  y = ");
    __toffee.out.push("" + (json(y)));
    __toffee.out.push("\n");
    __toffee.lineno = 23;
    __toffee.out.push("  z = ");
    __toffee.out.push("" + (json(z)));
    __toffee.out.push("\n");
    __toffee.lineno = 24;
    __toffee.out.push("  w = ");
    __toffee.out.push("" + (json(w)));
    __toffee.out.push("\n");
    __toffee.lineno = 25;
    __toffee.out.push("</script>\n");
    __toffee.lineno = 26;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 27;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    print(" raw printed x = " + x + "\n");
    print(" raw printed y = " + y + "\n");
    print(" raw printed z = " + z + "\n");
    print(" raw printed w = " + w);
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 32;
    __toffee.out.push("\n");
    __toffee.lineno = 33;
    __toffee.out.push("</p>\n");
    __toffee.lineno = 34;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 35;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    print(" json printed x = " + (raw(raw(raw(raw(json(x)))))) + "\n");
    print(" json printed y = " + (raw(raw(raw(raw(json(y)))))) + "\n");
    print(" json printed z = " + (raw(raw(raw(raw(json(z)))))) + "\n");
    print(" json printed w = " + (raw(raw(raw(raw(json(w)))))));
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 40;
    __toffee.out.push("\n");
    __toffee.lineno = 41;
    __toffee.out.push("</p>\n");
    __toffee.lineno = 42;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 43;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    print(" html printed longhand x = " + (__toffee.html(x)) + "\n");
    print(" html printed longhand y = " + (__toffee.html(y)) + "\n");
    print(" html printed longhand z = " + (__toffee.html(z)) + "\n");
    print(" html printed longhand w = " + (__toffee.html(w)));
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 48;
    __toffee.out.push("\n");
    __toffee.lineno = 49;
    __toffee.out.push("</p>");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/escape/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/escape/output.toffee"] = {};

  toffee.templates["/escape/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 2;
    __toffee.out.push(" default x = &quot;Hello world&quot;\n");
    __toffee.lineno = 3;
    __toffee.out.push(" default y = &lt;td&gt;\n");
    __toffee.lineno = 4;
    __toffee.out.push(" default z = click&amp;clack\n");
    __toffee.lineno = 5;
    __toffee.out.push(" default w = [1,2,{\"place\":\"The Dreadfort\"}]\n");
    __toffee.lineno = 6;
    __toffee.out.push(" default r = \n");
    __toffee.lineno = 7;
    __toffee.out.push(" default w.foo = \n");
    __toffee.lineno = 8;
    __toffee.out.push("</p>\n");
    __toffee.lineno = 9;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 10;
    __toffee.out.push(" raw x = \"Hello world\"\n");
    __toffee.lineno = 11;
    __toffee.out.push(" raw y = <td>\n");
    __toffee.lineno = 12;
    __toffee.out.push(" raw z = click&clack\n");
    __toffee.lineno = 13;
    __toffee.out.push(" raw w = 1,2,[object Object]\n");
    __toffee.lineno = 14;
    __toffee.out.push("</p>\n");
    __toffee.lineno = 15;
    __toffee.out.push("<script>\n");
    __toffee.lineno = 16;
    __toffee.out.push("  x = \"\"Hello world\"\"\n");
    __toffee.lineno = 17;
    __toffee.out.push("  y = \"\u003Ctd\u003E\"\n");
    __toffee.lineno = 18;
    __toffee.out.push("  z = \"click\u0026clack\"\n");
    __toffee.lineno = 19;
    __toffee.out.push("  w = [1,2,{\"place\":\"The Dreadfort\"}]\n");
    __toffee.lineno = 20;
    __toffee.out.push("</script>\n");
    __toffee.lineno = 21;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 22;
    __toffee.out.push(" raw printed x = \"Hello world\"\n");
    __toffee.lineno = 23;
    __toffee.out.push(" raw printed y = <td>\n");
    __toffee.lineno = 24;
    __toffee.out.push(" raw printed z = click&clack\n");
    __toffee.lineno = 25;
    __toffee.out.push(" raw printed w = 1,2,[object Object]\n");
    __toffee.lineno = 26;
    __toffee.out.push("</p>\n");
    __toffee.lineno = 27;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 28;
    __toffee.out.push(" json printed x = \"\"Hello world\"\"\n");
    __toffee.lineno = 29;
    __toffee.out.push(" json printed y = \"\u003Ctd\u003E\"\n");
    __toffee.lineno = 30;
    __toffee.out.push(" json printed z = \"click\u0026clack\"\n");
    __toffee.lineno = 31;
    __toffee.out.push(" json printed w = [1,2,{\"place\":\"The Dreadfort\"}]\n");
    __toffee.lineno = 32;
    __toffee.out.push("</p>\n");
    __toffee.lineno = 33;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 34;
    __toffee.out.push(" html printed longhand x = &quot;Hello world&quot;\n");
    __toffee.lineno = 35;
    __toffee.out.push(" html printed longhand y = &lt;td&gt;\n");
    __toffee.lineno = 36;
    __toffee.out.push(" html printed longhand z = click&amp;clack\n");
    __toffee.lineno = 37;
    __toffee.out.push(" html printed longhand w = 1,2,[object Object]\n");
    __toffee.lineno = 38;
    __toffee.out.push("</p>");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/escape/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/hello_world/input.toffee"] = {};

  toffee.templates["/hello_world/input.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("" + (typeof greeting !== "undefined" && greeting !== null ? escape(greeting) : ''));
    __toffee.out.push(", world.");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/hello_world/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/hello_world/output.toffee"] = {};

  toffee.templates["/hello_world/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("Hello, world.");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/hello_world/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/hello_world/temp.toffee"] = {};

  toffee.templates["/hello_world/temp.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("a\n");
    __toffee.lineno = 2;
    __toffee.out.push("b\n");
    __toffee.lineno = 3;
    __toffee.out.push("c\n");
    __toffee.lineno = 4;
    __toffee.out.push("" + (escape(passed_fn(100))));
    __toffee.out.push("\n");
    __toffee.lineno = 5;
    __toffee.out.push("d\n");
    __toffee.lineno = 6;
    __toffee.out.push("e\n");
    __toffee.lineno = 7;
    __toffee.out.push("f");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/hello_world/temp.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/include_order/child.toffee"] = {};

  toffee.templates["/include_order/child.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("a\n");
    __toffee.lineno = 2;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    say_hi();
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 4;
    __toffee.out.push("\n");
    __toffee.lineno = 5;
    __toffee.out.push("b");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/include_order/child.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/include_order/input.toffee"] = {};

  toffee.templates["/include_order/input.toffee"].pub = function(locals) {
    var localsPointer, say_hi;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.COFFEE;
    say_hi = function() {
      __toffee.state = toffee.states.TOFFEE;
      __toffee.state = toffee.states.TOFFEE;
      __toffee.lineno = 3;
      __toffee.out.push("hi");
      return __toffee.state = toffee.states.COFFEE;
    };
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 4;
    __toffee.out.push("1\n");
    __toffee.lineno = 5;
    __toffee.out.push("2\n");
    __toffee.lineno = 6;
    __toffee.out.push("" + (partial("child.toffee", {
      say_hi: say_hi
    })));
    __toffee.out.push("\n");
    __toffee.lineno = 7;
    __toffee.out.push("3\n");
    __toffee.lineno = 8;
    __toffee.out.push("4");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/include_order/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/include_order/output.toffee"] = {};

  toffee.templates["/include_order/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("1\n");
    __toffee.lineno = 2;
    __toffee.out.push("2\n");
    __toffee.lineno = 3;
    __toffee.out.push("hia\n");
    __toffee.lineno = 4;
    __toffee.out.push("\n");
    __toffee.lineno = 5;
    __toffee.out.push("b\n");
    __toffee.lineno = 6;
    __toffee.out.push("3\n");
    __toffee.lineno = 7;
    __toffee.out.push("4");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/include_order/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/include_recursion/input.toffee"] = {};

  toffee.templates["/include_recursion/input.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.COFFEE;
    if (countdown === 0) {
      __toffee.state = toffee.states.TOFFEE;
      __toffee.lineno = 2;
      __toffee.out.push("blastoff!");
      __toffee.state = toffee.states.COFFEE;
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
    return toffee.templates["/include_recursion/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/include_recursion/output.toffee"] = {};

  toffee.templates["/include_recursion/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("10...9...8...7...6...5...4...3...2...1...blastoff!");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/include_recursion/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/include_techniques/input.toffee"] = {};

  toffee.templates["/include_techniques/input.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("" + (partial("message.toffee", {
      from: "Chris <ccoyne77@gmail>"
    })));
    __toffee.out.push("\n");
    __toffee.lineno = 2;
    __toffee.out.push("" + (partial("message.toffee", {
      from: "Max & Sam"
    })));
    __toffee.out.push("\n");
    __toffee.lineno = 3;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    print(partial("message.toffee", {
      from: "Christian"
    }));
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 5;
    __toffee.out.push("" + (partial("message.toffee", {
      from: "Jennie"
    })));
    __toffee.state = toffee.states.COFFEE;
    print(partial("message.toffee", {
      sender: "The enemy"
    }));
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/include_techniques/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/include_techniques/message.toffee"] = {};

  toffee.templates["/include_techniques/message.toffee"].pub = function(locals) {
    var from, localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.COFFEE;
    from = from || "Unknown";
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 3;
    __toffee.out.push("From: ");
    __toffee.out.push("" + (from != null ? escape(from) : ''));
    __toffee.out.push(" \n");
    __toffee.lineno = 4;
    __toffee.out.push("Msg:  Hello, world\n");
    __toffee.lineno = 5;
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/include_techniques/message.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/include_techniques/output.toffee"] = {};

  toffee.templates["/include_techniques/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("From: Chris &lt;ccoyne77@gmail&gt; \n");
    __toffee.lineno = 2;
    __toffee.out.push("Msg:  Hello, world\n");
    __toffee.lineno = 3;
    __toffee.out.push("\n");
    __toffee.lineno = 4;
    __toffee.out.push("From: Max &amp; Sam \n");
    __toffee.lineno = 5;
    __toffee.out.push("Msg:  Hello, world\n");
    __toffee.lineno = 6;
    __toffee.out.push("\n");
    __toffee.lineno = 7;
    __toffee.out.push("From: Christian \n");
    __toffee.lineno = 8;
    __toffee.out.push("Msg:  Hello, world\n");
    __toffee.lineno = 9;
    __toffee.out.push("From: Jennie \n");
    __toffee.lineno = 10;
    __toffee.out.push("Msg:  Hello, world\n");
    __toffee.lineno = 11;
    __toffee.out.push("From: Unknown \n");
    __toffee.lineno = 12;
    __toffee.out.push("Msg:  Hello, world\n");
    __toffee.lineno = 13;
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/include_techniques/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/indent_attack/input.toffee"] = {};

  toffee.templates["/indent_attack/input.toffee"].pub = function(locals) {
    var i, localsPointer, x, _i;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("<hr />\n");
    __toffee.lineno = 2;
    __toffee.out.push("    ");
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    if (1 === 1) {
      if (2 === 2) {
        if (3 === 3) {
          __toffee.state = toffee.states.TOFFEE;
          __toffee.lineno = 5;
          __toffee.out.push("Pass1");
          __toffee.state = toffee.states.COFFEE;
        }
      }
    }
    if (1 === 1) {
      if (2 === 3) {
        if (3 === 3) {
          __toffee.state = toffee.states.TOFFEE;
          __toffee.lineno = 9;
          __toffee.out.push("Fail");
          __toffee.state = toffee.states.COFFEE;
        } else {
          __toffee.state = toffee.states.TOFFEE;
          __toffee.lineno = 11;
          __toffee.out.push("Fail");
          __toffee.state = toffee.states.COFFEE;
        }
      } else {
        if (2 === 2) {
          if (3 === 3) {
            __toffee.state = toffee.states.TOFFEE;
            __toffee.lineno = 14;
            __toffee.out.push("Pass2");
            __toffee.state = toffee.states.COFFEE;
          }
        }
      }
    }
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 15;
    __toffee.out.push("\n");
    __toffee.lineno = 16;
    __toffee.out.push("<hr />\n");
    __toffee.lineno = 17;
    __toffee.out.push("\n");
    __toffee.lineno = 18;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    if (1 === 1) {
      if (2 === 2) {
        if (3 === 3) {
          __toffee.state = toffee.states.TOFFEE;
          __toffee.lineno = 21;
          __toffee.out.push("Pass3");
          __toffee.state = toffee.states.COFFEE;
        }
      }
    }
    if (1 === 1) {
      if (2 === 3) {
        if (3 === 3) {
          __toffee.state = toffee.states.TOFFEE;
          __toffee.lineno = 25;
          __toffee.out.push("Fail");
          __toffee.state = toffee.states.COFFEE;
        } else {
          __toffee.state = toffee.states.TOFFEE;
          __toffee.lineno = 27;
          __toffee.out.push("Fail");
          __toffee.state = toffee.states.COFFEE;
        }
      } else {
        if (2 === 2) {
          if (3 === 3) {
            __toffee.state = toffee.states.TOFFEE;
            __toffee.lineno = 30;
            __toffee.out.push("Pass4");
            __toffee.state = toffee.states.COFFEE;
          }
        }
      }
    }
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 31;
    __toffee.out.push("\n");
    __toffee.lineno = 32;
    __toffee.out.push("<hr />\n");
    __toffee.lineno = 33;
    __toffee.out.push("\n");
    __toffee.lineno = 34;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    if (10 === 10) {
      if (20 === 20) {
        if (30 === 30) {
          __toffee.state = toffee.states.TOFFEE;
          __toffee.lineno = 37;
          __toffee.out.push("Pass5");
          __toffee.state = toffee.states.COFFEE;
        }
      }
    }
    if (10 === 10) {
      if (20 === 30) {
        if (30 === 30) {
          __toffee.state = toffee.states.TOFFEE;
          __toffee.lineno = 41;
          __toffee.out.push("Fail");
          __toffee.state = toffee.states.COFFEE;
        } else {
          __toffee.state = toffee.states.TOFFEE;
          __toffee.lineno = 43;
          __toffee.out.push("Fail");
          __toffee.state = toffee.states.COFFEE;
        }
      } else {
        if (20 === 20) {
          if (30 === 30) {
            __toffee.state = toffee.states.TOFFEE;
            __toffee.lineno = 46;
            __toffee.out.push("Pass6");
            __toffee.state = toffee.states.COFFEE;
          }
        }
      }
    }
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 47;
    __toffee.out.push("\n");
    __toffee.lineno = 48;
    __toffee.out.push("\n");
    __toffee.lineno = 49;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    if (99 === 99) {
      print('Pass7');
    } else {
      print('Fail');
      __toffee.state = toffee.states.TOFFEE;
      __toffee.lineno = 54;
      __toffee.out.push("Fail8");
      __toffee.state = toffee.states.COFFEE;
    }
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 55;
    __toffee.out.push("Pass8");
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 56;
    __toffee.out.push("\n");
    __toffee.lineno = 57;
    __toffee.out.push("\n");
    __toffee.lineno = 58;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 60;
    __toffee.out.push("...passed with flying colors.");
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 61;
    __toffee.out.push("\n");
    __toffee.lineno = 62;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 63;
    __toffee.out.push(" ");
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    x = 10;
    if (x > 1) {
      for (i = _i = 0; 0 <= x ? _i < x : _i > x; i = 0 <= x ? ++_i : --_i) {
        __toffee.state = toffee.states.TOFFEE;
        __toffee.lineno = 67;
        __toffee.out.push("<br />");
        __toffee.out.push("" + (i != null ? escape(i) : ''));
        __toffee.state = toffee.states.COFFEE;
        __toffee.state = toffee.states.COFFEE;
        if (i === 3) {
          __toffee.state = toffee.states.TOFFEE;
          __toffee.lineno = 68;
          __toffee.out.push(" (my favorite number) ");
          __toffee.state = toffee.states.COFFEE;
        }
      }
    }
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 70;
    __toffee.out.push("\n");
    __toffee.lineno = 71;
    __toffee.out.push("</p>");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/indent_attack/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/indent_attack/output.toffee"] = {};

  toffee.templates["/indent_attack/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("<hr />\n");
    __toffee.lineno = 2;
    __toffee.out.push("    Pass1Pass2\n");
    __toffee.lineno = 3;
    __toffee.out.push("<hr />\n");
    __toffee.lineno = 4;
    __toffee.out.push("\n");
    __toffee.lineno = 5;
    __toffee.out.push("Pass3Pass4\n");
    __toffee.lineno = 6;
    __toffee.out.push("<hr />\n");
    __toffee.lineno = 7;
    __toffee.out.push("\n");
    __toffee.lineno = 8;
    __toffee.out.push("Pass5Pass6\n");
    __toffee.lineno = 9;
    __toffee.out.push("\n");
    __toffee.lineno = 10;
    __toffee.out.push("Pass7Pass8\n");
    __toffee.lineno = 11;
    __toffee.out.push("\n");
    __toffee.lineno = 12;
    __toffee.out.push("...passed with flying colors.\n");
    __toffee.lineno = 13;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 14;
    __toffee.out.push(" <br />0<br />1<br />2<br />3 (my favorite number) <br />4<br />5<br />6<br />7<br />8<br />9\n");
    __toffee.lineno = 15;
    __toffee.out.push("</p>");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/indent_attack/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/junk/input.toffee"] = {};

  toffee.templates["/junk/input.toffee"].pub = function(locals) {
    var localsPointer, supplies, supply, _i, _len;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.COFFEE;
    supplies = ["broom", "mop", "vacuum"];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 3;
    __toffee.out.push("<ul>\n");
    __toffee.lineno = 4;
    __toffee.out.push("  ");
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    for (_i = 0, _len = supplies.length; _i < _len; _i++) {
      supply = supplies[_i];
      __toffee.state = toffee.states.TOFFEE;
      __toffee.out.push("<li>");
      __toffee.out.push("" + (supply != null ? escape(supply) : ''));
      __toffee.out.push("</li>");
      __toffee.state = toffee.states.COFFEE;
    }
    __toffee.state = toffee.states.TOFFEE;
    __toffee.out.push("\n");
    __toffee.lineno = 5;
    __toffee.out.push("</ul>");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/junk/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/junk/output.toffee"] = {};

  toffee.templates["/junk/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("<ul>\n");
    __toffee.lineno = 2;
    __toffee.out.push("  <li>broom</li><li>mop</li><li>vacuum</li>\n");
    __toffee.lineno = 3;
    __toffee.out.push("</ul>");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/junk/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/lambda_fns/input.toffee"] = {};

  toffee.templates["/lambda_fns/input.toffee"].pub = function(locals) {
    var echo_it, localsPointer, print_it, print_it_twice;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.COFFEE;
    print_it = function(msg) {
      __toffee.state = toffee.states.TOFFEE;
      __toffee.lineno = 2;
      __toffee.out.push("" + (msg != null ? escape(msg) : ''));
      return __toffee.state = toffee.states.COFFEE;
    };
    print_it_twice = function(msg) {
      var m;
      __toffee.state = toffee.states.TOFFEE;
      __toffee.state = toffee.states.TOFFEE;
      __toffee.lineno = 5;
      __toffee.out.push("" + (msg != null ? escape(msg) : ''));
      __toffee.state = toffee.states.COFFEE;
      m = msg;
      __toffee.state = toffee.states.TOFFEE;
      __toffee.state = toffee.states.TOFFEE;
      __toffee.lineno = 7;
      __toffee.out.push("" + (m != null ? escape(m) : ''));
      return __toffee.state = toffee.states.COFFEE;
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
    return toffee.templates["/lambda_fns/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/lambda_fns/output.toffee"] = {};

  toffee.templates["/lambda_fns/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("PassPassPassPass");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/lambda_fns/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/multiline_interpolation/foo.toffee"] = {};

  toffee.templates["/multiline_interpolation/foo.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("" + (typeof a !== "undefined" && a !== null ? escape(a) : ''));
    __toffee.out.push(" ");
    __toffee.out.push("" + (typeof b !== "undefined" && b !== null ? escape(b) : ''));
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/multiline_interpolation/foo.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/multiline_interpolation/input.toffee"] = {};

  toffee.templates["/multiline_interpolation/input.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("" + (escape("Hello, " + "world")));
    __toffee.lineno = 4;
    __toffee.out.push("\n");
    __toffee.lineno = 5;
    __toffee.out.push("<hr />\n");
    __toffee.lineno = 6;
    __toffee.out.push("" + (partial("foo.toffee", {
      a: "Goodbye" + ',',
      b: "world"
    })));
    __toffee.lineno = 10;
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/multiline_interpolation/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/multiline_interpolation/output.toffee"] = {};

  toffee.templates["/multiline_interpolation/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("Hello, world\n");
    __toffee.lineno = 2;
    __toffee.out.push("<hr />\n");
    __toffee.lineno = 3;
    __toffee.out.push("Goodbye, world");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/multiline_interpolation/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/plaintext/input.toffee"] = {};

  toffee.templates["/plaintext/input.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("Hi there.");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/plaintext/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/plaintext/output.toffee"] = {};

  toffee.templates["/plaintext/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("Hi there.");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/plaintext/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/snippets/foo/bar/body.toffee"] = {};

  toffee.templates["/snippets/foo/bar/body.toffee"].pub = function(locals) {
    var localsPointer, msg;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.COFFEE;
    msg = msg || "Unknown message";
    print(msg);
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/snippets/foo/bar/body.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/snippets/foo/message.toffee"] = {};

  toffee.templates["/snippets/foo/message.toffee"].pub = function(locals) {
    var from, localsPointer, msg;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.COFFEE;
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
    return toffee.templates["/snippets/foo/message.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/snippets/input.toffee"] = {};

  toffee.templates["/snippets/input.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("" + (partial("./foo/message.toffee")));
    __toffee.out.push("\n");
    __toffee.lineno = 2;
    __toffee.out.push("" + (escape(snippet("./foo/message.toffee"))));
    __toffee.out.push("\n");
    __toffee.lineno = 3;
    __toffee.out.push("" + (partial("./foo/message.toffee", {
      from: "Sam"
    })));
    __toffee.out.push("\n");
    __toffee.lineno = 4;
    __toffee.out.push("" + (escape(snippet("./foo/message.toffee", {
      from: "Max"
    }))));
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/snippets/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/snippets/output.toffee"] = {};

  toffee.templates["/snippets/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("From: Preloaded sender\n");
    __toffee.lineno = 2;
    __toffee.out.push("Preloaded message.\n");
    __toffee.lineno = 3;
    __toffee.out.push("From: Unknown sender\n");
    __toffee.lineno = 4;
    __toffee.out.push("Unknown message.\n");
    __toffee.lineno = 5;
    __toffee.out.push("From: Sam\n");
    __toffee.lineno = 6;
    __toffee.out.push("Preloaded message.\n");
    __toffee.lineno = 7;
    __toffee.out.push("From: Max\n");
    __toffee.lineno = 8;
    __toffee.out.push("Unknown message.");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/snippets/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/special_cases/input.toffee"] = {};

  toffee.templates["/special_cases/input.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 5;
    __toffee.out.push("\n");
    __toffee.lineno = 6;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 7;
    __toffee.out.push('"' + "PASSED" + '"');
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 8;
    __toffee.out.push("\n");
    __toffee.lineno = 9;
    __toffee.state = toffee.states.COFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 13;
    __toffee.out.push("\n");
    __toffee.lineno = 14;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 15;
    __toffee.out.push("  ");
    __toffee.out.push("" + (print("<a>" + 'click & clack' + "</a>")));
    __toffee.out.push("\n");
    __toffee.lineno = 16;
    __toffee.out.push("</p>");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/special_cases/input.toffee"].pub(__toffee_run_input);
  }

}).call(this);
(function() {

  toffee.templates["/special_cases/output.toffee"] = {};

  toffee.templates["/special_cases/output.toffee"].pub = function(locals) {
    var localsPointer;
    localsPointer = locals;
    locals.__toffee = {};
    if (!(locals.print != null)) {
      locals.print = function(o) {
        return toffee.__print(localsPointer, o);
      };
    }
    if (!(locals.json != null)) {
      locals.json = function(o) {
        return toffee.__json(localsPointer, o);
      };
    }
    if (!(locals.raw != null)) {
      locals.raw = function(o) {
        return toffee.__raw(localsPointer, o);
      };
    }
    if (!(locals.html != null)) {
      locals.html = function(o) {
        return toffee.__html(localsPointer, o);
      };
    }
    if (!(locals.escape != null)) {
      locals.escape = function(o) {
        return toffee.__escape(localsPointer, o);
      };
    }
    locals.__toffee.print = locals.print;
    locals.__toffee.json = locals.json;
    locals.__toffee.raw = locals.raw;
    locals.__toffee.html = locals.html;
    locals.__toffee.escape = locals.escape;
    with (locals) {;

    __toffee.out = [];
    __toffee.state = toffee.states.TOFFEE;
    __toffee.state = toffee.states.TOFFEE;
    __toffee.lineno = 1;
    __toffee.out.push("\n");
    __toffee.lineno = 2;
    __toffee.out.push('"' + "PASSED\"\n");
    __toffee.lineno = 3;
    __toffee.out.push("\n");
    __toffee.lineno = 4;
    __toffee.out.push("<p>\n");
    __toffee.lineno = 5;
    __toffee.out.push("  <a>click & clack</a>\n");
    __toffee.lineno = 6;
    __toffee.out.push("</p>");
    __toffee.state = toffee.states.COFFEE;
    __toffee.res = __toffee.out.join("");
    return __toffee.res;
    return } /* closing JS 'with' */ ;
  };

  if (typeof __toffee_run_input !== "undefined" && __toffee_run_input !== null) {
    return toffee.templates["/special_cases/output.toffee"].pub(__toffee_run_input);
  }

}).call(this);
