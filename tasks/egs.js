(function (GLOBAL) {
  "use strict";
  var __defer, __generatorToPromise, __isArray, __slice, __strnum, __toArray,
      __toPromise, __typeof, egs, fs, path, setImmediate;
  __defer = (function () {
    function __defer() {
      var deferred, isError, value;
      isError = false;
      value = null;
      deferred = [];
      function complete(newIsError, newValue) {
        var funcs;
        if (deferred) {
          funcs = deferred;
          deferred = null;
          isError = newIsError;
          value = newValue;
          if (funcs.length) {
            setImmediate(function () {
              var _end, i;
              for (i = 0, _end = funcs.length; i < _end; ++i) {
                funcs[i]();
              }
            });
          }
        }
      }
      return {
        promise: {
          then: function (onFulfilled, onRejected, allowSync) {
            var _ref, fulfill, promise, reject;
            if (allowSync !== true) {
              allowSync = void 0;
            }
            _ref = __defer();
            promise = _ref.promise;
            fulfill = _ref.fulfill;
            reject = _ref.reject;
            _ref = null;
            function step() {
              var f, result;
              try {
                if (isError) {
                  f = onRejected;
                } else {
                  f = onFulfilled;
                }
                if (typeof f === "function") {
                  result = f(value);
                  if (result && typeof result.then === "function") {
                    result.then(fulfill, reject, allowSync);
                  } else {
                    fulfill(result);
                  }
                } else {
                  (isError ? reject : fulfill)(value);
                }
              } catch (e) {
                reject(e);
              }
            }
            if (deferred) {
              deferred.push(step);
            } else if (allowSync) {
              step();
            } else {
              setImmediate(step);
            }
            return promise;
          },
          sync: function () {
            var result, state;
            state = 0;
            result = 0;
            this.then(
              function (ret) {
                state = 1;
                result = ret;
              },
              function (err) {
                state = 2;
                result = err;
              },
              true
            );
            switch (state) {
            case 0: throw new Error("Promise did not execute synchronously");
            case 1: return result;
            case 2: throw result;
            default: throw new Error("Unknown state");
            }
          }
        },
        fulfill: function (value) {
          complete(false, value);
        },
        reject: function (reason) {
          complete(true, reason);
        }
      };
    }
    __defer.fulfilled = function (value) {
      var d;
      d = __defer();
      d.fulfill(value);
      return d.promise;
    };
    __defer.rejected = function (reason) {
      var d;
      d = __defer();
      d.reject(reason);
      return d.promise;
    };
    return __defer;
  }());
  __generatorToPromise = function (generator, allowSync) {
    if (typeof generator !== "object" || generator === null) {
      throw new TypeError("Expected generator to be an Object, got " + __typeof(generator));
    } else {
      if (typeof generator.send !== "function") {
        throw new TypeError("Expected generator.send to be a Function, got " + __typeof(generator.send));
      }
      if (typeof generator["throw"] !== "function") {
        throw new TypeError("Expected generator.throw to be a Function, got " + __typeof(generator["throw"]));
      }
    }
    if (allowSync == null) {
      allowSync = false;
    } else if (typeof allowSync !== "boolean") {
      throw new TypeError("Expected allowSync to be a Boolean, got " + __typeof(allowSync));
    }
    function continuer(verb, arg) {
      var item;
      try {
        item = generator[verb](arg);
      } catch (e) {
        return __defer.rejected(e);
      }
      if (item.done) {
        return __defer.fulfilled(item.value);
      } else {
        return item.value.then(callback, errback, allowSync);
      }
    }
    function callback(value) {
      return continuer("send", value);
    }
    function errback(value) {
      return continuer("throw", value);
    }
    return callback(void 0);
  };
  __isArray = typeof Array.isArray === "function" ? Array.isArray
    : (function (_toString) {
      return function (x) {
        return _toString.call(x) === "[object Array]";
      };
    }(Object.prototype.toString));
  __slice = Array.prototype.slice;
  __strnum = function (strnum) {
    var type;
    type = typeof strnum;
    if (type === "string") {
      return strnum;
    } else if (type === "number") {
      return String(strnum);
    } else {
      throw new TypeError("Expected a string or number, got " + __typeof(strnum));
    }
  };
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
  __toPromise = function (func, context, args) {
    var _ref, fulfill, promise, reject;
    if (typeof func !== "function") {
      throw new TypeError("Expected func to be a Function, got " + __typeof(func));
    }
    _ref = __defer();
    promise = _ref.promise;
    reject = _ref.reject;
    fulfill = _ref.fulfill;
    _ref = null;
    func.apply(context, __toArray(args).concat([
      function (err, value) {
        if (err != null) {
          reject(err);
        } else {
          fulfill(value);
        }
      }
    ]));
    return promise;
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
  setImmediate = typeof GLOBAL.setImmediate === "function" ? GLOBAL.setImmediate
    : typeof process !== "undefined" && typeof process.nextTick === "function"
    ? (function (nextTick) {
      return function (func) {
        var args;
        if (typeof func !== "function") {
          throw new TypeError("Expected func to be a Function, got " + __typeof(func));
        }
        args = __slice.call(arguments, 1);
        if (args.length) {
          return nextTick(function () {
            func.apply(void 0, __toArray(args));
          });
        } else {
          return nextTick(func);
        }
      };
    }(process.nextTick))
    : function (func) {
      var args;
      if (typeof func !== "function") {
        throw new TypeError("Expected func to be a Function, got " + __typeof(func));
      }
      args = __slice.call(arguments, 1);
      if (args.length) {
        return setTimeout(
          function () {
            func.apply(void 0, args);
          },
          0
        );
      } else {
        return setTimeout(func, 0);
      }
    };
  /*!
   * grunt-gorilla
   * https://github.com/ckknight/grunt-gorilla
   *
   * Copyright (c) 2013 Cameron Kenneth Knight
   * Licensed under the MIT license.
   */
  path = require("path");
  fs = require("fs");
  egs = require("egs");
  module.exports = function (grunt) {
    return grunt.registerMultiTask("egs", "Compile EGS packages into JavaScript.", function () {
      var _this, done, options, promise, verbose;
      _this = this;
      options = this.options({
        bare: false,
        sourceMap: null,
        linefeed: grunt.util.linefeed,
        encoding: grunt.file.defaultEncoding,
        coverage: false,
        "export": "EGSTemplates",
        includeRuntime: false
      });
      grunt.verbose.writeflags(options, "Options");
      verbose = grunt.option("verbose") || options.verbose;
      done = this.async();
      promise = __generatorToPromise((function () {
        var _arr, _e, _i, _len, _send, _state, _step, _throw, compileOptions,
            dest, e, file, sourceDirectory, startTime, stat;
        _state = 0;
        function _close() {
          _state = 9;
        }
        function _step(_received) {
          while (true) {
            switch (_state) {
            case 0:
              _arr = __toArray(_this.files);
              _i = 0;
              _len = _arr.length;
              ++_state;
            case 1:
              _state = _i < _len ? 2 : 9;
              break;
            case 2:
              file = _arr[_i];
              startTime = Date.now();
              if (file.src.length !== 1) {
                throw "Must provide a single directory";
              }
              sourceDirectory = file.src[0];
              ++_state;
            case 3:
              ++_state;
              return {
                done: false,
                value: __toPromise(fs.stat, fs, [sourceDirectory])
              };
            case 4:
              stat = _received;
              _state = 6;
              break;
            case 5: throw "Unable to open " + __strnum(sourceDirectory) + ": " + String(e);
            case 6:
              if (!stat.isDirectory()) {
                throw "Must provide a directory, '" + __strnum(sourceDirectory) + "' is not.";
              }
              dest = _this.files[0].dest;
              compileOptions = {
                encoding: options.encoding,
                linefeed: options.linefeed,
                bare: options.bare,
                coverage: options.coverage,
                sourceMap: options.sourceMap ? { file: __strnum(dest) + ".map", sourceRoot: options.sourceRoot || "" } : null,
                globalExport: options["export"],
                includeEgsRuntime: options.includeRuntime
              };
              if (typeof options.tokens === "string") {
                switch (options.tokens) {
                case "{{":
                  compileOptions.open = "{%";
                  compileOptions.close = "%}";
                  compileOptions.openWrite = "{{";
                  compileOptions.closeWrite = "}}";
                  compileOptions.openComment = "{#";
                  compileOptions.closeComment = "#}";
                  compileOptions.openLiteral = "{@";
                  compileOptions.closeLiteral = "@}";
                  break;
                case "<%":
                  break;
                default: throw "Unexpected tokens option: '" + __strnum(options.tokens) + "'";
                }
              } else if (typeof options.tokens === "object" && options.tokens !== null) {
                compileOptions.open = options.tokens.open;
                compileOptions.close = options.tokens.close;
                compileOptions.openWrite = options.tokens.openWrite;
                compileOptions.closeWrite = options.tokens.closeWrite;
                compileOptions.openComment = options.tokens.openComment;
                compileOptions.closeComment = options.tokens.closeComment;
                compileOptions.openLiteral = options.tokens.openLiteral;
                compileOptions.closeLiteral = options.tokens.closeLiteral;
              }
              grunt.log.write("Compiling " + __strnum(path.basename(sourceDirectory)) + " ...");
              startTime = Date.now();
              ++_state;
              return {
                done: false,
                value: egs.compilePackage(sourceDirectory, dest, compileOptions)
              };
            case 7:
              grunt.log.writeln(" " + ((Date.now() - startTime) / 1000).toFixed(3) + " s");
              ++_state;
            case 8:
              ++_i;
              _state = 1;
              break;
            case 9:
              return { done: true, value: void 0 };
            default: throw new Error("Unknown state: " + _state);
            }
          }
        }
        function _throw(_e) {
          if (_state === 3 || _state === 4) {
            e = _e;
            _state = 5;
          } else {
            _close();
            throw _e;
          }
        }
        function _send(_received) {
          while (true) {
            try {
              return _step(_received);
            } catch (_e) {
              _throw(_e);
            }
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
          }
        };
      }()));
      promise.then(
        function () {
          return done();
        },
        function (e) {
          if (typeof e === "string") {
            grunt.log.error(e);
          } else {
            grunt.log.error("Got an unexpected exception: " + String(e != null && e.stack || e));
          }
          return done(false);
        }
      );
    });
  };
}.call(this, typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : this));
