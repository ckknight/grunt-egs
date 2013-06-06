(function (factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory(require("egs"));
  } else if (typeof define === "function" && define.amd) {
    define(["egs"], factory);
  } else {
    this.EGSTemplates = factory(this.EGS);
  }
}.call(this, function (EGS) {
  var templates;
  if (!EGS) {
    throw Error("Expected EGS to be available");
  }
  templates = EGS.Package();
  (function () {
    "use strict";
    var __first, __generator, __import, __owns, __slice;
    __first = function (x) {
      return x;
    };
    __generator = function (func) {
      return function () {
        var _this, data;
        _this = this;
        data = [this, __slice.call(arguments)];
        return {
          iterator: function () {
            return this;
          },
          send: function () {
            var tmp;
            return {
              done: true,
              value: data ? (tmp = data, data = null, func.apply(tmp[0], tmp[1])) : void 0
            };
          },
          next: function () {
            return this.send();
          },
          "throw": function (err) {
            data = null;
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
    __owns = Object.prototype.hasOwnProperty;
    __slice = Array.prototype.slice;
    templates.set("hello.egs", (function () {
      return __generator(function (write, context, helpers) {
        return write + "Hello, " + helpers.escape(context.name);
      });
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
              ++_state;
              return {
                done: false,
                value: helpers.partial(
                  "hello",
                  __first(write, write = ""),
                  (_ref = __import({}, context), _ref.name = context.name || "world", _ref)
                )
              };
            case 1:
              write = _received;
              ++_state;
              return { done: true, value: write };
            case 2:
              return { done: true, value: void 0 };
            default: throw Error("Unknown state: " + _state);
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

/*
//@ sourceMappingURL=maps.js.map
*/
