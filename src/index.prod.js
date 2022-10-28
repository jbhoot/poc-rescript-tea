(() => {
  // node_modules/rescript-tea/src/web_node.bs.js
  function setStyle(n, key, value3) {
    n.style[key] = value3;
  }
  function setStyleProperty(n, priorityOpt, key, value3) {
    var priority = priorityOpt !== void 0 ? priorityOpt : false;
    var style2 = n.style;
    var _valid = style2.setProperty;
    if (_valid !== void 0) {
      key.setProperty__(value3, priority ? "important" : null);
      return;
    } else {
      return setStyle(n, key, value3);
    }
  }
  function setAttributeNS(n, namespace, key, value3) {
    n.setAttributeNS(namespace, key, value3);
  }
  function setAttribute(n, key, value3) {
    n.setAttribute(key, value3);
  }
  function setAttributeNsOptional(n, namespace, key, value3) {
    if (namespace === "") {
      return setAttribute(n, key, value3);
    } else {
      return setAttributeNS(n, namespace, key, value3);
    }
  }
  function removeAttributeNS(n, namespace, key) {
    n.removeAttributeNS(namespace, key);
  }
  function removeAttributeNsOptional(n, namespace, key) {
    if (namespace !== "") {
      return removeAttributeNS(n, namespace, key);
    }
    n.removeAttribute(key);
  }
  function addEventListener(n, typ, listener, options) {
    n.addEventListener(typ, listener, options);
  }
  function removeEventListener(n, typ, listener, options) {
    n.removeEventListener(typ, listener, options);
  }
  function remove_polyfill(param) {
    (function() {
      if (!("remove" in Element.prototype)) {
        Element.prototype.remove = function() {
          if (this.parentNode) {
            this.parentNode.removeChild(this);
          }
        };
      }
      ;
    })();
  }

  // node_modules/rescript-tea/src/web_window.bs.js
  function requestAnimationFrame_polyfill(param) {
    (function() {
      var lastTime = 0;
      var vendors = ["ms", "moz", "webkit", "o"];
      for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
      }
      if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id3 = window.setTimeout(
            function() {
              callback(currTime + timeToCall);
            },
            timeToCall
          );
          lastTime = currTime + timeToCall;
          return id3;
        };
      if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id3) {
          clearTimeout(id3);
        };
    })();
  }

  // node_modules/rescript-tea/src/web.bs.js
  function polyfills(param) {
    remove_polyfill(void 0);
    requestAnimationFrame_polyfill(void 0);
  }

  // node_modules/rescript/lib/es6/caml_array.js
  function sub(x, offset, len) {
    var result = new Array(len);
    var j = 0;
    var i = offset;
    while (j < len) {
      result[j] = x[i];
      j = j + 1 | 0;
      i = i + 1 | 0;
    }
    ;
    return result;
  }
  function get(xs, index2) {
    if (index2 < 0 || index2 >= xs.length) {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "index out of bounds",
        Error: new Error()
      };
    }
    return xs[index2];
  }
  function make(len, init) {
    var b = new Array(len);
    for (var i = 0; i < len; ++i) {
      b[i] = init;
    }
    return b;
  }

  // node_modules/rescript/lib/es6/curry.js
  function app(_f, _args) {
    while (true) {
      var args = _args;
      var f = _f;
      var init_arity = f.length;
      var arity = init_arity === 0 ? 1 : init_arity;
      var len = args.length;
      var d = arity - len | 0;
      if (d === 0) {
        return f.apply(null, args);
      }
      if (d >= 0) {
        return function(f2, args2) {
          return function(x) {
            return app(f2, args2.concat([x]));
          };
        }(f, args);
      }
      _args = sub(args, arity, -d | 0);
      _f = f.apply(null, sub(args, 0, arity));
      continue;
    }
    ;
  }
  function _1(o, a0) {
    var arity = o.length;
    if (arity === 1) {
      return o(a0);
    } else {
      switch (arity) {
        case 1:
          return o(a0);
        case 2:
          return function(param) {
            return o(a0, param);
          };
        case 3:
          return function(param, param$1) {
            return o(a0, param, param$1);
          };
        case 4:
          return function(param, param$1, param$2) {
            return o(a0, param, param$1, param$2);
          };
        case 5:
          return function(param, param$1, param$2, param$3) {
            return o(a0, param, param$1, param$2, param$3);
          };
        case 6:
          return function(param, param$1, param$2, param$3, param$4) {
            return o(a0, param, param$1, param$2, param$3, param$4);
          };
        case 7:
          return function(param, param$1, param$2, param$3, param$4, param$5) {
            return o(a0, param, param$1, param$2, param$3, param$4, param$5);
          };
        default:
          return app(o, [a0]);
      }
    }
  }
  function _2(o, a0, a1) {
    var arity = o.length;
    if (arity === 2) {
      return o(a0, a1);
    } else {
      switch (arity) {
        case 1:
          return app(o(a0), [a1]);
        case 2:
          return o(a0, a1);
        case 3:
          return function(param) {
            return o(a0, a1, param);
          };
        case 4:
          return function(param, param$1) {
            return o(a0, a1, param, param$1);
          };
        case 5:
          return function(param, param$1, param$2) {
            return o(a0, a1, param, param$1, param$2);
          };
        case 6:
          return function(param, param$1, param$2, param$3) {
            return o(a0, a1, param, param$1, param$2, param$3);
          };
        case 7:
          return function(param, param$1, param$2, param$3, param$4) {
            return o(a0, a1, param, param$1, param$2, param$3, param$4);
          };
        default:
          return app(o, [
            a0,
            a1
          ]);
      }
    }
  }
  function _3(o, a0, a1, a2) {
    var arity = o.length;
    if (arity === 3) {
      return o(a0, a1, a2);
    } else {
      switch (arity) {
        case 1:
          return app(o(a0), [
            a1,
            a2
          ]);
        case 2:
          return app(o(a0, a1), [a2]);
        case 3:
          return o(a0, a1, a2);
        case 4:
          return function(param) {
            return o(a0, a1, a2, param);
          };
        case 5:
          return function(param, param$1) {
            return o(a0, a1, a2, param, param$1);
          };
        case 6:
          return function(param, param$1, param$2) {
            return o(a0, a1, a2, param, param$1, param$2);
          };
        case 7:
          return function(param, param$1, param$2, param$3) {
            return o(a0, a1, a2, param, param$1, param$2, param$3);
          };
        default:
          return app(o, [
            a0,
            a1,
            a2
          ]);
      }
    }
  }
  function _4(o, a0, a1, a2, a3) {
    var arity = o.length;
    if (arity === 4) {
      return o(a0, a1, a2, a3);
    } else {
      switch (arity) {
        case 1:
          return app(o(a0), [
            a1,
            a2,
            a3
          ]);
        case 2:
          return app(o(a0, a1), [
            a2,
            a3
          ]);
        case 3:
          return app(o(a0, a1, a2), [a3]);
        case 4:
          return o(a0, a1, a2, a3);
        case 5:
          return function(param) {
            return o(a0, a1, a2, a3, param);
          };
        case 6:
          return function(param, param$1) {
            return o(a0, a1, a2, a3, param, param$1);
          };
        case 7:
          return function(param, param$1, param$2) {
            return o(a0, a1, a2, a3, param, param$1, param$2);
          };
        default:
          return app(o, [
            a0,
            a1,
            a2,
            a3
          ]);
      }
    }
  }
  function _5(o, a0, a1, a2, a3, a4) {
    var arity = o.length;
    if (arity === 5) {
      return o(a0, a1, a2, a3, a4);
    } else {
      switch (arity) {
        case 1:
          return app(o(a0), [
            a1,
            a2,
            a3,
            a4
          ]);
        case 2:
          return app(o(a0, a1), [
            a2,
            a3,
            a4
          ]);
        case 3:
          return app(o(a0, a1, a2), [
            a3,
            a4
          ]);
        case 4:
          return app(o(a0, a1, a2, a3), [a4]);
        case 5:
          return o(a0, a1, a2, a3, a4);
        case 6:
          return function(param) {
            return o(a0, a1, a2, a3, a4, param);
          };
        case 7:
          return function(param, param$1) {
            return o(a0, a1, a2, a3, a4, param, param$1);
          };
        default:
          return app(o, [
            a0,
            a1,
            a2,
            a3,
            a4
          ]);
      }
    }
  }
  function _6(o, a0, a1, a2, a3, a4, a5) {
    var arity = o.length;
    if (arity === 6) {
      return o(a0, a1, a2, a3, a4, a5);
    } else {
      switch (arity) {
        case 1:
          return app(o(a0), [
            a1,
            a2,
            a3,
            a4,
            a5
          ]);
        case 2:
          return app(o(a0, a1), [
            a2,
            a3,
            a4,
            a5
          ]);
        case 3:
          return app(o(a0, a1, a2), [
            a3,
            a4,
            a5
          ]);
        case 4:
          return app(o(a0, a1, a2, a3), [
            a4,
            a5
          ]);
        case 5:
          return app(o(a0, a1, a2, a3, a4), [a5]);
        case 6:
          return o(a0, a1, a2, a3, a4, a5);
        case 7:
          return function(param) {
            return o(a0, a1, a2, a3, a4, a5, param);
          };
        default:
          return app(o, [
            a0,
            a1,
            a2,
            a3,
            a4,
            a5
          ]);
      }
    }
  }
  function _7(o, a0, a1, a2, a3, a4, a5, a6) {
    var arity = o.length;
    if (arity === 7) {
      return o(a0, a1, a2, a3, a4, a5, a6);
    } else {
      switch (arity) {
        case 1:
          return app(o(a0), [
            a1,
            a2,
            a3,
            a4,
            a5,
            a6
          ]);
        case 2:
          return app(o(a0, a1), [
            a2,
            a3,
            a4,
            a5,
            a6
          ]);
        case 3:
          return app(o(a0, a1, a2), [
            a3,
            a4,
            a5,
            a6
          ]);
        case 4:
          return app(o(a0, a1, a2, a3), [
            a4,
            a5,
            a6
          ]);
        case 5:
          return app(o(a0, a1, a2, a3, a4), [
            a5,
            a6
          ]);
        case 6:
          return app(o(a0, a1, a2, a3, a4, a5), [a6]);
        case 7:
          return o(a0, a1, a2, a3, a4, a5, a6);
        default:
          return app(o, [
            a0,
            a1,
            a2,
            a3,
            a4,
            a5,
            a6
          ]);
      }
    }
  }
  function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
    var arity = o.length;
    if (arity === 8) {
      return o(a0, a1, a2, a3, a4, a5, a6, a7);
    } else {
      switch (arity) {
        case 1:
          return app(o(a0), [
            a1,
            a2,
            a3,
            a4,
            a5,
            a6,
            a7
          ]);
        case 2:
          return app(o(a0, a1), [
            a2,
            a3,
            a4,
            a5,
            a6,
            a7
          ]);
        case 3:
          return app(o(a0, a1, a2), [
            a3,
            a4,
            a5,
            a6,
            a7
          ]);
        case 4:
          return app(o(a0, a1, a2, a3), [
            a4,
            a5,
            a6,
            a7
          ]);
        case 5:
          return app(o(a0, a1, a2, a3, a4), [
            a5,
            a6,
            a7
          ]);
        case 6:
          return app(o(a0, a1, a2, a3, a4, a5), [
            a6,
            a7
          ]);
        case 7:
          return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
        default:
          return app(o, [
            a0,
            a1,
            a2,
            a3,
            a4,
            a5,
            a6,
            a7
          ]);
      }
    }
  }

  // node_modules/rescript/lib/es6/caml_obj.js
  var for_in = function(o, foo) {
    for (var x in o) {
      foo(x);
    }
  };
  function equal(a, b) {
    if (a === b) {
      return true;
    }
    var a_type = typeof a;
    if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
      return false;
    }
    var b_type = typeof b;
    if (a_type === "function" || b_type === "function") {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "equal: functional value",
        Error: new Error()
      };
    }
    if (b_type === "number" || b_type === "undefined" || b === null) {
      return false;
    }
    var tag_a = a.TAG | 0;
    var tag_b = b.TAG | 0;
    if (tag_a === 248) {
      return a[1] === b[1];
    }
    if (tag_a === 251) {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "equal: abstract value",
        Error: new Error()
      };
    }
    if (tag_a !== tag_b) {
      return false;
    }
    var len_a = a.length | 0;
    var len_b = b.length | 0;
    if (len_a === len_b) {
      if (Array.isArray(a)) {
        var _i = 0;
        while (true) {
          var i = _i;
          if (i === len_a) {
            return true;
          }
          if (!equal(a[i], b[i])) {
            return false;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      } else if (a instanceof Date && b instanceof Date) {
        return !(a > b || a < b);
      } else {
        var result = {
          contents: true
        };
        var do_key_a = function(key) {
          if (!Object.prototype.hasOwnProperty.call(b, key)) {
            result.contents = false;
            return;
          }
        };
        var do_key_b = function(key) {
          if (!Object.prototype.hasOwnProperty.call(a, key) || !equal(b[key], a[key])) {
            result.contents = false;
            return;
          }
        };
        for_in(a, do_key_a);
        if (result.contents) {
          for_in(b, do_key_b);
        }
        return result.contents;
      }
    } else {
      return false;
    }
  }

  // node_modules/rescript/lib/es6/caml_string.js
  function make2(n, ch) {
    return String.fromCharCode(ch).repeat(n);
  }

  // node_modules/rescript/lib/es6/caml_exceptions.js
  var id = {
    contents: 0
  };
  function create(str) {
    id.contents = id.contents + 1 | 0;
    return str + ("/" + id.contents);
  }
  function is_extension(e) {
    if (e == null) {
      return false;
    } else {
      return typeof e.RE_EXN_ID === "string";
    }
  }

  // node_modules/rescript/lib/es6/caml_option.js
  function some(x) {
    if (x === void 0) {
      return {
        BS_PRIVATE_NESTED_SOME_NONE: 0
      };
    } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
      return {
        BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
      };
    } else {
      return x;
    }
  }
  function valFromOption(x) {
    if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
      return x;
    }
    var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
    if (depth === 0) {
      return;
    } else {
      return {
        BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
      };
    }
  }

  // node_modules/rescript/lib/es6/caml_js_exceptions.js
  function internalToOCamlException(e) {
    if (is_extension(e)) {
      return e;
    } else {
      return {
        RE_EXN_ID: "JsError",
        _1: e
      };
    }
  }

  // node_modules/rescript/lib/es6/pervasives.js
  var min_int = -2147483648;
  function $at(l1, l2) {
    if (l1) {
      return {
        hd: l1.hd,
        tl: $at(l1.tl, l2)
      };
    } else {
      return l2;
    }
  }
  var max_int2 = 2147483647;

  // node_modules/rescript/lib/es6/list.js
  function rev_append(_l1, _l2) {
    while (true) {
      var l2 = _l2;
      var l1 = _l1;
      if (!l1) {
        return l2;
      }
      _l2 = {
        hd: l1.hd,
        tl: l2
      };
      _l1 = l1.tl;
      continue;
    }
    ;
  }
  function rev(l) {
    return rev_append(l, 0);
  }
  function map(f, param) {
    if (!param) {
      return 0;
    }
    var r = _1(f, param.hd);
    return {
      hd: r,
      tl: map(f, param.tl)
    };
  }
  function iter(f, _param) {
    while (true) {
      var param = _param;
      if (!param) {
        return;
      }
      _1(f, param.hd);
      _param = param.tl;
      continue;
    }
    ;
  }
  function fold_left(f, _accu, _l) {
    while (true) {
      var l = _l;
      var accu = _accu;
      if (!l) {
        return accu;
      }
      _l = l.tl;
      _accu = _2(f, accu, l.hd);
      continue;
    }
    ;
  }
  function fold_right(f, l, accu) {
    if (l) {
      return _2(f, l.hd, fold_right(f, l.tl, accu));
    } else {
      return accu;
    }
  }
  function fold_left2(f, _accu, _l1, _l2) {
    while (true) {
      var l2 = _l2;
      var l1 = _l1;
      var accu = _accu;
      if (l1) {
        if (l2) {
          _l2 = l2.tl;
          _l1 = l1.tl;
          _accu = _3(f, accu, l1.hd, l2.hd);
          continue;
        }
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.fold_left2",
          Error: new Error()
        };
      }
      if (l2) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.fold_left2",
          Error: new Error()
        };
      }
      return accu;
    }
    ;
  }
  function find_all(p) {
    return function(param) {
      var _accu = 0;
      var _param = param;
      while (true) {
        var param$1 = _param;
        var accu = _accu;
        if (!param$1) {
          return rev_append(accu, 0);
        }
        var l = param$1.tl;
        var x = param$1.hd;
        if (_1(p, x)) {
          _param = l;
          _accu = {
            hd: x,
            tl: accu
          };
          continue;
        }
        _param = l;
        continue;
      }
      ;
    };
  }
  var append = $at;
  var filter = find_all;

  // node_modules/rescript/lib/es6/belt_List.js
  function length(xs) {
    var _x = xs;
    var _acc = 0;
    while (true) {
      var acc = _acc;
      var x = _x;
      if (!x) {
        return acc;
      }
      _acc = acc + 1 | 0;
      _x = x.tl;
      continue;
    }
    ;
  }
  function fillAux(arr, _i, _x) {
    while (true) {
      var x = _x;
      var i = _i;
      if (!x) {
        return;
      }
      arr[i] = x.hd;
      _x = x.tl;
      _i = i + 1 | 0;
      continue;
    }
    ;
  }
  function toArray(x) {
    var len = length(x);
    var arr = new Array(len);
    fillAux(arr, 0, x);
    return arr;
  }

  // node_modules/rescript-tea/src/web_document.bs.js
  function createElementNsOptional(namespace, tagName) {
    if (namespace === "") {
      return document.createElement(tagName);
    } else {
      return document.createElementNS(namespace, tagName);
    }
  }

  // node_modules/rescript-tea/src/vdom.bs.js
  var noNode = {
    TAG: 0,
    _0: ""
  };
  function fullnode(namespace, tagName, key, unique, props, vdoms) {
    return {
      TAG: 2,
      _0: namespace,
      _1: tagName,
      _2: key,
      _3: unique,
      _4: props,
      _5: vdoms
    };
  }
  function onCB(name2, key, cb) {
    return {
      TAG: 3,
      _0: name2,
      _1: {
        TAG: 0,
        _0: key,
        _1: cb
      },
      _2: {
        contents: void 0
      }
    };
  }
  function onMsg(name2, msg) {
    return {
      TAG: 3,
      _0: name2,
      _1: {
        TAG: 1,
        _0: msg
      },
      _2: {
        contents: void 0
      }
    };
  }
  function style(key, value3) {
    return {
      TAG: 4,
      _0: {
        hd: [
          key,
          value3
        ],
        tl: 0
      }
    };
  }
  function renderToHtmlString(_x) {
    while (true) {
      var x = _x;
      switch (x.TAG | 0) {
        case 0:
          return "<!-- " + (x._0 + " -->");
        case 1:
          return x._0;
        case 2:
          var tagName = x._1;
          var namespace = x._0;
          var xs = map(function(p) {
            if (typeof p === "number") {
              return "";
            }
            switch (p.TAG | 0) {
              case 0:
                var xs_12 = {
                  hd: p._0,
                  tl: {
                    hd: '="',
                    tl: {
                      hd: p._1,
                      tl: {
                        hd: '"',
                        tl: 0
                      }
                    }
                  }
                };
                var xs2 = {
                  hd: " ",
                  tl: xs_12
                };
                return toArray(xs2).join("");
              case 1:
                var xs_1$1 = {
                  hd: p._1,
                  tl: {
                    hd: '="',
                    tl: {
                      hd: p._2,
                      tl: {
                        hd: '"',
                        tl: 0
                      }
                    }
                  }
                };
                var xs$12 = {
                  hd: " ",
                  tl: xs_1$1
                };
                return toArray(xs$12).join("");
              case 2:
                var xs_1$2 = {
                  hd: p._0,
                  tl: {
                    hd: '="',
                    tl: {
                      hd: p._1,
                      tl: {
                        hd: '"',
                        tl: 0
                      }
                    }
                  }
                };
                var xs$22 = {
                  hd: " data-",
                  tl: xs_1$2
                };
                return toArray(xs$22).join("");
              case 3:
                return "";
              case 4:
                var xs$3 = map(function(param) {
                  var xs_0 = param[0];
                  var xs_13 = {
                    hd: ":",
                    tl: {
                      hd: param[1],
                      tl: {
                        hd: ";",
                        tl: 0
                      }
                    }
                  };
                  var xs3 = {
                    hd: xs_0,
                    tl: xs_13
                  };
                  return toArray(xs3).join("");
                }, p._0);
                var xs_1$3 = {
                  hd: toArray(xs$3).join(";"),
                  tl: {
                    hd: '"',
                    tl: 0
                  }
                };
                var xs$4 = {
                  hd: ' style="',
                  tl: xs_1$3
                };
                return toArray(xs$4).join("");
            }
          }, x._4);
          var xs$1 = map(renderToHtmlString, x._5);
          var xs_1 = {
            hd: namespace,
            tl: {
              hd: namespace === "" ? "" : ":",
              tl: {
                hd: tagName,
                tl: {
                  hd: toArray(xs).join(""),
                  tl: {
                    hd: ">",
                    tl: {
                      hd: toArray(xs$1).join(""),
                      tl: {
                        hd: "</",
                        tl: {
                          hd: tagName,
                          tl: {
                            hd: ">",
                            tl: 0
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          };
          var xs$2 = {
            hd: "<",
            tl: xs_1
          };
          return toArray(xs$2).join("");
        case 3:
          _x = _1(x._1, void 0);
          continue;
        case 4:
          _x = x._1;
          continue;
      }
    }
    ;
  }
  function eventHandler(callbacks, cb) {
    return function(ev) {
      var msg = _1(cb.contents, ev);
      if (msg !== void 0) {
        return _1(callbacks.contents.enqueue, valFromOption(msg));
      }
    };
  }
  function eventHandlerGetCB(x) {
    if (x.TAG === 0) {
      return x._1;
    }
    var msg = x._0;
    return function(_ev) {
      return some(msg);
    };
  }
  function compareEventHandlerTypes(left, x) {
    if (x.TAG === 0) {
      if (left.TAG === 0) {
        return x._0 === left._0;
      } else {
        return false;
      }
    } else if (left.TAG === 0 || !equal(x._0, left._0)) {
      return false;
    } else {
      return true;
    }
  }
  function eventHandlerRegister(callbacks, elem, name2, handlerType) {
    var cb = {
      contents: eventHandlerGetCB(handlerType)
    };
    var handler = eventHandler(callbacks, cb);
    addEventListener(elem, name2, handler, false);
    return {
      handler,
      cb
    };
  }
  function eventHandlerUnregister(elem, name2, x) {
    if (x !== void 0) {
      removeEventListener(elem, name2, x.handler, false);
      return;
    }
  }
  function eventHandlerMutate(callbacks, elem, oldName, newName, oldHandlerType, newHandlerType, oldCache, newCache) {
    var oldcache = oldCache.contents;
    if (oldcache === void 0) {
      newCache.contents = eventHandlerRegister(callbacks, elem, newName, newHandlerType);
      return;
    }
    if (oldName === newName) {
      newCache.contents = oldCache.contents;
      if (compareEventHandlerTypes(oldHandlerType, newHandlerType)) {
        return;
      }
      var cb = eventHandlerGetCB(newHandlerType);
      oldcache.cb.contents = cb;
      return;
    }
    oldCache.contents = eventHandlerUnregister(elem, oldName, oldCache.contents);
    newCache.contents = eventHandlerRegister(callbacks, elem, newName, newHandlerType);
  }
  function patchVNodesOnElemsPropertiesApplyAdd(callbacks, elem, _idx, x) {
    if (typeof x === "number") {
      return;
    }
    switch (x.TAG | 0) {
      case 0:
        elem[x._0] = x._1;
        return;
      case 1:
        return setAttributeNsOptional(elem, x._0, x._1, x._2);
      case 2:
        console.log([
          "TODO:  Add Data Unhandled",
          x._0,
          x._1
        ]);
        throw {
          RE_EXN_ID: "Failure",
          _1: "TODO:  Add Data Unhandled",
          Error: new Error()
        };
      case 3:
        x._2.contents = eventHandlerRegister(callbacks, elem, x._0, x._1);
        return;
      case 4:
        return fold_left(function(param, param$1) {
          setStyleProperty(elem, void 0, param$1[0], param$1[1]);
        }, void 0, x._0);
    }
  }
  function patchVNodesOnElemsPropertiesApplyRemove(_callbacks, elem, _idx, x) {
    if (typeof x === "number") {
      return;
    }
    switch (x.TAG | 0) {
      case 0:
        elem[x._0] = void 0;
        return;
      case 1:
        return removeAttributeNsOptional(elem, x._0, x._1);
      case 2:
        console.log([
          "TODO:  Remove Data Unhandled",
          x._0,
          x._1
        ]);
        throw {
          RE_EXN_ID: "Failure",
          _1: "TODO:  Remove Data Unhandled",
          Error: new Error()
        };
      case 3:
        var cache = x._2;
        cache.contents = eventHandlerUnregister(elem, x._0, cache.contents);
        return;
      case 4:
        return fold_left(function(param, param$1) {
          setStyleProperty(elem, void 0, param$1[0], null);
        }, void 0, x._0);
    }
  }
  function patchVNodesOnElemsPropertiesApplyRemoveAdd(callbacks, elem, idx, oldProp, newProp) {
    patchVNodesOnElemsPropertiesApplyRemove(callbacks, elem, idx, oldProp);
    patchVNodesOnElemsPropertiesApplyAdd(callbacks, elem, idx, newProp);
  }
  function patchVNodesOnElemsPropertiesApplyMutate(_callbacks, elem, _idx, oldProp, x) {
    if (typeof x === "number") {
      throw {
        RE_EXN_ID: "Failure",
        _1: "This should never be called as all entries through NoProp are gated.",
        Error: new Error()
      };
    }
    switch (x.TAG | 0) {
      case 0:
        elem[x._0] = x._1;
        return;
      case 1:
        return setAttributeNsOptional(elem, x._0, x._1, x._2);
      case 2:
        console.log([
          "TODO:  Mutate Data Unhandled",
          x._0,
          x._1
        ]);
        throw {
          RE_EXN_ID: "Failure",
          _1: "TODO:  Mutate Data Unhandled",
          Error: new Error()
        };
      case 3:
        throw {
          RE_EXN_ID: "Failure",
          _1: "This will never be called because it is gated",
          Error: new Error()
        };
      case 4:
        if (typeof oldProp === "number") {
          throw {
            RE_EXN_ID: "Failure",
            _1: "Passed a non-Style to a new Style as a Mutations while the old Style is not actually a style!",
            Error: new Error()
          };
        }
        if (oldProp.TAG === 4) {
          return fold_left2(function(param, param$1, param$2) {
            var nv = param$2[1];
            var nk = param$2[0];
            var ok = param$1[0];
            if (ok === nk) {
              if (param$1[1] === nv) {
                return;
              } else {
                return setStyleProperty(elem, void 0, nk, nv);
              }
            } else {
              setStyleProperty(elem, void 0, ok, null);
              return setStyleProperty(elem, void 0, nk, nv);
            }
          }, void 0, oldProp._0, x._0);
        }
        throw {
          RE_EXN_ID: "Failure",
          _1: "Passed a non-Style to a new Style as a Mutations while the old Style is not actually a style!",
          Error: new Error()
        };
    }
  }
  function patchVNodesOnElemsPropertiesApply(callbacks, elem, _idx, _oldProperties, _newProperties) {
    while (true) {
      var newProperties = _newProperties;
      var oldProperties = _oldProperties;
      var idx = _idx;
      if (!oldProperties) {
        if (newProperties) {
          return false;
        } else {
          return true;
        }
      }
      var _oldProp = oldProperties.hd;
      if (!newProperties) {
        return false;
      }
      if (typeof _oldProp === "number") {
        if (typeof newProperties.hd === "number") {
          _newProperties = newProperties.tl;
          _oldProperties = oldProperties.tl;
          _idx = idx + 1 | 0;
          continue;
        }
      } else {
        switch (_oldProp.TAG | 0) {
          case 0:
            var newProp = newProperties.hd;
            if (typeof newProp !== "number" && newProp.TAG === 0) {
              if (_oldProp._0 === newProp._0 && _oldProp._1 === newProp._1) {
              } else {
                patchVNodesOnElemsPropertiesApplyMutate(callbacks, elem, idx, _oldProp, newProp);
              }
              _newProperties = newProperties.tl;
              _oldProperties = oldProperties.tl;
              _idx = idx + 1 | 0;
              continue;
            }
            break;
          case 1:
            var newProp$1 = newProperties.hd;
            if (typeof newProp$1 !== "number" && newProp$1.TAG === 1) {
              if (_oldProp._0 === newProp$1._0 && _oldProp._1 === newProp$1._1 && _oldProp._2 === newProp$1._2) {
              } else {
                patchVNodesOnElemsPropertiesApplyMutate(callbacks, elem, idx, _oldProp, newProp$1);
              }
              _newProperties = newProperties.tl;
              _oldProperties = oldProperties.tl;
              _idx = idx + 1 | 0;
              continue;
            }
            break;
          case 2:
            var newProp$2 = newProperties.hd;
            if (typeof newProp$2 !== "number" && newProp$2.TAG === 2) {
              if (_oldProp._0 === newProp$2._0 && _oldProp._1 === newProp$2._1) {
              } else {
                patchVNodesOnElemsPropertiesApplyMutate(callbacks, elem, idx, _oldProp, newProp$2);
              }
              _newProperties = newProperties.tl;
              _oldProperties = oldProperties.tl;
              _idx = idx + 1 | 0;
              continue;
            }
            break;
          case 3:
            var _newProp = newProperties.hd;
            if (typeof _newProp !== "number" && _newProp.TAG === 3) {
              eventHandlerMutate(callbacks, elem, _oldProp._0, _newProp._0, _oldProp._1, _newProp._1, _oldProp._2, _newProp._2);
              _newProperties = newProperties.tl;
              _oldProperties = oldProperties.tl;
              _idx = idx + 1 | 0;
              continue;
            }
            break;
          case 4:
            var newProp$3 = newProperties.hd;
            if (typeof newProp$3 !== "number" && newProp$3.TAG === 4) {
              if (equal(_oldProp._0, newProp$3._0)) {
              } else {
                patchVNodesOnElemsPropertiesApplyMutate(callbacks, elem, idx, _oldProp, newProp$3);
              }
              _newProperties = newProperties.tl;
              _oldProperties = oldProperties.tl;
              _idx = idx + 1 | 0;
              continue;
            }
            break;
        }
      }
      patchVNodesOnElemsPropertiesApplyRemoveAdd(callbacks, elem, idx, _oldProp, newProperties.hd);
      _newProperties = newProperties.tl;
      _oldProperties = oldProperties.tl;
      _idx = idx + 1 | 0;
      continue;
    }
    ;
  }
  function patchVNodesOnElemsProperties(callbacks, elem, oldProperties, newProperties) {
    return patchVNodesOnElemsPropertiesApply(callbacks, elem, 0, oldProperties, newProperties);
  }
  function patchVNodesOnElemsReplaceNode(callbacks, elem, elems, idx, x) {
    if (x.TAG === 2) {
      var newProperties = x._4;
      var oldChild = get(elems, idx);
      var newChild = createElementNsOptional(x._0, x._1);
      var match = patchVNodesOnElemsProperties(callbacks, newChild, map(function(param) {
        return 0;
      }, newProperties), newProperties);
      if (match) {
        var childChildren = newChild.childNodes;
        patchVNodesOnElems(callbacks, newChild, childChildren, 0, 0, x._5);
        elem.insertBefore(newChild, oldChild);
        elem.removeChild(oldChild);
        return;
      }
      throw {
        RE_EXN_ID: "Match_failure",
        _1: [
          "vdom.res",
          380,
          10
        ],
        Error: new Error()
      };
    }
    throw {
      RE_EXN_ID: "Failure",
      _1: "Node replacement should never be passed anything but a node itself",
      Error: new Error()
    };
  }
  function patchVNodesOnElemsCreateElement(_callbacks, _x) {
    while (true) {
      var x = _x;
      var callbacks = _callbacks;
      switch (x.TAG | 0) {
        case 0:
          var text2 = x._0;
          return document.createComment(text2);
        case 1:
          var text$1 = x._0;
          return document.createTextNode(text$1);
        case 2:
          var newProperties = x._4;
          var newChild = createElementNsOptional(x._0, x._1);
          var match = patchVNodesOnElemsProperties(callbacks, newChild, map(function(param) {
            return 0;
          }, newProperties), newProperties);
          if (match) {
            var childChildren = newChild.childNodes;
            patchVNodesOnElems(callbacks, newChild, childChildren, 0, 0, x._5);
            return newChild;
          }
          throw {
            RE_EXN_ID: "Match_failure",
            _1: [
              "vdom.res",
              403,
              10
            ],
            Error: new Error()
          };
        case 3:
          var vdom = _1(x._1, void 0);
          x._2.contents = vdom;
          _x = vdom;
          continue;
        case 4:
          _x = x._1;
          _callbacks = _1(x._0, callbacks);
          continue;
      }
    }
    ;
  }
  function patchVNodesOnElemsMutateNode(callbacks, elem, elems, idx, oldNode, newNode) {
    if (oldNode.TAG === 2) {
      if (newNode.TAG === 2) {
        if (oldNode._3 !== newNode._3 || oldNode._1 !== newNode._1) {
          return patchVNodesOnElemsReplaceNode(callbacks, elem, elems, idx, newNode);
        }
        var child = get(elems, idx);
        var childChildren = child.childNodes;
        if (patchVNodesOnElemsProperties(callbacks, child, oldNode._4, newNode._4)) {
        } else {
          console.log("VDom:  Failed swapping properties because the property list length changed, use `noProp` to swap properties instead, not by altering the list structure.  This is a massive inefficiency until this issue is resolved.");
          patchVNodesOnElemsReplaceNode(callbacks, elem, elems, idx, newNode);
        }
        return patchVNodesOnElems(callbacks, child, childChildren, 0, oldNode._5, newNode._5);
      }
      throw {
        RE_EXN_ID: "Failure",
        _1: "Non-node passed to patchVNodesOnElemsMutateNode",
        Error: new Error()
      };
    }
    throw {
      RE_EXN_ID: "Failure",
      _1: "Non-node passed to patchVNodesOnElemsMutateNode",
      Error: new Error()
    };
  }
  function patchVNodesOnElems(callbacks, elem, elems, _idx, _oldVNodes, _newVNodes) {
    while (true) {
      var newVNodes = _newVNodes;
      var oldVNodes = _oldVNodes;
      var idx = _idx;
      if (oldVNodes) {
        var oldNode = oldVNodes.hd;
        switch (oldNode.TAG | 0) {
          case 0:
            if (newVNodes) {
              var newS = newVNodes.hd;
              if (newS.TAG === 0 && oldNode._0 === newS._0) {
                _newVNodes = newVNodes.tl;
                _oldVNodes = oldVNodes.tl;
                _idx = idx + 1 | 0;
                continue;
              }
            }
            break;
          case 1:
            if (newVNodes) {
              var newText = newVNodes.hd;
              if (newText.TAG === 1) {
                var newText$1 = newText._0;
                if (oldNode._0 !== newText$1) {
                  var child = get(elems, idx);
                  child.nodeValue = newText$1;
                }
                _newVNodes = newVNodes.tl;
                _oldVNodes = oldVNodes.tl;
                _idx = idx + 1 | 0;
                continue;
              }
            }
            break;
          case 2:
            if (newVNodes) {
              var newNode = newVNodes.hd;
              if (newNode.TAG === 2) {
                var newRest = newVNodes.tl;
                var newKey = newNode._2;
                var newTagName = newNode._1;
                var newNamespace = newNode._0;
                var oldRest = oldVNodes.tl;
                var oldKey = oldNode._2;
                var oldTagName = oldNode._1;
                var oldNamespace = oldNode._0;
                if (oldKey === newKey && oldKey !== "") {
                  _newVNodes = newRest;
                  _oldVNodes = oldRest;
                  _idx = idx + 1 | 0;
                  continue;
                }
                if (oldKey === "" || newKey === "") {
                  patchVNodesOnElemsMutateNode(callbacks, elem, elems, idx, oldNode, newNode);
                  _newVNodes = newRest;
                  _oldVNodes = oldRest;
                  _idx = idx + 1 | 0;
                  continue;
                }
                var exit = 0;
                var exit$1 = 0;
                if (oldRest) {
                  var match = oldRest.hd;
                  if (match.TAG === 2) {
                    var olderRest = oldRest.tl;
                    var olderKey = match._2;
                    var olderTagName = match._1;
                    var olderNamespace = match._0;
                    var exit$2 = 0;
                    if (newRest) {
                      var match$1 = newRest.hd;
                      if (match$1.TAG === 2) {
                        if (olderNamespace === newNamespace && olderTagName === newTagName && olderKey === newKey && oldNamespace === match$1._0 && oldTagName === match$1._1 && oldKey === match$1._2) {
                          var firstChild = get(elems, idx);
                          var secondChild = get(elems, idx + 1 | 0);
                          elem.removeChild(secondChild);
                          elem.insertBefore(secondChild, firstChild);
                          _newVNodes = newRest.tl;
                          _oldVNodes = olderRest;
                          _idx = idx + 2 | 0;
                          continue;
                        }
                        exit$2 = 4;
                      } else {
                        exit$2 = 4;
                      }
                    } else {
                      exit$2 = 4;
                    }
                    if (exit$2 === 4) {
                      if (olderNamespace === newNamespace && olderTagName === newTagName && olderKey === newKey) {
                        var oldChild = get(elems, idx);
                        elem.removeChild(oldChild);
                        _newVNodes = newRest;
                        _oldVNodes = olderRest;
                        _idx = idx + 1 | 0;
                        continue;
                      }
                      exit$1 = 3;
                    }
                  } else {
                    exit$1 = 3;
                  }
                } else {
                  exit$1 = 3;
                }
                if (exit$1 === 3) {
                  if (newRest) {
                    var match$2 = newRest.hd;
                    if (match$2.TAG === 2) {
                      if (oldNamespace === match$2._0 && oldTagName === match$2._1 && oldKey === match$2._2) {
                        var oldChild$1 = get(elems, idx);
                        var newChild = patchVNodesOnElemsCreateElement(callbacks, newNode);
                        elem.insertBefore(newChild, oldChild$1);
                        _newVNodes = newRest;
                        _idx = idx + 1 | 0;
                        continue;
                      }
                      exit = 2;
                    } else {
                      exit = 2;
                    }
                  } else {
                    exit = 2;
                  }
                }
                if (exit === 2) {
                  patchVNodesOnElemsMutateNode(callbacks, elem, elems, idx, oldNode, newNode);
                  _newVNodes = newRest;
                  _oldVNodes = oldRest;
                  _idx = idx + 1 | 0;
                  continue;
                }
              }
            }
            break;
          case 3:
            if (newVNodes) {
              var match$3 = newVNodes.hd;
              if (match$3.TAG === 3) {
                var newRest$1 = newVNodes.tl;
                var newCache = match$3._2;
                var newGen = match$3._1;
                var newKey$1 = match$3._0;
                var oldRest$1 = oldVNodes.tl;
                var oldCache = oldNode._2;
                var oldKey$1 = oldNode._0;
                if (oldKey$1 === newKey$1) {
                  newCache.contents = oldCache.contents;
                  _newVNodes = newRest$1;
                  _oldVNodes = oldRest$1;
                  _idx = idx + 1 | 0;
                  continue;
                }
                var exit$3 = 0;
                var exit$4 = 0;
                if (oldRest$1) {
                  var match$4 = oldRest$1.hd;
                  if (match$4.TAG === 3) {
                    var olderRest$1 = oldRest$1.tl;
                    var olderKey$1 = match$4._0;
                    var exit$5 = 0;
                    if (newRest$1) {
                      var match$5 = newRest$1.hd;
                      if (match$5.TAG === 3) {
                        if (olderKey$1 === newKey$1 && oldKey$1 === match$5._0) {
                          var firstChild$1 = get(elems, idx);
                          var secondChild$1 = get(elems, idx + 1 | 0);
                          elem.removeChild(secondChild$1);
                          elem.insertBefore(secondChild$1, firstChild$1);
                          _newVNodes = newRest$1.tl;
                          _oldVNodes = olderRest$1;
                          _idx = idx + 2 | 0;
                          continue;
                        }
                        exit$5 = 4;
                      } else {
                        exit$5 = 4;
                      }
                    } else {
                      exit$5 = 4;
                    }
                    if (exit$5 === 4) {
                      if (olderKey$1 === newKey$1) {
                        var oldChild$2 = get(elems, idx);
                        elem.removeChild(oldChild$2);
                        var oldVdom = match$4._2.contents;
                        newCache.contents = oldVdom;
                        _newVNodes = newRest$1;
                        _oldVNodes = olderRest$1;
                        _idx = idx + 1 | 0;
                        continue;
                      }
                      exit$4 = 3;
                    }
                  } else {
                    exit$4 = 3;
                  }
                } else {
                  exit$4 = 3;
                }
                if (exit$4 === 3) {
                  if (newRest$1) {
                    var match$6 = newRest$1.hd;
                    if (match$6.TAG === 3) {
                      if (match$6._0 === oldKey$1) {
                        var oldChild$3 = get(elems, idx);
                        var newVdom = _1(newGen, void 0);
                        newCache.contents = newVdom;
                        var newChild$1 = patchVNodesOnElemsCreateElement(callbacks, newVdom);
                        elem.insertBefore(newChild$1, oldChild$3);
                        _newVNodes = newRest$1;
                        _idx = idx + 1 | 0;
                        continue;
                      }
                      exit$3 = 2;
                    } else {
                      exit$3 = 2;
                    }
                  } else {
                    exit$3 = 2;
                  }
                }
                if (exit$3 === 2) {
                  var oldVdom$1 = oldCache.contents;
                  var newVdom$1 = _1(newGen, void 0);
                  newCache.contents = newVdom$1;
                  _newVNodes = {
                    hd: newVdom$1,
                    tl: newRest$1
                  };
                  _oldVNodes = {
                    hd: oldVdom$1,
                    tl: oldRest$1
                  };
                  continue;
                }
              }
            }
            break;
          case 4:
            _oldVNodes = {
              hd: oldNode._1,
              tl: oldVNodes.tl
            };
            continue;
        }
        var oldRest$2 = oldVNodes.tl;
        if (newVNodes) {
          var newNode$1 = newVNodes.hd;
          if (newNode$1.TAG === 4) {
            patchVNodesOnElems(_1(newNode$1._0, callbacks), elem, elems, idx, {
              hd: oldNode,
              tl: 0
            }, {
              hd: newNode$1._1,
              tl: 0
            });
            _newVNodes = newVNodes.tl;
            _oldVNodes = oldRest$2;
            _idx = idx + 1 | 0;
            continue;
          }
          var oldChild$4 = get(elems, idx);
          var newChild$2 = patchVNodesOnElemsCreateElement(callbacks, newNode$1);
          elem.insertBefore(newChild$2, oldChild$4);
          elem.removeChild(oldChild$4);
          _newVNodes = newVNodes.tl;
          _oldVNodes = oldRest$2;
          _idx = idx + 1 | 0;
          continue;
        }
        var child$1 = get(elems, idx);
        elem.removeChild(child$1);
        _newVNodes = 0;
        _oldVNodes = oldRest$2;
        continue;
      }
      if (!newVNodes) {
        return;
      }
      var newChild$3 = patchVNodesOnElemsCreateElement(callbacks, newVNodes.hd);
      elem.appendChild(newChild$3);
      _newVNodes = newVNodes.tl;
      _oldVNodes = 0;
      _idx = idx + 1 | 0;
      continue;
    }
    ;
  }
  function patchVNodesIntoElement(callbacks, elem, oldVNodes, newVNodes) {
    var elems = elem.childNodes;
    patchVNodesOnElems(callbacks, elem, elems, 0, oldVNodes, newVNodes);
    return newVNodes;
  }

  // node_modules/rescript-tea/src/tea_cmd.bs.js
  function run(_callbacks, _x) {
    while (true) {
      var x = _x;
      var callbacks = _callbacks;
      if (typeof x === "number") {
        return;
      }
      switch (x.TAG | 0) {
        case 0:
          var subCallbacks = _1(x._0, callbacks);
          _x = x._1;
          _callbacks = subCallbacks;
          continue;
        case 1:
          return fold_left(function(callbacks2) {
            return function(param, cmd) {
              run(callbacks2, cmd);
            };
          }(callbacks), void 0, x._0);
        case 2:
          return _1(x._0, callbacks);
      }
    }
    ;
  }

  // node_modules/rescript-tea/src/tea_sub.bs.js
  function run2(oldCallbacks, newCallbacks, oldSub, newSub) {
    var enable = function(_callbacks, _x) {
      while (true) {
        var x = _x;
        var callbacks = _callbacks;
        if (typeof x === "number") {
          return;
        }
        switch (x.TAG | 0) {
          case 0:
            var subs = x._0;
            if (subs) {
              return iter(function(callbacks2) {
                return function(param) {
                  return enable(callbacks2, param);
                };
              }(callbacks), subs);
            } else {
              return;
            }
          case 1:
            x._2.contents = _1(x._1, callbacks);
            return;
          case 2:
            var subCallbacks = _1(x._0, callbacks);
            _x = x._1;
            _callbacks = subCallbacks;
            continue;
        }
      }
      ;
    };
    var disable = function(_callbacks, _x) {
      while (true) {
        var x = _x;
        var callbacks = _callbacks;
        if (typeof x === "number") {
          return;
        }
        switch (x.TAG | 0) {
          case 0:
            var subs = x._0;
            if (subs) {
              return iter(function(callbacks2) {
                return function(param) {
                  return disable(callbacks2, param);
                };
              }(callbacks), subs);
            } else {
              return;
            }
          case 1:
            var diCB = x._2;
            var cb = diCB.contents;
            if (cb !== void 0) {
              diCB.contents = void 0;
              return _1(cb, void 0);
            } else {
              return;
            }
          case 2:
            var subCallbacks = _1(x._0, callbacks);
            _x = x._1;
            _callbacks = subCallbacks;
            continue;
        }
      }
      ;
    };
    if (typeof oldSub === "number") {
      if (typeof newSub === "number") {
        return newSub;
      }
    } else {
      switch (oldSub.TAG | 0) {
        case 0:
          if (typeof newSub !== "number" && newSub.TAG === 0) {
            var aux = function(_oldList, _newList) {
              while (true) {
                var newList = _newList;
                var oldList = _oldList;
                if (oldList) {
                  var oldRest = oldList.tl;
                  var oldSubSub = oldList.hd;
                  if (newList) {
                    run2(oldCallbacks, newCallbacks, oldSubSub, newList.hd);
                    _newList = newList.tl;
                    _oldList = oldRest;
                    continue;
                  }
                  disable(oldCallbacks, oldSubSub);
                  _newList = 0;
                  _oldList = oldRest;
                  continue;
                }
                if (!newList) {
                  return;
                }
                enable(newCallbacks, newList.hd);
                _newList = newList.tl;
                _oldList = 0;
                continue;
              }
              ;
            };
            aux(oldSub._0, newSub._0);
            return newSub;
          }
          break;
        case 1:
          if (typeof newSub !== "number" && newSub.TAG === 1 && oldSub._0 === newSub._0) {
            newSub._2.contents = oldSub._2.contents;
            return newSub;
          }
          break;
        case 2:
          if (typeof newSub !== "number" && newSub.TAG === 2) {
            var olderCallbacks = _1(oldSub._0, oldCallbacks);
            var newerCallbacks = _1(newSub._0, newCallbacks);
            run2(olderCallbacks, newerCallbacks, oldSub._1, newSub._1);
            return newSub;
          }
          break;
      }
    }
    disable(oldCallbacks, oldSub);
    enable(newCallbacks, newSub);
    return newSub;
  }

  // node_modules/rescript-tea/src/tea_app.bs.js
  function programStateWrapper(initModel, pump, shutdown) {
    var model = {
      contents: initModel
    };
    var callbacks = {
      contents: {
        enqueue: function(_msg) {
          console.log("INVALID enqueue CALL!");
        },
        on: function(param) {
        }
      }
    };
    var pumperInterface = _1(pump, callbacks);
    var pending = {
      contents: void 0
    };
    var handler = function(msg) {
      var msgs = pending.contents;
      if (msgs !== void 0) {
        pending.contents = {
          hd: msg,
          tl: msgs
        };
        return;
      }
      pending.contents = 0;
      var newModel = _2(pumperInterface.handleMsg, model.contents, msg);
      model.contents = newModel;
      var msgs$1 = pending.contents;
      if (msgs$1 !== void 0) {
        if (msgs$1) {
          pending.contents = void 0;
          return iter(handler, rev(msgs$1));
        } else {
          pending.contents = void 0;
          return;
        }
      }
      throw {
        RE_EXN_ID: "Failure",
        _1: "INVALID message queue state, should never be None during message processing!",
        Error: new Error()
      };
    };
    var renderEvents = {
      contents: 0
    };
    var finalizedCBs_enqueue = handler;
    var finalizedCBs_on = function(x) {
      if (typeof x === "number") {
        return iter(handler, renderEvents.contents);
      }
      if (x.TAG === 0) {
        renderEvents.contents = append(renderEvents.contents, {
          hd: x._0,
          tl: 0
        });
        return;
      }
      var msg = x._0;
      renderEvents.contents = filter(function(mg) {
        return msg !== mg;
      })(renderEvents.contents);
    };
    var finalizedCBs = {
      enqueue: finalizedCBs_enqueue,
      on: finalizedCBs_on
    };
    callbacks.contents = finalizedCBs;
    var piRequestShutdown = function(param) {
      callbacks.contents = {
        enqueue: function(_msg) {
          console.log("INVALID message enqueued when shut down");
        },
        on: function(param2) {
        }
      };
      var cmd = _1(shutdown, model.contents);
      _1(pumperInterface.shutdown, cmd);
    };
    var renderString = function(param) {
      return _1(pumperInterface.renderString, model.contents);
    };
    _1(pumperInterface.startup, void 0);
    return {
      pushMsg: handler,
      shutdown: piRequestShutdown,
      getHtmlString: renderString
    };
  }
  function programLoop(update2, view2, subscriptions, initModel, initCmd, x) {
    if (x === void 0) {
      return function(callbacks) {
        var oldSub = {
          contents: 0
        };
        var handleSubscriptionChange = function(model) {
          var newSub = _1(subscriptions, model);
          oldSub.contents = run2(callbacks, callbacks, oldSub.contents, newSub);
        };
        return {
          startup: function(param) {
            run(callbacks, initCmd);
            handleSubscriptionChange(initModel);
          },
          renderString: function(model) {
            return renderToHtmlString(_1(view2, model));
          },
          handleMsg: function(model, msg) {
            var match = _2(update2, model, msg);
            var newModel = match[0];
            run(callbacks, match[1]);
            handleSubscriptionChange(newModel);
            return newModel;
          },
          shutdown: function(cmd) {
            run(callbacks, cmd);
            oldSub.contents = run2(callbacks, callbacks, oldSub.contents, 0);
          }
        };
      };
    }
    var parentNode = valFromOption(x);
    return function(callbacks) {
      var priorRenderedVdom = {
        contents: 0
      };
      var latestModel = {
        contents: initModel
      };
      var nextFrameID = {
        contents: void 0
      };
      var doRender = function(_delta) {
        var _id = nextFrameID.contents;
        if (_id === void 0) {
          return;
        }
        var newVdom_0 = _1(view2, latestModel.contents);
        var newVdom = {
          hd: newVdom_0,
          tl: 0
        };
        var justRenderedVdom = patchVNodesIntoElement(callbacks, parentNode, priorRenderedVdom.contents, newVdom);
        priorRenderedVdom.contents = justRenderedVdom;
        _1(callbacks.contents.on, 0);
        nextFrameID.contents = void 0;
      };
      var scheduleRender = function(param) {
        var match = nextFrameID.contents;
        if (match !== void 0) {
          return;
        }
        var id3 = window.requestAnimationFrame(doRender);
        nextFrameID.contents = id3;
      };
      var clearPnode = function(param) {
        while (parentNode.childNodes.length > 0) {
          var firstChild = parentNode.firstChild;
          if (firstChild !== null) {
            parentNode.removeChild(firstChild);
          }
        }
        ;
      };
      var oldSub = {
        contents: 0
      };
      var handleSubscriptionChange = function(model) {
        var newSub = _1(subscriptions, model);
        oldSub.contents = run2(callbacks, callbacks, oldSub.contents, newSub);
      };
      var handlerStartup = function(param) {
        clearPnode(void 0);
        run(callbacks, initCmd);
        handleSubscriptionChange(latestModel.contents);
        nextFrameID.contents = -1;
        doRender(16);
      };
      var renderString = function(model) {
        return renderToHtmlString(_1(view2, model));
      };
      var handler = function(model, msg) {
        var match = _2(update2, model, msg);
        var newModel = match[0];
        latestModel.contents = newModel;
        run(callbacks, match[1]);
        scheduleRender(void 0);
        handleSubscriptionChange(newModel);
        return newModel;
      };
      var handlerShutdown = function(cmd) {
        nextFrameID.contents = void 0;
        run(callbacks, cmd);
        oldSub.contents = run2(callbacks, callbacks, oldSub.contents, 0);
        priorRenderedVdom.contents = 0;
        clearPnode(void 0);
      };
      return {
        startup: handlerStartup,
        renderString,
        handleMsg: handler,
        shutdown: handlerShutdown
      };
    };
  }
  function program(param, pnode, flags) {
    polyfills(void 0);
    var match = _1(param.init, flags);
    var initModel = match[0];
    var opnode = pnode == null ? void 0 : some(pnode);
    var pumpInterface = programLoop(param.update, param.view, param.subscriptions, initModel, match[1], opnode);
    return programStateWrapper(initModel, pumpInterface, param.shutdown);
  }
  function standardProgram(param, pnode, args) {
    return program({
      init: param.init,
      update: param.update,
      view: param.view,
      subscriptions: param.subscriptions,
      shutdown: function(_model) {
        return 0;
      }
    }, pnode, args);
  }
  function beginnerProgram(param, pnode, param$1) {
    var update2 = param.update;
    var model = param.model;
    return standardProgram({
      init: function(param2) {
        return [
          model,
          0
        ];
      },
      update: function(model2, msg) {
        return [
          _2(update2, model2, msg),
          0
        ];
      },
      view: param.view,
      subscriptions: function(_model) {
        return 0;
      }
    }, pnode, void 0);
  }

  // node_modules/rescript/lib/es6/array.js
  function map3(f, a) {
    var l = a.length;
    if (l === 0) {
      return [];
    }
    var r = make(l, _1(f, a[0]));
    for (var i = 1; i < l; ++i) {
      r[i] = _1(f, a[i]);
    }
    return r;
  }
  function to_list(a) {
    var _i = a.length - 1 | 0;
    var _res = 0;
    while (true) {
      var res = _res;
      var i = _i;
      if (i < 0) {
        return res;
      }
      _res = {
        hd: a[i],
        tl: res
      };
      _i = i - 1 | 0;
      continue;
    }
    ;
  }
  function fold_right2(f, a, x) {
    var r = x;
    for (var i = a.length - 1 | 0; i >= 0; --i) {
      r = _2(f, a[i], r);
    }
    return r;
  }

  // node_modules/rescript/lib/es6/js_dict.js
  function get3(dict2, k) {
    if (k in dict2) {
      return some(dict2[k]);
    }
  }

  // node_modules/rescript/lib/es6/js_json.js
  function classify(x) {
    var ty = typeof x;
    if (ty === "string") {
      return {
        TAG: 0,
        _0: x
      };
    } else if (ty === "number") {
      return {
        TAG: 1,
        _0: x
      };
    } else if (ty === "boolean") {
      if (x === true) {
        return 1;
      } else {
        return 0;
      }
    } else if (x === null) {
      return 2;
    } else if (Array.isArray(x)) {
      return {
        TAG: 3,
        _0: x
      };
    } else {
      return {
        TAG: 2,
        _0: x
      };
    }
  }

  // node_modules/rescript-tea/src/web_json.bs.js
  var classify2 = classify;

  // node_modules/rescript-tea/src/tea_result.bs.js
  function first(fst, x) {
    if (x.TAG === 0) {
      return fst;
    } else {
      return x;
    }
  }

  // node_modules/rescript/lib/es6/belt_internalAVLtree.js
  function treeHeight(n) {
    if (n !== void 0) {
      return n.h;
    } else {
      return 0;
    }
  }
  function create2(l, x, d, r) {
    var hl = treeHeight(l);
    var hr = treeHeight(r);
    return {
      k: x,
      v: d,
      h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
      l,
      r
    };
  }
  function singleton(x, d) {
    return {
      k: x,
      v: d,
      h: 1,
      l: void 0,
      r: void 0
    };
  }
  function updateValue(n, newValue) {
    if (n.v === newValue) {
      return n;
    } else {
      return {
        k: n.k,
        v: newValue,
        h: n.h,
        l: n.l,
        r: n.r
      };
    }
  }
  function bal(l, x, d, r) {
    var hl = l !== void 0 ? l.h : 0;
    var hr = r !== void 0 ? r.h : 0;
    if (hl > (hr + 2 | 0)) {
      var ll = l.l;
      var lr = l.r;
      if (treeHeight(ll) >= treeHeight(lr)) {
        return create2(ll, l.k, l.v, create2(lr, x, d, r));
      } else {
        return create2(create2(ll, l.k, l.v, lr.l), lr.k, lr.v, create2(lr.r, x, d, r));
      }
    }
    if (hr <= (hl + 2 | 0)) {
      return {
        k: x,
        v: d,
        h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
        l,
        r
      };
    }
    var rl = r.l;
    var rr = r.r;
    if (treeHeight(rr) >= treeHeight(rl)) {
      return create2(create2(l, x, d, rl), r.k, r.v, rr);
    } else {
      return create2(create2(l, x, d, rl.l), rl.k, rl.v, create2(rl.r, r.k, r.v, rr));
    }
  }

  // node_modules/rescript/lib/es6/belt_MapString.js
  function set2(t, newK, newD) {
    if (t === void 0) {
      return singleton(newK, newD);
    }
    var k = t.k;
    if (newK === k) {
      return updateValue(t, newD);
    }
    var v = t.v;
    if (newK < k) {
      return bal(set2(t.l, newK, newD), k, v, t.r);
    } else {
      return bal(t.l, k, v, set2(t.r, newK, newD));
    }
  }

  // node_modules/rescript-tea/src/tea_json.bs.js
  var ParseFail = /* @__PURE__ */ create("Tea_json.Decoder.ParseFail");
  var string = {
    _0: function(value3) {
      var s = classify2(value3);
      if (typeof s === "number" || s.TAG !== 0) {
        return {
          TAG: 1,
          _0: "Non-string value"
        };
      } else {
        return {
          TAG: 0,
          _0: s._0
        };
      }
    }
  };
  var $$int = {
    _0: function(value3) {
      var n = classify2(value3);
      if (typeof n === "number") {
        return {
          TAG: 1,
          _0: "Non-int value"
        };
      }
      if (n.TAG !== 1) {
        return {
          TAG: 1,
          _0: "Non-int value"
        };
      }
      var n$1 = n._0;
      if (n$1 > min_int && n$1 < max_int2) {
        return {
          TAG: 0,
          _0: n$1 | 0
        };
      } else {
        return {
          TAG: 1,
          _0: "number out of int range"
        };
      }
    }
  };
  var $$float = {
    _0: function(value3) {
      var n = classify2(value3);
      if (typeof n === "number" || n.TAG !== 1) {
        return {
          TAG: 1,
          _0: "Non-float-value"
        };
      } else {
        return {
          TAG: 0,
          _0: n._0
        };
      }
    }
  };
  var bool = {
    _0: function(value3) {
      var match = classify2(value3);
      if (typeof match !== "number") {
        return {
          TAG: 1,
          _0: "Non-boolean value"
        };
      }
      switch (match) {
        case 0:
          return {
            TAG: 0,
            _0: false
          };
        case 1:
          return {
            TAG: 0,
            _0: true
          };
        case 2:
          return {
            TAG: 1,
            _0: "Non-boolean value"
          };
      }
    }
  };
  function $$null(v) {
    return {
      _0: function(value3) {
        var match = classify2(value3);
        if (typeof match === "number" && match >= 2) {
          return {
            TAG: 0,
            _0: v
          };
        } else {
          return {
            TAG: 1,
            _0: "Non-null value"
          };
        }
      }
    };
  }
  function list(decoder) {
    var decoder$1 = decoder._0;
    return {
      _0: function(value3) {
        var a = classify2(value3);
        if (typeof a === "number") {
          return {
            TAG: 1,
            _0: "Non-list value"
          };
        }
        if (a.TAG !== 3) {
          return {
            TAG: 1,
            _0: "Non-list value"
          };
        }
        var parse = function(v) {
          var r = _1(decoder$1, v);
          if (r.TAG === 0) {
            return r._0;
          }
          throw {
            RE_EXN_ID: ParseFail,
            _1: r._0,
            Error: new Error()
          };
        };
        try {
          return {
            TAG: 0,
            _0: map(parse, to_list(a._0))
          };
        } catch (raw_e) {
          var e = internalToOCamlException(raw_e);
          if (e.RE_EXN_ID === ParseFail) {
            return {
              TAG: 1,
              _0: "list -> " + e._1
            };
          }
          throw e;
        }
      }
    };
  }
  function array(decoder) {
    var decoder$1 = decoder._0;
    return {
      _0: function(value3) {
        var a = classify2(value3);
        if (typeof a === "number") {
          return {
            TAG: 1,
            _0: "Non-array value"
          };
        }
        if (a.TAG !== 3) {
          return {
            TAG: 1,
            _0: "Non-array value"
          };
        }
        var parse = function(v) {
          var r = _1(decoder$1, v);
          if (r.TAG === 0) {
            return r._0;
          }
          throw {
            RE_EXN_ID: ParseFail,
            _1: r._0,
            Error: new Error()
          };
        };
        try {
          return {
            TAG: 0,
            _0: map3(parse, a._0)
          };
        } catch (raw_e) {
          var e = internalToOCamlException(raw_e);
          if (e.RE_EXN_ID === ParseFail) {
            return {
              TAG: 1,
              _0: "array -> " + e._1
            };
          }
          throw e;
        }
      }
    };
  }
  function keyValuePairs(decoder) {
    var decoder$1 = decoder._0;
    return {
      _0: function(value3) {
        var o = classify2(value3);
        if (typeof o === "number") {
          return {
            TAG: 1,
            _0: "Non-keyValuePair value"
          };
        }
        if (o.TAG !== 2) {
          return {
            TAG: 1,
            _0: "Non-keyValuePair value"
          };
        }
        var o$1 = o._0;
        var keys = Object.keys(o$1);
        var parse = function(k, l) {
          var v = get3(o$1, k);
          if (v !== void 0) {
            var r = _1(decoder$1, valFromOption(v));
            if (r.TAG === 0) {
              return {
                hd: [
                  k,
                  r._0
                ],
                tl: l
              };
            }
            throw {
              RE_EXN_ID: ParseFail,
              _1: r._0,
              Error: new Error()
            };
          }
          throw {
            RE_EXN_ID: ParseFail,
            _1: "Key is undefined: " + k,
            Error: new Error()
          };
        };
        try {
          return {
            TAG: 0,
            _0: fold_right2(parse, keys, 0)
          };
        } catch (raw_e) {
          var e = internalToOCamlException(raw_e);
          if (e.RE_EXN_ID === ParseFail) {
            return {
              TAG: 1,
              _0: "Invalid keyValuePair parsing: " + e._1
            };
          }
          throw e;
        }
      }
    };
  }
  function dict(decoder) {
    var decoder$1 = decoder._0;
    return {
      _0: function(value3) {
        var o = classify2(value3);
        if (typeof o === "number") {
          return {
            TAG: 1,
            _0: "Non-dict value"
          };
        }
        if (o.TAG !== 2) {
          return {
            TAG: 1,
            _0: "Non-dict value"
          };
        }
        var o$1 = o._0;
        var keys = Object.keys(o$1);
        var parse = function(k, d) {
          var v = get3(o$1, k);
          if (v !== void 0) {
            var r = _1(decoder$1, valFromOption(v));
            if (r.TAG === 0) {
              return set2(d, k, r._0);
            }
            throw {
              RE_EXN_ID: ParseFail,
              _1: r._0,
              Error: new Error()
            };
          }
          throw {
            RE_EXN_ID: ParseFail,
            _1: "Key is undefined: " + k,
            Error: new Error()
          };
        };
        try {
          return {
            TAG: 0,
            _0: fold_right2(parse, keys, void 0)
          };
        } catch (raw_e) {
          var e = internalToOCamlException(raw_e);
          if (e.RE_EXN_ID === ParseFail) {
            return {
              TAG: 1,
              _0: "Invalid dict parsing: " + e._1
            };
          }
          throw e;
        }
      }
    };
  }
  function field(key, decoder) {
    var decoder$1 = decoder._0;
    return {
      _0: function(value3) {
        var o = classify2(value3);
        if (typeof o === "number") {
          return {
            TAG: 1,
            _0: "Non-fieldable value"
          };
        }
        if (o.TAG !== 2) {
          return {
            TAG: 1,
            _0: "Non-fieldable value"
          };
        }
        var v = get3(o._0, key);
        if (v === void 0) {
          return {
            TAG: 1,
            _0: "Field Value is undefined: " + key
          };
        }
        var o$1 = _1(decoder$1, valFromOption(v));
        if (o$1.TAG === 0) {
          return o$1;
        } else {
          return {
            TAG: 1,
            _0: "field `" + (key + ("` -> " + o$1._0))
          };
        }
      }
    };
  }
  function at(fields, dec) {
    return fold_right(field, fields, dec);
  }
  function index(idx, decoder) {
    var decoder$1 = decoder._0;
    return {
      _0: function(value3) {
        var a = classify2(value3);
        if (typeof a === "number") {
          return {
            TAG: 1,
            _0: "Non-array value"
          };
        }
        if (a.TAG !== 3) {
          return {
            TAG: 1,
            _0: "Non-array value"
          };
        }
        var a$1 = a._0;
        if (idx < 0 || idx > a$1.length) {
          return {
            TAG: 1,
            _0: "Array index out of range: " + String(idx)
          };
        } else {
          return _1(decoder$1, get(a$1, idx));
        }
      }
    };
  }
  function maybe(decoder) {
    var decoder$1 = decoder._0;
    return {
      _0: function(value3) {
        var r = _1(decoder$1, value3);
        if (r.TAG === 0) {
          return {
            TAG: 0,
            _0: some(r._0)
          };
        } else {
          return {
            TAG: 0,
            _0: void 0
          };
        }
      }
    };
  }
  function oneOf(decoders) {
    return {
      _0: function(value3) {
        var parse = function(v, _x) {
          while (true) {
            var x = _x;
            if (!x) {
              return {
                TAG: 1,
                _0: "No one-of's matched"
              };
            }
            var rest = x.tl;
            try {
              var ok = _1(x.hd._0, v);
              if (ok.TAG === 0) {
                return ok;
              } else {
                return parse(v, rest);
              }
            } catch (exn) {
              _x = rest;
              continue;
            }
          }
          ;
        };
        return parse(value3, decoders);
      }
    };
  }
  function map5(mapper, decoder1) {
    var decoder1$1 = decoder1._0;
    return {
      _0: function(value3) {
        var v1 = _1(decoder1$1, value3);
        if (v1.TAG === 0) {
          return {
            TAG: 0,
            _0: _1(mapper, v1._0)
          };
        } else {
          return {
            TAG: 1,
            _0: "map " + v1._0
          };
        }
      }
    };
  }
  function map22(mapper, decoder1, decoder2) {
    var decoder2$1 = decoder2._0;
    var decoder1$1 = decoder1._0;
    return {
      _0: function(value3) {
        var match = _1(decoder1$1, value3);
        var match$1 = _1(decoder2$1, value3);
        if (match.TAG === 0 && match$1.TAG === 0) {
          return {
            TAG: 0,
            _0: _2(mapper, match._0, match$1._0)
          };
        }
        var result;
        result = match$1.TAG === 0 ? match.TAG === 0 ? void 0 : match._0 : match$1._0;
        if (result !== void 0) {
          return {
            TAG: 1,
            _0: "map2 -> " + result
          };
        }
        throw {
          RE_EXN_ID: "Failure",
          _1: "Impossible case",
          Error: new Error()
        };
      }
    };
  }
  function map32(mapper, decoder1, decoder2, decoder3) {
    var decoder3$1 = decoder3._0;
    var decoder2$1 = decoder2._0;
    var decoder1$1 = decoder1._0;
    return {
      _0: function(value3) {
        var match = _1(decoder1$1, value3);
        var match$1 = _1(decoder2$1, value3);
        var match$2 = _1(decoder3$1, value3);
        if (match.TAG === 0 && match$1.TAG === 0 && match$2.TAG === 0) {
          return {
            TAG: 0,
            _0: _3(mapper, match._0, match$1._0, match$2._0)
          };
        }
        var e = first(match$2, first(match$1, match));
        if (e.TAG !== 0) {
          return {
            TAG: 1,
            _0: "map3 -> " + e._0
          };
        }
        throw {
          RE_EXN_ID: "Failure",
          _1: "Impossible case",
          Error: new Error()
        };
      }
    };
  }
  function map42(mapper, decoder1, decoder2, decoder3, decoder4) {
    var decoder4$1 = decoder4._0;
    var decoder3$1 = decoder3._0;
    var decoder2$1 = decoder2._0;
    var decoder1$1 = decoder1._0;
    return {
      _0: function(value3) {
        var match = _1(decoder1$1, value3);
        var match$1 = _1(decoder2$1, value3);
        var match$2 = _1(decoder3$1, value3);
        var match$3 = _1(decoder4$1, value3);
        if (match.TAG === 0 && match$1.TAG === 0 && match$2.TAG === 0 && match$3.TAG === 0) {
          return {
            TAG: 0,
            _0: _4(mapper, match._0, match$1._0, match$2._0, match$3._0)
          };
        }
        var e = first(match$3, first(match$2, first(match$1, match)));
        if (e.TAG !== 0) {
          return {
            TAG: 1,
            _0: "map4 -> " + e._0
          };
        }
        throw {
          RE_EXN_ID: "Failure",
          _1: "Impossible case",
          Error: new Error()
        };
      }
    };
  }
  function map52(mapper, decoder1, decoder2, decoder3, decoder4, decoder5) {
    var decoder5$1 = decoder5._0;
    var decoder4$1 = decoder4._0;
    var decoder3$1 = decoder3._0;
    var decoder2$1 = decoder2._0;
    var decoder1$1 = decoder1._0;
    return {
      _0: function(value3) {
        var match = _1(decoder1$1, value3);
        var match$1 = _1(decoder2$1, value3);
        var match$2 = _1(decoder3$1, value3);
        var match$3 = _1(decoder4$1, value3);
        var match$4 = _1(decoder5$1, value3);
        if (match.TAG === 0 && match$1.TAG === 0 && match$2.TAG === 0 && match$3.TAG === 0 && match$4.TAG === 0) {
          return {
            TAG: 0,
            _0: _5(mapper, match._0, match$1._0, match$2._0, match$3._0, match$4._0)
          };
        }
        var e = first(match$4, first(match$3, first(match$2, first(match$1, match))));
        if (e.TAG !== 0) {
          return {
            TAG: 1,
            _0: "map5 -> " + e._0
          };
        }
        throw {
          RE_EXN_ID: "Failure",
          _1: "Impossible case",
          Error: new Error()
        };
      }
    };
  }
  function map6(mapper, decoder1, decoder2, decoder3, decoder4, decoder5, decoder6) {
    var decoder6$1 = decoder6._0;
    var decoder5$1 = decoder5._0;
    var decoder4$1 = decoder4._0;
    var decoder3$1 = decoder3._0;
    var decoder2$1 = decoder2._0;
    var decoder1$1 = decoder1._0;
    return {
      _0: function(value3) {
        var match = _1(decoder1$1, value3);
        var match$1 = _1(decoder2$1, value3);
        var match$2 = _1(decoder3$1, value3);
        var match$3 = _1(decoder4$1, value3);
        var match$4 = _1(decoder5$1, value3);
        var match$5 = _1(decoder6$1, value3);
        if (match.TAG === 0 && match$1.TAG === 0 && match$2.TAG === 0 && match$3.TAG === 0 && match$4.TAG === 0 && match$5.TAG === 0) {
          return {
            TAG: 0,
            _0: _6(mapper, match._0, match$1._0, match$2._0, match$3._0, match$4._0, match$5._0)
          };
        }
        var e = first(match$5, first(match$4, first(match$3, first(match$2, first(match$1, match)))));
        if (e.TAG !== 0) {
          return {
            TAG: 1,
            _0: "map6 -> " + e._0
          };
        }
        throw {
          RE_EXN_ID: "Failure",
          _1: "Impossible case",
          Error: new Error()
        };
      }
    };
  }
  function map7(mapper, decoder1, decoder2, decoder3, decoder4, decoder5, decoder6, decoder7) {
    var decoder7$1 = decoder7._0;
    var decoder6$1 = decoder6._0;
    var decoder5$1 = decoder5._0;
    var decoder4$1 = decoder4._0;
    var decoder3$1 = decoder3._0;
    var decoder2$1 = decoder2._0;
    var decoder1$1 = decoder1._0;
    return {
      _0: function(value3) {
        var match = _1(decoder1$1, value3);
        var match$1 = _1(decoder2$1, value3);
        var match$2 = _1(decoder3$1, value3);
        var match$3 = _1(decoder4$1, value3);
        var match$4 = _1(decoder5$1, value3);
        var match$5 = _1(decoder6$1, value3);
        var match$6 = _1(decoder7$1, value3);
        if (match.TAG === 0 && match$1.TAG === 0 && match$2.TAG === 0 && match$3.TAG === 0 && match$4.TAG === 0 && match$5.TAG === 0 && match$6.TAG === 0) {
          return {
            TAG: 0,
            _0: _7(mapper, match._0, match$1._0, match$2._0, match$3._0, match$4._0, match$5._0, match$6._0)
          };
        }
        var e = first(match$6, first(match$5, first(match$4, first(match$3, first(match$2, first(match$1, match))))));
        if (e.TAG !== 0) {
          return {
            TAG: 1,
            _0: "map7 -> " + e._0
          };
        }
        throw {
          RE_EXN_ID: "Failure",
          _1: "Impossible case",
          Error: new Error()
        };
      }
    };
  }
  function map8(mapper, decoder1, decoder2, decoder3, decoder4, decoder5, decoder6, decoder7, decoder8) {
    var decoder8$1 = decoder8._0;
    var decoder7$1 = decoder7._0;
    var decoder6$1 = decoder6._0;
    var decoder5$1 = decoder5._0;
    var decoder4$1 = decoder4._0;
    var decoder3$1 = decoder3._0;
    var decoder2$1 = decoder2._0;
    var decoder1$1 = decoder1._0;
    return {
      _0: function(value3) {
        var match = _1(decoder1$1, value3);
        var match$1 = _1(decoder2$1, value3);
        var match$2 = _1(decoder3$1, value3);
        var match$3 = _1(decoder4$1, value3);
        var match$4 = _1(decoder5$1, value3);
        var match$5 = _1(decoder6$1, value3);
        var match$6 = _1(decoder7$1, value3);
        var match$7 = _1(decoder8$1, value3);
        if (match.TAG === 0 && match$1.TAG === 0 && match$2.TAG === 0 && match$3.TAG === 0 && match$4.TAG === 0 && match$5.TAG === 0 && match$6.TAG === 0 && match$7.TAG === 0) {
          return {
            TAG: 0,
            _0: _8(mapper, match._0, match$1._0, match$2._0, match$3._0, match$4._0, match$5._0, match$6._0, match$7._0)
          };
        }
        var e = first(match$7, first(match$6, first(match$5, first(match$4, first(match$3, first(match$2, first(match$1, match)))))));
        if (e.TAG !== 0) {
          return {
            TAG: 1,
            _0: "map8 -> " + e._0
          };
        }
        throw {
          RE_EXN_ID: "Failure",
          _1: "Impossible case",
          Error: new Error()
        };
      }
    };
  }
  function succeed(v) {
    return {
      _0: function(_value) {
        return {
          TAG: 0,
          _0: v
        };
      }
    };
  }
  function fail(e) {
    return {
      _0: function(_value) {
        return {
          TAG: 1,
          _0: e
        };
      }
    };
  }
  var value = {
    _0: function(value3) {
      return {
        TAG: 0,
        _0: value3
      };
    }
  };
  function andThen(func, decoder) {
    var decoder$1 = decoder._0;
    return {
      _0: function(value3) {
        var r = _1(decoder$1, value3);
        if (r.TAG !== 0) {
          return r;
        }
        var andThenDecoder = _1(func, r._0);
        return _1(andThenDecoder._0, value3);
      }
    };
  }
  function lazy_(func) {
    return andThen(func, {
      _0: function(_value) {
        return {
          TAG: 0,
          _0: void 0
        };
      }
    });
  }
  function nullable(decoder) {
    return oneOf({
      hd: $$null(void 0),
      tl: {
        hd: map5(function(v) {
          return some(v);
        }, decoder),
        tl: 0
      }
    });
  }
  function decodeValue(decoder, value3) {
    try {
      return _1(decoder._0, value3);
    } catch (raw_e) {
      var e = internalToOCamlException(raw_e);
      if (e.RE_EXN_ID === ParseFail) {
        return {
          TAG: 1,
          _0: e._1
        };
      } else {
        return {
          TAG: 1,
          _0: "Unknown JSON parsing error"
        };
      }
    }
  }
  function decodeEvent(decoder, value3) {
    try {
      return _1(decoder._0, value3);
    } catch (raw_e) {
      var e = internalToOCamlException(raw_e);
      if (e.RE_EXN_ID === ParseFail) {
        return {
          TAG: 1,
          _0: e._1
        };
      } else {
        return {
          TAG: 1,
          _0: "Unknown JSON parsing error"
        };
      }
    }
  }
  function decodeString2(decoder, string2) {
    try {
      var value3 = JSON.parse(string2);
      return decodeValue(decoder, value3);
    } catch (exn) {
      return {
        TAG: 1,
        _0: "Invalid JSON string"
      };
    }
  }
  var Decoder_ObjectDict = {};
  var Decoder = {
    ObjectDict: Decoder_ObjectDict,
    ParseFail,
    string,
    $$int,
    $$float,
    bool,
    $$null,
    list,
    array,
    keyValuePairs,
    dict,
    field,
    at,
    index,
    maybe,
    oneOf,
    map: map5,
    map2: map22,
    map3: map32,
    map4: map42,
    map5: map52,
    map6,
    map7,
    map8,
    succeed,
    fail,
    value,
    andThen,
    lazy_,
    nullable,
    decodeValue,
    decodeEvent,
    decodeString: decodeString2
  };

  // node_modules/rescript-tea/src/tea_html.bs.js
  function text(str) {
    return {
      TAG: 1,
      _0: str
    };
  }
  function div(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== void 0 ? keyOpt : "";
    var unique = uniqueOpt !== void 0 ? uniqueOpt : "";
    return fullnode("", "div", key, unique, props, nodes);
  }
  function span(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== void 0 ? keyOpt : "";
    var unique = uniqueOpt !== void 0 ? uniqueOpt : "";
    return fullnode("", "span", key, unique, props, nodes);
  }
  function br(props) {
    return fullnode("", "br", "br", "br", props, 0);
  }
  function button(keyOpt, uniqueOpt, props, nodes) {
    var key = keyOpt !== void 0 ? keyOpt : "";
    var unique = uniqueOpt !== void 0 ? uniqueOpt : "";
    return fullnode("", "button", key, unique, props, nodes);
  }
  var style$1 = style;
  function styles(s) {
    return {
      TAG: 4,
      _0: s
    };
  }
  function $$class(name2) {
    return {
      TAG: 0,
      _0: "className",
      _1: name2
    };
  }
  function classList(classes) {
    var xs = map(function(param) {
      return param[0];
    }, filter(function(param) {
      return param[1];
    })(classes));
    return {
      TAG: 0,
      _0: "className",
      _1: toArray(xs).join(" ")
    };
  }
  function id2(str) {
    return {
      TAG: 0,
      _0: "id",
      _1: str
    };
  }
  function title$1(str) {
    return {
      TAG: 1,
      _0: "",
      _1: "title",
      _2: str
    };
  }
  function hidden(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "hidden",
        _1: "hidden"
      };
    } else {
      return 0;
    }
  }
  function type$p(typ) {
    return {
      TAG: 0,
      _0: "type",
      _1: typ
    };
  }
  function value2(str) {
    return {
      TAG: 0,
      _0: "value",
      _1: str
    };
  }
  function defaultValue(str) {
    return {
      TAG: 0,
      _0: "defaultValue",
      _1: str
    };
  }
  function checked(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "checked",
        _1: "checked"
      };
    } else {
      return 0;
    }
  }
  function placeholder(str) {
    return {
      TAG: 0,
      _0: "placeholder",
      _1: str
    };
  }
  function selected(b) {
    if (b) {
      return {
        TAG: 1,
        _0: "",
        _1: "selected",
        _2: "true"
      };
    } else {
      return 0;
    }
  }
  function accept(c) {
    return {
      TAG: 1,
      _0: "",
      _1: "accept",
      _2: c
    };
  }
  function acceptCharset(c) {
    return {
      TAG: 1,
      _0: "",
      _1: "accept-charset",
      _2: c
    };
  }
  function action(a) {
    return {
      TAG: 0,
      _0: "action",
      _1: a
    };
  }
  function autocomplete(b) {
    return {
      TAG: 0,
      _0: "autocomplete",
      _1: b ? "on" : "off"
    };
  }
  function autofocus(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "autofocus",
        _1: "autofocus"
      };
    } else {
      return 0;
    }
  }
  function disabled(b) {
    if (b) {
      return {
        TAG: 1,
        _0: "",
        _1: "disabled",
        _2: "true"
      };
    } else {
      return 0;
    }
  }
  function enctype(encoding) {
    return {
      TAG: 1,
      _0: "",
      _1: "enctype",
      _2: encoding
    };
  }
  function formaction(url) {
    return {
      TAG: 1,
      _0: "",
      _1: "formaction",
      _2: url
    };
  }
  function list2(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "list",
      _2: value3
    };
  }
  function minlength(n) {
    return {
      TAG: 1,
      _0: "",
      _1: "minlength",
      _2: String(n)
    };
  }
  function maxlength(n) {
    return {
      TAG: 1,
      _0: "",
      _1: "maxlength",
      _2: String(n)
    };
  }
  function method(m) {
    return {
      TAG: 0,
      _0: "method",
      _1: m
    };
  }
  function multiple(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "multiple",
        _1: "multiple"
      };
    } else {
      return 0;
    }
  }
  function name(str) {
    return {
      TAG: 0,
      _0: "name",
      _1: str
    };
  }
  function novalidate(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "novalidate",
        _1: "novalidate"
      };
    } else {
      return 0;
    }
  }
  function pattern(p) {
    return {
      TAG: 0,
      _0: "pattern",
      _1: p
    };
  }
  function readonly(b) {
    if (b) {
      return {
        TAG: 1,
        _0: "",
        _1: "readonly",
        _2: "readonly"
      };
    } else {
      return 0;
    }
  }
  function required(b) {
    if (b) {
      return {
        TAG: 1,
        _0: "",
        _1: "required",
        _2: "required"
      };
    } else {
      return 0;
    }
  }
  function size2(n) {
    return {
      TAG: 1,
      _0: "",
      _1: "size",
      _2: String(n)
    };
  }
  function for$p(str) {
    return {
      TAG: 0,
      _0: "htmlFor",
      _1: str
    };
  }
  function form$1(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "form",
      _2: value3
    };
  }
  function max2(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "max",
      _2: value3
    };
  }
  function min2(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "min",
      _2: value3
    };
  }
  function step(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "step",
      _2: value3
    };
  }
  function cols(n) {
    return {
      TAG: 1,
      _0: "",
      _1: "cols",
      _2: String(n)
    };
  }
  function rows(n) {
    return {
      TAG: 1,
      _0: "",
      _1: "rows",
      _2: String(n)
    };
  }
  function wrap(value3) {
    return {
      TAG: 0,
      _0: "wrap",
      _1: value3
    };
  }
  function href(str) {
    return {
      TAG: 1,
      _0: "",
      _1: "href",
      _2: str
    };
  }
  function target(t) {
    return {
      TAG: 0,
      _0: "target",
      _1: t
    };
  }
  function download(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "download",
        _1: ""
      };
    } else {
      return 0;
    }
  }
  function downloadAs(name2) {
    return {
      TAG: 0,
      _0: "download",
      _1: name2
    };
  }
  function hreflang(code) {
    return {
      TAG: 0,
      _0: "hreflang",
      _1: code
    };
  }
  function media(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "media",
      _2: value3
    };
  }
  function ping(url) {
    return {
      TAG: 0,
      _0: "ping",
      _1: url
    };
  }
  function rel(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "rel",
      _2: value3
    };
  }
  function ismap(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "ismap",
        _1: "ismap"
      };
    } else {
      return 0;
    }
  }
  function usemap(name2) {
    return {
      TAG: 0,
      _0: "usemap",
      _1: name2
    };
  }
  function shape(value3) {
    return {
      TAG: 0,
      _0: "shape",
      _1: value3
    };
  }
  function coords(value3) {
    return {
      TAG: 0,
      _0: "coords",
      _1: value3
    };
  }
  function src(str) {
    return {
      TAG: 1,
      _0: "",
      _1: "src",
      _2: str
    };
  }
  function height(n) {
    return {
      TAG: 1,
      _0: "",
      _1: "height",
      _2: String(n)
    };
  }
  function width(n) {
    return {
      TAG: 1,
      _0: "",
      _1: "width",
      _2: String(n)
    };
  }
  function alt(value3) {
    return {
      TAG: 0,
      _0: "alt",
      _1: value3
    };
  }
  function autoplay(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "autoplay",
        _1: "autoplay"
      };
    } else {
      return 0;
    }
  }
  function controls(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "controls",
        _1: "controls"
      };
    } else {
      return 0;
    }
  }
  function loop(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "loop",
        _1: "loop"
      };
    } else {
      return 0;
    }
  }
  function preload(value3) {
    return {
      TAG: 0,
      _0: "preload",
      _1: value3
    };
  }
  function poster(url) {
    return {
      TAG: 0,
      _0: "poster",
      _1: url
    };
  }
  function $$default(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "default",
        _1: "default"
      };
    } else {
      return 0;
    }
  }
  function kind(value3) {
    return {
      TAG: 0,
      _0: "kind",
      _1: value3
    };
  }
  function srclang(code) {
    return {
      TAG: 0,
      _0: "srclang",
      _1: code
    };
  }
  function sandbox(value3) {
    return {
      TAG: 0,
      _0: "sandbox",
      _1: value3
    };
  }
  function seamless(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "seamless",
        _1: "seamless"
      };
    } else {
      return 0;
    }
  }
  function srcdoc(value3) {
    return {
      TAG: 0,
      _0: "srcdoc",
      _1: value3
    };
  }
  function reversed(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "reversed",
        _1: "reversed"
      };
    } else {
      return 0;
    }
  }
  function start(n) {
    return {
      TAG: 0,
      _0: "start",
      _1: String(n)
    };
  }
  function colspan(n) {
    return {
      TAG: 1,
      _0: "",
      _1: "colspan",
      _2: String(n)
    };
  }
  function rowspan(n) {
    return {
      TAG: 1,
      _0: "",
      _1: "rowspan",
      _2: String(n)
    };
  }
  function headers(value3) {
    return {
      TAG: 0,
      _0: "headers",
      _1: value3
    };
  }
  function scope(value3) {
    return {
      TAG: 0,
      _0: "scope",
      _1: value3
    };
  }
  function align(value3) {
    return {
      TAG: 0,
      _0: "align",
      _1: value3
    };
  }
  function async(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "async",
        _1: "async"
      };
    } else {
      return 0;
    }
  }
  function charset(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "charset",
      _2: value3
    };
  }
  function content(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "content",
      _2: value3
    };
  }
  function defer(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "defer",
        _1: "defer"
      };
    } else {
      return 0;
    }
  }
  function httpEquiv(value3) {
    return {
      TAG: 0,
      _0: "http-equiv",
      _1: value3
    };
  }
  function language(value3) {
    return {
      TAG: 0,
      _0: "language",
      _1: value3
    };
  }
  function scoped(value3) {
    return {
      TAG: 0,
      _0: "scoped",
      _1: value3
    };
  }
  function accesskey(ch) {
    return {
      TAG: 0,
      _0: "accesskey",
      _1: make2(1, ch)
    };
  }
  function contenteditable(b) {
    if (b) {
      return {
        TAG: 0,
        _0: "contenteditable",
        _1: "contenteditable"
      };
    } else {
      return 0;
    }
  }
  function contextmenu(id3) {
    return {
      TAG: 1,
      _0: "",
      _1: "contextmenu",
      _2: id3
    };
  }
  function dir(value3) {
    return {
      TAG: 0,
      _0: "dir",
      _1: value3
    };
  }
  function draggable(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "draggable",
      _2: value3
    };
  }
  function dropzone(value3) {
    return {
      TAG: 0,
      _0: "dropzone",
      _1: value3
    };
  }
  function itemprop(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "itemprop",
      _2: value3
    };
  }
  function lang(code) {
    return {
      TAG: 0,
      _0: "lang",
      _1: code
    };
  }
  function spellcheck(b) {
    return {
      TAG: 1,
      _0: "",
      _1: "spellcheck",
      _2: b ? "true" : "false"
    };
  }
  function tabindex(n) {
    return {
      TAG: 1,
      _0: "",
      _1: "tabindex",
      _2: String(n)
    };
  }
  function challenge(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "challenge",
      _2: value3
    };
  }
  function keytype(value3) {
    return {
      TAG: 0,
      _0: "keytype",
      _1: value3
    };
  }
  function cite$1(url) {
    return {
      TAG: 0,
      _0: "cite",
      _1: url
    };
  }
  function datetime(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "datetime",
      _2: value3
    };
  }
  function pubdate(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "pubdate",
      _2: value3
    };
  }
  function manifest(value3) {
    return {
      TAG: 1,
      _0: "",
      _1: "manifest",
      _2: value3
    };
  }
  var Attributes = {
    noProp: 0,
    style: style$1,
    styles,
    $$class,
    classList,
    id: id2,
    title: title$1,
    hidden,
    type$p,
    value: value2,
    defaultValue,
    checked,
    placeholder,
    selected,
    accept,
    acceptCharset,
    action,
    autocomplete,
    autofocus,
    disabled,
    enctype,
    formaction,
    list: list2,
    minlength,
    maxlength,
    method,
    multiple,
    name,
    novalidate,
    pattern,
    readonly,
    required,
    size: size2,
    for$p,
    form: form$1,
    max: max2,
    min: min2,
    step,
    cols,
    rows,
    wrap,
    href,
    target,
    download,
    downloadAs,
    hreflang,
    media,
    ping,
    rel,
    ismap,
    usemap,
    shape,
    coords,
    src,
    height,
    width,
    alt,
    autoplay,
    controls,
    loop,
    preload,
    poster,
    $$default,
    kind,
    srclang,
    sandbox,
    seamless,
    srcdoc,
    reversed,
    start,
    colspan,
    rowspan,
    headers,
    scope,
    align,
    async,
    charset,
    content,
    defer,
    httpEquiv,
    language,
    scoped,
    accesskey,
    contenteditable,
    contextmenu,
    dir,
    draggable,
    dropzone,
    itemprop,
    lang,
    spellcheck,
    tabindex,
    challenge,
    keytype,
    cite: cite$1,
    datetime,
    pubdate,
    manifest
  };
  function onCB2(key, eventName, cb) {
    return onCB(eventName, key, cb);
  }
  var onMsg2 = onMsg;
  var defaultOptions = {
    stopPropagation: false,
    preventDefault: false
  };
  function onWithOptions(key, eventName, options, decoder) {
    return onCB(eventName, key, function($$event) {
      if (options.stopPropagation) {
        $$event.stopPropagation();
      }
      if (options.preventDefault) {
        $$event.preventDefault();
      }
      var result = Decoder.decodeEvent(decoder, $$event);
      if (result.TAG === 0) {
        return some(result._0);
      }
    });
  }
  function on(key, eventName, decoder) {
    return onWithOptions(key, eventName, defaultOptions, decoder);
  }
  var targetValue = Decoder.at({
    hd: "target",
    tl: {
      hd: "value",
      tl: 0
    }
  }, Decoder.string);
  var targetChecked = Decoder.at({
    hd: "target",
    tl: {
      hd: "checked",
      tl: 0
    }
  }, Decoder.bool);
  var keyCode = Decoder.field("keyCode", Decoder.$$int);
  function preventDefaultOn(keyOpt, eventName, decoder) {
    var key = keyOpt !== void 0 ? keyOpt : "";
    return onWithOptions(key, eventName, {
      stopPropagation: false,
      preventDefault: true
    }, decoder);
  }
  function onClick(msg) {
    return onMsg("click", msg);
  }
  function onDoubleClick(msg) {
    return onMsg("dblclick", msg);
  }
  function onMouseDown(msg) {
    return onMsg("mousedown", msg);
  }
  function onMouseUp(msg) {
    return onMsg("mouseup", msg);
  }
  function onMouseEnter(msg) {
    return onMsg("mouseenter", msg);
  }
  function onMouseLeave(msg) {
    return onMsg("mouseleave", msg);
  }
  function onMouseOver(msg) {
    return onMsg("mouseover", msg);
  }
  function onMouseOut(msg) {
    return onMsg("mouseout", msg);
  }
  function onInputOpt(keyOpt, msg) {
    var key = keyOpt !== void 0 ? keyOpt : "";
    return onCB("input", key, function(ev) {
      var target2 = ev.target;
      if (target2 === void 0) {
        return;
      }
      var value3 = target2.value;
      if (value3 !== void 0) {
        return _1(msg, value3);
      }
    });
  }
  function onInput(keyOpt, msg) {
    var key = keyOpt !== void 0 ? keyOpt : "";
    return onInputOpt(key, function(ev) {
      return some(_1(msg, ev));
    });
  }
  function onCheckOpt(keyOpt, msg) {
    var key = keyOpt !== void 0 ? keyOpt : "";
    return onCB("change", key, function(ev) {
      var target2 = ev.target;
      if (target2 === void 0) {
        return;
      }
      var value3 = target2.checked;
      if (value3 !== void 0) {
        return _1(msg, value3);
      }
    });
  }
  function onCheck(keyOpt, msg) {
    var key = keyOpt !== void 0 ? keyOpt : "";
    return onCheckOpt(key, function(ev) {
      return some(_1(msg, ev));
    });
  }
  function onChangeOpt(keyOpt, msg) {
    var key = keyOpt !== void 0 ? keyOpt : "";
    return onCB("change", key, function(ev) {
      var target2 = ev.target;
      if (target2 === void 0) {
        return;
      }
      var value3 = target2.value;
      if (value3 !== void 0) {
        return _1(msg, value3);
      }
    });
  }
  function onChange(keyOpt, msg) {
    var key = keyOpt !== void 0 ? keyOpt : "";
    return onChangeOpt(key, function(ev) {
      return some(_1(msg, ev));
    });
  }
  function onSubmit(msg) {
    return preventDefaultOn(void 0, "submit", Decoder.succeed(msg));
  }
  function onBlur(msg) {
    return onMsg("blur", msg);
  }
  function onFocus(msg) {
    return onMsg("focus", msg);
  }
  var noNode2 = noNode;
  var Events = {
    onCB: onCB2,
    onMsg: onMsg2,
    on,
    onWithOptions,
    defaultOptions,
    targetValue,
    targetChecked,
    keyCode,
    preventDefaultOn,
    onClick,
    onDoubleClick,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    onMouseOut,
    onInputOpt,
    onInput,
    onCheckOpt,
    onCheck,
    onChangeOpt,
    onChange,
    onSubmit,
    onBlur,
    onFocus
  };

  // src/app.bs.js
  function update(model, msg) {
    if (typeof msg !== "number") {
      return msg._0;
    }
    switch (msg) {
      case 0:
        return model + 1 | 0;
      case 1:
        return model - 1 | 0;
      case 2:
        return 0;
    }
  }
  function view_button(title, msg) {
    return button(void 0, void 0, {
      hd: Events.onClick(msg),
      tl: 0
    }, {
      hd: text(title),
      tl: 0
    });
  }
  function view(model) {
    return div(void 0, void 0, 0, {
      hd: span(void 0, void 0, {
        hd: Attributes.classList({
          hd: [
            "value",
            true
          ],
          tl: 0
        }),
        tl: 0
      }, {
        hd: text(model.toString()),
        tl: 0
      }),
      tl: {
        hd: br(0),
        tl: {
          hd: view_button("Increment", 0),
          tl: {
            hd: br(0),
            tl: {
              hd: view_button("Decrement", 1),
              tl: {
                hd: br(0),
                tl: {
                  hd: view_button("Set to 35", {
                    _0: 35
                  }),
                  tl: {
                    hd: br(0),
                    tl: {
                      hd: model !== 0 ? view_button("Reset", 2) : noNode2,
                      tl: 0
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  }
  var partial_arg = {
    model: 4,
    update,
    view
  };
  function main(param, param$1) {
    return beginnerProgram(partial_arg, param, param$1);
  }

  // src/index.bs.js
  main(document.getElementById("root"), void 0);
})();
