try {
  if (typeof top === "object" && top !== null && typeof top.opener === "object" && top.opener !== null && !top.opener._$jscoverage) {
    top.opener._$jscoverage = {};
  }
} catch (e) {}
try {
  if (typeof top === "object" && top !== null) {
    try {
      if (typeof top.opener === "object" && top.opener !== null && top.opener._$jscoverage) {
        top._$jscoverage = top.opener._$jscoverage;
      }
    } catch (e) {}
    if (!top._$jscoverage) {
      top._$jscoverage = {};
    }
  }
} catch (e) {}
try {
  if (typeof top === "object" && top !== null) {
    top._$jscoverage;
  }
} catch (e) {}
if (typeof _$jscoverage !== "object") {
  _$jscoverage = {};
}
if (!_$jscoverage["test/fixtures/hello.egs"]) {
  (function () {
    var cov, i, lines;
    _$jscoverage["test/fixtures/hello.egs"] = cov = [];
    for (i = 0, lines = [1]; i < 1; ++i) {
      cov[lines[i]] = 0;
    }
    cov.source = ["Hello, <%= name %>"];
  }());
}
if (!_$jscoverage["test/fixtures/use-hello.egs"]) {
  (function () {
    var cov, i, lines;
    _$jscoverage["test/fixtures/use-hello.egs"] = cov = [];
    for (i = 0, lines = [1]; i < 1; ++i) {
      cov[lines[i]] = 0;
    }
    cov.source = ['<% partial "hello", name: name or "world" %>'];
  }());
}
(function (factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(require("egs"));
  } else if (typeof define === "function" && define.amd) {
    define(["egs-runtime"], factory);
  } else {
    this.EGSTemplates = factory(this.EGSRuntime);
  }
}.call(this, function (EGSRuntime) {
  var templates;
  if (!EGSRuntime) {
    throw Error("Expected EGSRuntime to be available");
  }
  templates = EGSRuntime.Package("0.3.1");
  (function () {
    "use strict";
    var __first, __generator, __import, __isArray, __owns, __slice, __toArray,
        __typeof;
    __first = function (x) {
      return x;
    };
    __generator = function (func) {
      return function () {
        var args, self;
        self = this;
        args = arguments;
        return {
          iterator: function () {
            return this;
          },
          send: function () {
            var value;
            if (args) {
              value = func.apply(self, __toArray(args));
              self = null;
              args = null;
            }
            return { done: true, value: value };
          },
          next: function () {
            return this.send();
          },
          "throw": function (err) {
            self = null;
            args = null;
            throw err;
          }
        };
      };
    };
    __import = function (dest, source) {
      var k;
      for (k in source) {
        if (__owns.call(source, k)) {
          dest[k] = source[k];
        }
      }
      return dest;
    };
    __isArray = typeof Array.isArray === "function" ? Array.isArray
      : (function (_toString) {
        return function (x) {
          return _toString.call(x) === "[object Array]";
        };
      }(Object.prototype.toString));
    __owns = Object.prototype.hasOwnProperty;
    __slice = Array.prototype.slice;
    __toArray = function (x) {
      if (x == null) {
        throw new TypeError("Expected an object, got " + __typeof(x));
      } else if (__isArray(x)) {
        return x;
      } else if (typeof x === "string") {
        return x.split("");
      } else if (typeof x.length === "number") {
        return __slice.call(x);
      } else {
        throw new TypeError("Expected an object with a length property, got " + __typeof(x));
      }
    };
    __typeof = (function () {
      var _toString;
      _toString = Object.prototype.toString;
      return function (o) {
        if (o === void 0) {
          return "Undefined";
        } else if (o === null) {
          return "Null";
        } else {
          return o.constructor && o.constructor.name || _toString.call(o).slice(8, -1);
        }
      };
    }());
    templates.setSimple("hello.egs", (function () {
      return function (write, context, helpers) {
        return write + "Hello, " + (++_$jscoverage["test/fixtures/hello.egs"][1], helpers.escape(context.name));
      };
    }.call(this)));
    templates.set("use-hello.egs", (function () {
      var _e, _ref, _send, _state, _step, _throw;
      return function (write, context, helpers) {
        var _e, _ref, _send, _state, _step, _throw;
        _state = 0;
        function _close() {
          _state = 2;
        }
        function _step(_received) {
          while (true) {
            switch (_state) {
            case 0:
              ++_$jscoverage["test/fixtures/use-hello.egs"][1];
              ++_state;
              return {
                done: false,
                value: helpers.partial(
                  "hello",
                  __first(write, (write = "", void 0)),
                  (_ref = __import({}, context), _ref.name = context.name || "world", _ref)
                )
              };
            case 1:
              write = _received;
              ++_state;
              return { done: true, value: write };
            case 2:
              return { done: true, value: void 0 };
            default: throw new Error("Unknown state: " + _state);
            }
          }
        }
        function _throw(_e) {
          _close();
          throw _e;
        }
        function _send(_received) {
          try {
            return _step(_received);
          } catch (_e) {
            _throw(_e);
          }
        }
        return {
          close: _close,
          iterator: function () {
            return this;
          },
          next: function () {
            return _send(void 0);
          },
          send: _send,
          "throw": function (_e) {
            _throw(_e);
            return _send(void 0);
          },
          flush: function () {
            var flushed;
            flushed = write;
            write = "";
            return flushed;
          }
        };
      };
    }.call(this)));
  }.call(this));
  return templates;
}));
