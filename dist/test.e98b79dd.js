// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function(modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire
  var nodeRequire = typeof require === 'function' && require

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire
        if (!jumped && currentRequire) {
          return currentRequire(name, true)
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true)
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name)
        }

        var err = new Error("Cannot find module '" + name + "'")
        err.code = 'MODULE_NOT_FOUND'
        throw err
      }

      localRequire.resolve = resolve
      localRequire.cache = {}

      var module = (cache[name] = new newRequire.Module(name))

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      )
    }

    return cache[name].exports

    function localRequire(x) {
      return newRequire(localRequire.resolve(x))
    }

    function resolve(x) {
      return modules[name][1][x] || x
    }
  }

  function Module(moduleName) {
    this.id = moduleName
    this.bundle = newRequire
    this.exports = {}
  }

  newRequire.isParcelRequire = true
  newRequire.Module = Module
  newRequire.modules = modules
  newRequire.cache = cache
  newRequire.parent = previousRequire
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports
      },
      {},
    ]
  }

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i])
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1])

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports
      })

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports
    }
  }

  // Override the current require with this new one
  return newRequire
})(
  {
    '../node_modules/regenerator-runtime/runtime.js': [
      function(require, module, exports) {
        var global = arguments[3]
        /**
         * Copyright (c) 2014-present, Facebook, Inc.
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */

        !(function(global) {
          'use strict'

          var Op = Object.prototype
          var hasOwn = Op.hasOwnProperty
          var undefined // More compressible than void 0.
          var $Symbol = typeof Symbol === 'function' ? Symbol : {}
          var iteratorSymbol = $Symbol.iterator || '@@iterator'
          var asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator'
          var toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag'

          var inModule = typeof module === 'object'
          var runtime = global.regeneratorRuntime
          if (runtime) {
            if (inModule) {
              // If regeneratorRuntime is defined globally and we're in a module,
              // make the exports object identical to regeneratorRuntime.
              module.exports = runtime
            }
            // Don't bother evaluating the rest of this file if the runtime was
            // already defined globally.
            return
          }

          // Define the runtime globally (as expected by generated code) as either
          // module.exports (if we're in a module) or a new, empty object.
          runtime = global.regeneratorRuntime = inModule ? module.exports : {}

          function wrap(innerFn, outerFn, self, tryLocsList) {
            // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
            var protoGenerator =
              outerFn && outerFn.prototype instanceof Generator
                ? outerFn
                : Generator
            var generator = Object.create(protoGenerator.prototype)
            var context = new Context(tryLocsList || [])

            // The ._invoke method unifies the implementations of the .next,
            // .throw, and .return methods.
            generator._invoke = makeInvokeMethod(innerFn, self, context)

            return generator
          }
          runtime.wrap = wrap

          // Try/catch helper to minimize deoptimizations. Returns a completion
          // record like context.tryEntries[i].completion. This interface could
          // have been (and was previously) designed to take a closure to be
          // invoked without arguments, but in all the cases we care about we
          // already have an existing method we want to call, so there's no need
          // to create a new function object. We can even get away with assuming
          // the method takes exactly one argument, since that happens to be true
          // in every case, so we don't have to touch the arguments object. The
          // only additional allocation required is the completion record, which
          // has a stable shape and so hopefully should be cheap to allocate.
          function tryCatch(fn, obj, arg) {
            try {
              return {type: 'normal', arg: fn.call(obj, arg)}
            } catch (err) {
              return {type: 'throw', arg: err}
            }
          }

          var GenStateSuspendedStart = 'suspendedStart'
          var GenStateSuspendedYield = 'suspendedYield'
          var GenStateExecuting = 'executing'
          var GenStateCompleted = 'completed'

          // Returning this object from the innerFn has the same effect as
          // breaking out of the dispatch switch statement.
          var ContinueSentinel = {}

          // Dummy constructor functions that we use as the .constructor and
          // .constructor.prototype properties for functions that return Generator
          // objects. For full spec compliance, you may wish to configure your
          // minifier not to mangle the names of these two functions.
          function Generator() {}
          function GeneratorFunction() {}
          function GeneratorFunctionPrototype() {}

          // This is a polyfill for %IteratorPrototype% for environments that
          // don't natively support it.
          var IteratorPrototype = {}
          IteratorPrototype[iteratorSymbol] = function() {
            return this
          }

          var getProto = Object.getPrototypeOf
          var NativeIteratorPrototype =
            getProto && getProto(getProto(values([])))
          if (
            NativeIteratorPrototype &&
            NativeIteratorPrototype !== Op &&
            hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
          ) {
            // This environment has a native %IteratorPrototype%; use it instead
            // of the polyfill.
            IteratorPrototype = NativeIteratorPrototype
          }

          var Gp = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(
            IteratorPrototype
          ))
          GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype
          GeneratorFunctionPrototype.constructor = GeneratorFunction
          GeneratorFunctionPrototype[
            toStringTagSymbol
          ] = GeneratorFunction.displayName = 'GeneratorFunction'

          // Helper for defining the .next, .throw, and .return methods of the
          // Iterator interface in terms of a single ._invoke method.
          function defineIteratorMethods(prototype) {
            ;['next', 'throw', 'return'].forEach(function(method) {
              prototype[method] = function(arg) {
                return this._invoke(method, arg)
              }
            })
          }

          runtime.isGeneratorFunction = function(genFun) {
            var ctor = typeof genFun === 'function' && genFun.constructor
            return ctor
              ? ctor === GeneratorFunction ||
                  // For the native GeneratorFunction constructor, the best we can
                  // do is to check its .name property.
                  (ctor.displayName || ctor.name) === 'GeneratorFunction'
              : false
          }

          runtime.mark = function(genFun) {
            if (Object.setPrototypeOf) {
              Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
            } else {
              genFun.__proto__ = GeneratorFunctionPrototype
              if (!(toStringTagSymbol in genFun)) {
                genFun[toStringTagSymbol] = 'GeneratorFunction'
              }
            }
            genFun.prototype = Object.create(Gp)
            return genFun
          }

          // Within the body of any async function, `await x` is transformed to
          // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
          // `hasOwn.call(value, "__await")` to determine if the yielded value is
          // meant to be awaited.
          runtime.awrap = function(arg) {
            return {__await: arg}
          }

          function AsyncIterator(generator) {
            function invoke(method, arg, resolve, reject) {
              var record = tryCatch(generator[method], generator, arg)
              if (record.type === 'throw') {
                reject(record.arg)
              } else {
                var result = record.arg
                var value = result.value
                if (
                  value &&
                  typeof value === 'object' &&
                  hasOwn.call(value, '__await')
                ) {
                  return Promise.resolve(value.__await).then(
                    function(value) {
                      invoke('next', value, resolve, reject)
                    },
                    function(err) {
                      invoke('throw', err, resolve, reject)
                    }
                  )
                }

                return Promise.resolve(value).then(
                  function(unwrapped) {
                    // When a yielded Promise is resolved, its final value becomes
                    // the .value of the Promise<{value,done}> result for the
                    // current iteration.
                    result.value = unwrapped
                    resolve(result)
                  },
                  function(error) {
                    // If a rejected Promise was yielded, throw the rejection back
                    // into the async generator function so it can be handled there.
                    return invoke('throw', error, resolve, reject)
                  }
                )
              }
            }

            var previousPromise

            function enqueue(method, arg) {
              function callInvokeWithMethodAndArg() {
                return new Promise(function(resolve, reject) {
                  invoke(method, arg, resolve, reject)
                })
              }

              return (previousPromise =
                // If enqueue has been called before, then we want to wait until
                // all previous Promises have been resolved before calling invoke,
                // so that results are always delivered in the correct order. If
                // enqueue has not been called before, then it is important to
                // call invoke immediately, without waiting on a callback to fire,
                // so that the async generator function has the opportunity to do
                // any necessary setup in a predictable way. This predictability
                // is why the Promise constructor synchronously invokes its
                // executor callback, and why async functions synchronously
                // execute code before the first await. Since we implement simple
                // async functions in terms of async generators, it is especially
                // important to get this right, even though it requires care.
                previousPromise
                  ? previousPromise.then(
                      callInvokeWithMethodAndArg,
                      // Avoid propagating failures to Promises returned by later
                      // invocations of the iterator.
                      callInvokeWithMethodAndArg
                    )
                  : callInvokeWithMethodAndArg())
            }

            // Define the unified helper method that is used to implement .next,
            // .throw, and .return (see defineIteratorMethods).
            this._invoke = enqueue
          }

          defineIteratorMethods(AsyncIterator.prototype)
          AsyncIterator.prototype[asyncIteratorSymbol] = function() {
            return this
          }
          runtime.AsyncIterator = AsyncIterator

          // Note that simple async functions are implemented on top of
          // AsyncIterator objects; they just return a Promise for the value of
          // the final result produced by the iterator.
          runtime.async = function(innerFn, outerFn, self, tryLocsList) {
            var iter = new AsyncIterator(
              wrap(innerFn, outerFn, self, tryLocsList)
            )

            return runtime.isGeneratorFunction(outerFn)
              ? iter // If outerFn is a generator, return the full iterator.
              : iter.next().then(function(result) {
                  return result.done ? result.value : iter.next()
                })
          }

          function makeInvokeMethod(innerFn, self, context) {
            var state = GenStateSuspendedStart

            return function invoke(method, arg) {
              if (state === GenStateExecuting) {
                throw new Error('Generator is already running')
              }

              if (state === GenStateCompleted) {
                if (method === 'throw') {
                  throw arg
                }

                // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                return doneResult()
              }

              context.method = method
              context.arg = arg

              while (true) {
                var delegate = context.delegate
                if (delegate) {
                  var delegateResult = maybeInvokeDelegate(delegate, context)
                  if (delegateResult) {
                    if (delegateResult === ContinueSentinel) continue
                    return delegateResult
                  }
                }

                if (context.method === 'next') {
                  // Setting context._sent for legacy support of Babel's
                  // function.sent implementation.
                  context.sent = context._sent = context.arg
                } else if (context.method === 'throw') {
                  if (state === GenStateSuspendedStart) {
                    state = GenStateCompleted
                    throw context.arg
                  }

                  context.dispatchException(context.arg)
                } else if (context.method === 'return') {
                  context.abrupt('return', context.arg)
                }

                state = GenStateExecuting

                var record = tryCatch(innerFn, self, context)
                if (record.type === 'normal') {
                  // If an exception is thrown from innerFn, we leave state ===
                  // GenStateExecuting and loop back for another invocation.
                  state = context.done
                    ? GenStateCompleted
                    : GenStateSuspendedYield

                  if (record.arg === ContinueSentinel) {
                    continue
                  }

                  return {
                    value: record.arg,
                    done: context.done,
                  }
                } else if (record.type === 'throw') {
                  state = GenStateCompleted
                  // Dispatch the exception by looping back around to the
                  // context.dispatchException(context.arg) call above.
                  context.method = 'throw'
                  context.arg = record.arg
                }
              }
            }
          }

          // Call delegate.iterator[context.method](context.arg) and handle the
          // result, either by returning a { value, done } result from the
          // delegate iterator, or by modifying context.method and context.arg,
          // setting context.delegate to null, and returning the ContinueSentinel.
          function maybeInvokeDelegate(delegate, context) {
            var method = delegate.iterator[context.method]
            if (method === undefined) {
              // A .throw or .return when the delegate iterator has no .throw
              // method always terminates the yield* loop.
              context.delegate = null

              if (context.method === 'throw') {
                if (delegate.iterator.return) {
                  // If the delegate iterator has a return method, give it a
                  // chance to clean up.
                  context.method = 'return'
                  context.arg = undefined
                  maybeInvokeDelegate(delegate, context)

                  if (context.method === 'throw') {
                    // If maybeInvokeDelegate(context) changed context.method from
                    // "return" to "throw", let that override the TypeError below.
                    return ContinueSentinel
                  }
                }

                context.method = 'throw'
                context.arg = new TypeError(
                  "The iterator does not provide a 'throw' method"
                )
              }

              return ContinueSentinel
            }

            var record = tryCatch(method, delegate.iterator, context.arg)

            if (record.type === 'throw') {
              context.method = 'throw'
              context.arg = record.arg
              context.delegate = null
              return ContinueSentinel
            }

            var info = record.arg

            if (!info) {
              context.method = 'throw'
              context.arg = new TypeError('iterator result is not an object')
              context.delegate = null
              return ContinueSentinel
            }

            if (info.done) {
              // Assign the result of the finished delegate to the temporary
              // variable specified by delegate.resultName (see delegateYield).
              context[delegate.resultName] = info.value

              // Resume execution at the desired location (see delegateYield).
              context.next = delegate.nextLoc

              // If context.method was "throw" but the delegate handled the
              // exception, let the outer generator proceed normally. If
              // context.method was "next", forget context.arg since it has been
              // "consumed" by the delegate iterator. If context.method was
              // "return", allow the original .return call to continue in the
              // outer generator.
              if (context.method !== 'return') {
                context.method = 'next'
                context.arg = undefined
              }
            } else {
              // Re-yield the result returned by the delegate method.
              return info
            }

            // The delegate iterator is finished, so forget it and continue with
            // the outer generator.
            context.delegate = null
            return ContinueSentinel
          }

          // Define Generator.prototype.{next,throw,return} in terms of the
          // unified ._invoke helper method.
          defineIteratorMethods(Gp)

          Gp[toStringTagSymbol] = 'Generator'

          // A Generator should always return itself as the iterator object when the
          // @@iterator function is called on it. Some browsers' implementations of the
          // iterator prototype chain incorrectly implement this, causing the Generator
          // object to not be returned from this call. This ensures that doesn't happen.
          // See https://github.com/facebook/regenerator/issues/274 for more details.
          Gp[iteratorSymbol] = function() {
            return this
          }

          Gp.toString = function() {
            return '[object Generator]'
          }

          function pushTryEntry(locs) {
            var entry = {tryLoc: locs[0]}

            if (1 in locs) {
              entry.catchLoc = locs[1]
            }

            if (2 in locs) {
              entry.finallyLoc = locs[2]
              entry.afterLoc = locs[3]
            }

            this.tryEntries.push(entry)
          }

          function resetTryEntry(entry) {
            var record = entry.completion || {}
            record.type = 'normal'
            delete record.arg
            entry.completion = record
          }

          function Context(tryLocsList) {
            // The root entry object (effectively a try statement without a catch
            // or a finally block) gives us a place to store values thrown from
            // locations where there is no enclosing try statement.
            this.tryEntries = [{tryLoc: 'root'}]
            tryLocsList.forEach(pushTryEntry, this)
            this.reset(true)
          }

          runtime.keys = function(object) {
            var keys = []
            for (var key in object) {
              keys.push(key)
            }
            keys.reverse()

            // Rather than returning an object with a next method, we keep
            // things simple and return the next function itself.
            return function next() {
              while (keys.length) {
                var key = keys.pop()
                if (key in object) {
                  next.value = key
                  next.done = false
                  return next
                }
              }

              // To avoid creating an additional object, we just hang the .value
              // and .done properties off the next function object itself. This
              // also ensures that the minifier will not anonymize the function.
              next.done = true
              return next
            }
          }

          function values(iterable) {
            if (iterable) {
              var iteratorMethod = iterable[iteratorSymbol]
              if (iteratorMethod) {
                return iteratorMethod.call(iterable)
              }

              if (typeof iterable.next === 'function') {
                return iterable
              }

              if (!isNaN(iterable.length)) {
                var i = -1,
                  next = function next() {
                    while (++i < iterable.length) {
                      if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i]
                        next.done = false
                        return next
                      }
                    }

                    next.value = undefined
                    next.done = true

                    return next
                  }

                return (next.next = next)
              }
            }

            // Return an iterator with no values.
            return {next: doneResult}
          }
          runtime.values = values

          function doneResult() {
            return {value: undefined, done: true}
          }

          Context.prototype = {
            constructor: Context,

            reset: function(skipTempReset) {
              this.prev = 0
              this.next = 0
              // Resetting context._sent for legacy support of Babel's
              // function.sent implementation.
              this.sent = this._sent = undefined
              this.done = false
              this.delegate = null

              this.method = 'next'
              this.arg = undefined

              this.tryEntries.forEach(resetTryEntry)

              if (!skipTempReset) {
                for (var name in this) {
                  // Not sure about the optimal order of these conditions:
                  if (
                    name.charAt(0) === 't' &&
                    hasOwn.call(this, name) &&
                    !isNaN(+name.slice(1))
                  ) {
                    this[name] = undefined
                  }
                }
              }
            },

            stop: function() {
              this.done = true

              var rootEntry = this.tryEntries[0]
              var rootRecord = rootEntry.completion
              if (rootRecord.type === 'throw') {
                throw rootRecord.arg
              }

              return this.rval
            },

            dispatchException: function(exception) {
              if (this.done) {
                throw exception
              }

              var context = this
              function handle(loc, caught) {
                record.type = 'throw'
                record.arg = exception
                context.next = loc

                if (caught) {
                  // If the dispatched exception was caught by a catch block,
                  // then let that catch block handle the exception normally.
                  context.method = 'next'
                  context.arg = undefined
                }

                return !!caught
              }

              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i]
                var record = entry.completion

                if (entry.tryLoc === 'root') {
                  // Exception thrown outside of any try block that could handle
                  // it, so set the completion value of the entire function to
                  // throw the exception.
                  return handle('end')
                }

                if (entry.tryLoc <= this.prev) {
                  var hasCatch = hasOwn.call(entry, 'catchLoc')
                  var hasFinally = hasOwn.call(entry, 'finallyLoc')

                  if (hasCatch && hasFinally) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true)
                    } else if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc)
                    }
                  } else if (hasCatch) {
                    if (this.prev < entry.catchLoc) {
                      return handle(entry.catchLoc, true)
                    }
                  } else if (hasFinally) {
                    if (this.prev < entry.finallyLoc) {
                      return handle(entry.finallyLoc)
                    }
                  } else {
                    throw new Error('try statement without catch or finally')
                  }
                }
              }
            },

            abrupt: function(type, arg) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i]
                if (
                  entry.tryLoc <= this.prev &&
                  hasOwn.call(entry, 'finallyLoc') &&
                  this.prev < entry.finallyLoc
                ) {
                  var finallyEntry = entry
                  break
                }
              }

              if (
                finallyEntry &&
                (type === 'break' || type === 'continue') &&
                finallyEntry.tryLoc <= arg &&
                arg <= finallyEntry.finallyLoc
              ) {
                // Ignore the finally entry if control is not jumping to a
                // location outside the try/catch block.
                finallyEntry = null
              }

              var record = finallyEntry ? finallyEntry.completion : {}
              record.type = type
              record.arg = arg

              if (finallyEntry) {
                this.method = 'next'
                this.next = finallyEntry.finallyLoc
                return ContinueSentinel
              }

              return this.complete(record)
            },

            complete: function(record, afterLoc) {
              if (record.type === 'throw') {
                throw record.arg
              }

              if (record.type === 'break' || record.type === 'continue') {
                this.next = record.arg
              } else if (record.type === 'return') {
                this.rval = this.arg = record.arg
                this.method = 'return'
                this.next = 'end'
              } else if (record.type === 'normal' && afterLoc) {
                this.next = afterLoc
              }

              return ContinueSentinel
            },

            finish: function(finallyLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i]
                if (entry.finallyLoc === finallyLoc) {
                  this.complete(entry.completion, entry.afterLoc)
                  resetTryEntry(entry)
                  return ContinueSentinel
                }
              }
            },

            catch: function(tryLoc) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i]
                if (entry.tryLoc === tryLoc) {
                  var record = entry.completion
                  if (record.type === 'throw') {
                    var thrown = record.arg
                    resetTryEntry(entry)
                  }
                  return thrown
                }
              }

              // The context.catch method must only be called with a location
              // argument that corresponds to a known catch block.
              throw new Error('illegal catch attempt')
            },

            delegateYield: function(iterable, resultName, nextLoc) {
              this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc,
              }

              if (this.method === 'next') {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                this.arg = undefined
              }

              return ContinueSentinel
            },
          }
        })(
          // In sloppy mode, unbound `this` refers to the global object, fallback to
          // Function constructor if we're in global strict mode. That is sadly a form
          // of indirect eval which violates Content Security Policy.
          (function() {
            return this || (typeof self === 'object' && self)
          })() || Function('return this')()
        )
      },
      {},
    ],
    '../node_modules/regenerator-runtime/runtime-module.js': [
      function(require, module, exports) {
        /**
         * Copyright (c) 2014-present, Facebook, Inc.
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */

        // This method of obtaining a reference to the global object needs to be
        // kept identical to the way it is obtained in runtime.js
        var g =
          (function() {
            return this || (typeof self === 'object' && self)
          })() || Function('return this')()

        // Use `getOwnPropertyNames` because not all browsers support calling
        // `hasOwnProperty` on the global `self` object in a worker. See #183.
        var hadRuntime =
          g.regeneratorRuntime &&
          Object.getOwnPropertyNames(g).indexOf('regeneratorRuntime') >= 0

        // Save the old regeneratorRuntime in case it needs to be restored later.
        var oldRuntime = hadRuntime && g.regeneratorRuntime

        // Force reevalutation of runtime.js.
        g.regeneratorRuntime = undefined

        module.exports = require('./runtime')

        if (hadRuntime) {
          // Restore the original runtime.
          g.regeneratorRuntime = oldRuntime
        } else {
          // Remove the global property added by runtime.js.
          try {
            delete g.regeneratorRuntime
          } catch (e) {
            g.regeneratorRuntime = undefined
          }
        }
      },
      {'./runtime': '../node_modules/regenerator-runtime/runtime.js'},
    ],
    '../node_modules/core-js/modules/_cof.js': [
      function(require, module, exports) {
        var toString = {}.toString

        module.exports = function(it) {
          return toString.call(it).slice(8, -1)
        }
      },
      {},
    ],
    '../node_modules/core-js/modules/_core.js': [
      function(require, module, exports) {
        var core = (module.exports = {version: '2.6.1'})
        if (typeof __e == 'number') __e = core // eslint-disable-line no-undef
      },
      {},
    ],
    '../node_modules/core-js/modules/_global.js': [
      function(require, module, exports) {
        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        var global = (module.exports =
          typeof window != 'undefined' && window.Math == Math
            ? window
            : typeof self != 'undefined' && self.Math == Math
            ? self
            : // eslint-disable-next-line no-new-func
              Function('return this')())
        if (typeof __g == 'number') __g = global // eslint-disable-line no-undef
      },
      {},
    ],
    '../node_modules/core-js/modules/_library.js': [
      function(require, module, exports) {
        module.exports = false
      },
      {},
    ],
    '../node_modules/core-js/modules/_shared.js': [
      function(require, module, exports) {
        var core = require('./_core')
        var global = require('./_global')
        var SHARED = '__core-js_shared__'
        var store = global[SHARED] || (global[SHARED] = {})

        ;(module.exports = function(key, value) {
          return store[key] || (store[key] = value !== undefined ? value : {})
        })('versions', []).push({
          version: core.version,
          mode: require('./_library') ? 'pure' : 'global',
          copyright: '© 2018 Denis Pushkarev (zloirock.ru)',
        })
      },
      {
        './_core': '../node_modules/core-js/modules/_core.js',
        './_global': '../node_modules/core-js/modules/_global.js',
        './_library': '../node_modules/core-js/modules/_library.js',
      },
    ],
    '../node_modules/core-js/modules/_uid.js': [
      function(require, module, exports) {
        var id = 0
        var px = Math.random()
        module.exports = function(key) {
          return 'Symbol('.concat(
            key === undefined ? '' : key,
            ')_',
            (++id + px).toString(36)
          )
        }
      },
      {},
    ],
    '../node_modules/core-js/modules/_wks.js': [
      function(require, module, exports) {
        var store = require('./_shared')('wks')
        var uid = require('./_uid')
        var Symbol = require('./_global').Symbol
        var USE_SYMBOL = typeof Symbol == 'function'

        var $exports = (module.exports = function(name) {
          return (
            store[name] ||
            (store[name] =
              (USE_SYMBOL && Symbol[name]) ||
              (USE_SYMBOL ? Symbol : uid)('Symbol.' + name))
          )
        })

        $exports.store = store
      },
      {
        './_shared': '../node_modules/core-js/modules/_shared.js',
        './_uid': '../node_modules/core-js/modules/_uid.js',
        './_global': '../node_modules/core-js/modules/_global.js',
      },
    ],
    '../node_modules/core-js/modules/_classof.js': [
      function(require, module, exports) {
        // getting tag from 19.1.3.6 Object.prototype.toString()
        var cof = require('./_cof')
        var TAG = require('./_wks')('toStringTag')
        // ES3 wrong here
        var ARG =
          cof(
            (function() {
              return arguments
            })()
          ) == 'Arguments'

        // fallback for IE11 Script Access Denied error
        var tryGet = function(it, key) {
          try {
            return it[key]
          } catch (e) {
            /* empty */
          }
        }

        module.exports = function(it) {
          var O, T, B
          return it === undefined
            ? 'Undefined'
            : it === null
            ? 'Null'
            : // @@toStringTag case
            typeof (T = tryGet((O = Object(it)), TAG)) == 'string'
            ? T
            : // builtinTag case
            ARG
            ? cof(O)
            : // ES3 arguments fallback
            (B = cof(O)) == 'Object' && typeof O.callee == 'function'
            ? 'Arguments'
            : B
        }
      },
      {
        './_cof': '../node_modules/core-js/modules/_cof.js',
        './_wks': '../node_modules/core-js/modules/_wks.js',
      },
    ],
    '../node_modules/core-js/modules/_is-object.js': [
      function(require, module, exports) {
        module.exports = function(it) {
          return typeof it === 'object' ? it !== null : typeof it === 'function'
        }
      },
      {},
    ],
    '../node_modules/core-js/modules/_an-object.js': [
      function(require, module, exports) {
        var isObject = require('./_is-object')
        module.exports = function(it) {
          if (!isObject(it)) throw TypeError(it + ' is not an object!')
          return it
        }
      },
      {'./_is-object': '../node_modules/core-js/modules/_is-object.js'},
    ],
    '../node_modules/core-js/modules/_fails.js': [
      function(require, module, exports) {
        module.exports = function(exec) {
          try {
            return !!exec()
          } catch (e) {
            return true
          }
        }
      },
      {},
    ],
    '../node_modules/core-js/modules/_descriptors.js': [
      function(require, module, exports) {
        // Thank's IE8 for his funny defineProperty
        module.exports = !require('./_fails')(function() {
          return (
            Object.defineProperty({}, 'a', {
              get: function() {
                return 7
              },
            }).a != 7
          )
        })
      },
      {'./_fails': '../node_modules/core-js/modules/_fails.js'},
    ],
    '../node_modules/core-js/modules/_dom-create.js': [
      function(require, module, exports) {
        var isObject = require('./_is-object')
        var document = require('./_global').document
        // typeof document.createElement is 'object' in old IE
        var is = isObject(document) && isObject(document.createElement)
        module.exports = function(it) {
          return is ? document.createElement(it) : {}
        }
      },
      {
        './_is-object': '../node_modules/core-js/modules/_is-object.js',
        './_global': '../node_modules/core-js/modules/_global.js',
      },
    ],
    '../node_modules/core-js/modules/_ie8-dom-define.js': [
      function(require, module, exports) {
        module.exports =
          !require('./_descriptors') &&
          !require('./_fails')(function() {
            return (
              Object.defineProperty(require('./_dom-create')('div'), 'a', {
                get: function() {
                  return 7
                },
              }).a != 7
            )
          })
      },
      {
        './_descriptors': '../node_modules/core-js/modules/_descriptors.js',
        './_fails': '../node_modules/core-js/modules/_fails.js',
        './_dom-create': '../node_modules/core-js/modules/_dom-create.js',
      },
    ],
    '../node_modules/core-js/modules/_to-primitive.js': [
      function(require, module, exports) {
        // 7.1.1 ToPrimitive(input [, PreferredType])
        var isObject = require('./_is-object')
        // instead of the ES6 spec version, we didn't implement @@toPrimitive case
        // and the second argument - flag - preferred type is a string
        module.exports = function(it, S) {
          if (!isObject(it)) return it
          var fn, val
          if (
            S &&
            typeof (fn = it.toString) == 'function' &&
            !isObject((val = fn.call(it)))
          )
            return val
          if (
            typeof (fn = it.valueOf) == 'function' &&
            !isObject((val = fn.call(it)))
          )
            return val
          if (
            !S &&
            typeof (fn = it.toString) == 'function' &&
            !isObject((val = fn.call(it)))
          )
            return val
          throw TypeError("Can't convert object to primitive value")
        }
      },
      {'./_is-object': '../node_modules/core-js/modules/_is-object.js'},
    ],
    '../node_modules/core-js/modules/_object-dp.js': [
      function(require, module, exports) {
        var anObject = require('./_an-object')
        var IE8_DOM_DEFINE = require('./_ie8-dom-define')
        var toPrimitive = require('./_to-primitive')
        var dP = Object.defineProperty

        exports.f = require('./_descriptors')
          ? Object.defineProperty
          : function defineProperty(O, P, Attributes) {
              anObject(O)
              P = toPrimitive(P, true)
              anObject(Attributes)
              if (IE8_DOM_DEFINE)
                try {
                  return dP(O, P, Attributes)
                } catch (e) {
                  /* empty */
                }
              if ('get' in Attributes || 'set' in Attributes)
                throw TypeError('Accessors not supported!')
              if ('value' in Attributes) O[P] = Attributes.value
              return O
            }
      },
      {
        './_an-object': '../node_modules/core-js/modules/_an-object.js',
        './_ie8-dom-define':
          '../node_modules/core-js/modules/_ie8-dom-define.js',
        './_to-primitive': '../node_modules/core-js/modules/_to-primitive.js',
        './_descriptors': '../node_modules/core-js/modules/_descriptors.js',
      },
    ],
    '../node_modules/core-js/modules/_property-desc.js': [
      function(require, module, exports) {
        module.exports = function(bitmap, value) {
          return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value: value,
          }
        }
      },
      {},
    ],
    '../node_modules/core-js/modules/_hide.js': [
      function(require, module, exports) {
        var dP = require('./_object-dp')
        var createDesc = require('./_property-desc')
        module.exports = require('./_descriptors')
          ? function(object, key, value) {
              return dP.f(object, key, createDesc(1, value))
            }
          : function(object, key, value) {
              object[key] = value
              return object
            }
      },
      {
        './_object-dp': '../node_modules/core-js/modules/_object-dp.js',
        './_property-desc': '../node_modules/core-js/modules/_property-desc.js',
        './_descriptors': '../node_modules/core-js/modules/_descriptors.js',
      },
    ],
    '../node_modules/core-js/modules/_has.js': [
      function(require, module, exports) {
        var hasOwnProperty = {}.hasOwnProperty
        module.exports = function(it, key) {
          return hasOwnProperty.call(it, key)
        }
      },
      {},
    ],
    '../node_modules/core-js/modules/_redefine.js': [
      function(require, module, exports) {
        var global = require('./_global')
        var hide = require('./_hide')
        var has = require('./_has')
        var SRC = require('./_uid')('src')
        var TO_STRING = 'toString'
        var $toString = Function[TO_STRING]
        var TPL = ('' + $toString).split(TO_STRING)

        require('./_core').inspectSource = function(it) {
          return $toString.call(it)
        }

        ;(module.exports = function(O, key, val, safe) {
          var isFunction = typeof val == 'function'
          if (isFunction) has(val, 'name') || hide(val, 'name', key)
          if (O[key] === val) return
          if (isFunction)
            has(val, SRC) ||
              hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)))
          if (O === global) {
            O[key] = val
          } else if (!safe) {
            delete O[key]
            hide(O, key, val)
          } else if (O[key]) {
            O[key] = val
          } else {
            hide(O, key, val)
          }
          // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
        })(Function.prototype, TO_STRING, function toString() {
          return (
            (typeof this == 'function' && this[SRC]) || $toString.call(this)
          )
        })
      },
      {
        './_global': '../node_modules/core-js/modules/_global.js',
        './_hide': '../node_modules/core-js/modules/_hide.js',
        './_has': '../node_modules/core-js/modules/_has.js',
        './_uid': '../node_modules/core-js/modules/_uid.js',
        './_core': '../node_modules/core-js/modules/_core.js',
      },
    ],
    '../node_modules/core-js/modules/es6.object.to-string.js': [
      function(require, module, exports) {
        'use strict'
        // 19.1.3.6 Object.prototype.toString()
        var classof = require('./_classof')
        var test = {}
        test[require('./_wks')('toStringTag')] = 'z'
        if (test + '' != '[object z]') {
          require('./_redefine')(
            Object.prototype,
            'toString',
            function toString() {
              return '[object ' + classof(this) + ']'
            },
            true
          )
        }
      },
      {
        './_classof': '../node_modules/core-js/modules/_classof.js',
        './_wks': '../node_modules/core-js/modules/_wks.js',
        './_redefine': '../node_modules/core-js/modules/_redefine.js',
      },
    ],
    '../node_modules/core-js/modules/_to-integer.js': [
      function(require, module, exports) {
        // 7.1.4 ToInteger
        var ceil = Math.ceil
        var floor = Math.floor
        module.exports = function(it) {
          return isNaN((it = +it)) ? 0 : (it > 0 ? floor : ceil)(it)
        }
      },
      {},
    ],
    '../node_modules/core-js/modules/_defined.js': [
      function(require, module, exports) {
        // 7.2.1 RequireObjectCoercible(argument)
        module.exports = function(it) {
          if (it == undefined) throw TypeError("Can't call method on  " + it)
          return it
        }
      },
      {},
    ],
    '../node_modules/core-js/modules/_string-at.js': [
      function(require, module, exports) {
        var toInteger = require('./_to-integer')
        var defined = require('./_defined')
        // true  -> String#at
        // false -> String#codePointAt
        module.exports = function(TO_STRING) {
          return function(that, pos) {
            var s = String(defined(that))
            var i = toInteger(pos)
            var l = s.length
            var a, b
            if (i < 0 || i >= l) return TO_STRING ? '' : undefined
            a = s.charCodeAt(i)
            return a < 0xd800 ||
              a > 0xdbff ||
              i + 1 === l ||
              (b = s.charCodeAt(i + 1)) < 0xdc00 ||
              b > 0xdfff
              ? TO_STRING
                ? s.charAt(i)
                : a
              : TO_STRING
              ? s.slice(i, i + 2)
              : ((a - 0xd800) << 10) + (b - 0xdc00) + 0x10000
          }
        }
      },
      {
        './_to-integer': '../node_modules/core-js/modules/_to-integer.js',
        './_defined': '../node_modules/core-js/modules/_defined.js',
      },
    ],
    '../node_modules/core-js/modules/_a-function.js': [
      function(require, module, exports) {
        module.exports = function(it) {
          if (typeof it != 'function')
            throw TypeError(it + ' is not a function!')
          return it
        }
      },
      {},
    ],
    '../node_modules/core-js/modules/_ctx.js': [
      function(require, module, exports) {
        // optional / simple context binding
        var aFunction = require('./_a-function')
        module.exports = function(fn, that, length) {
          aFunction(fn)
          if (that === undefined) return fn
          switch (length) {
            case 1:
              return function(a) {
                return fn.call(that, a)
              }
            case 2:
              return function(a, b) {
                return fn.call(that, a, b)
              }
            case 3:
              return function(a, b, c) {
                return fn.call(that, a, b, c)
              }
          }
          return function(/* ...args */) {
            return fn.apply(that, arguments)
          }
        }
      },
      {'./_a-function': '../node_modules/core-js/modules/_a-function.js'},
    ],
    '../node_modules/core-js/modules/_export.js': [
      function(require, module, exports) {
        var global = require('./_global')
        var core = require('./_core')
        var hide = require('./_hide')
        var redefine = require('./_redefine')
        var ctx = require('./_ctx')
        var PROTOTYPE = 'prototype'

        var $export = function(type, name, source) {
          var IS_FORCED = type & $export.F
          var IS_GLOBAL = type & $export.G
          var IS_STATIC = type & $export.S
          var IS_PROTO = type & $export.P
          var IS_BIND = type & $export.B
          var target = IS_GLOBAL
            ? global
            : IS_STATIC
            ? global[name] || (global[name] = {})
            : (global[name] || {})[PROTOTYPE]
          var exports = IS_GLOBAL ? core : core[name] || (core[name] = {})
          var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
          var key, own, out, exp
          if (IS_GLOBAL) source = name
          for (key in source) {
            // contains in native
            own = !IS_FORCED && target && target[key] !== undefined
            // export native or passed
            out = (own ? target : source)[key]
            // bind timers to global for call from export context
            exp =
              IS_BIND && own
                ? ctx(out, global)
                : IS_PROTO && typeof out == 'function'
                ? ctx(Function.call, out)
                : out
            // extend global
            if (target) redefine(target, key, out, type & $export.U)
            // export
            if (exports[key] != out) hide(exports, key, exp)
            if (IS_PROTO && expProto[key] != out) expProto[key] = out
          }
        }
        global.core = core
        // type bitmap
        $export.F = 1 // forced
        $export.G = 2 // global
        $export.S = 4 // static
        $export.P = 8 // proto
        $export.B = 16 // bind
        $export.W = 32 // wrap
        $export.U = 64 // safe
        $export.R = 128 // real proto method for `library`
        module.exports = $export
      },
      {
        './_global': '../node_modules/core-js/modules/_global.js',
        './_core': '../node_modules/core-js/modules/_core.js',
        './_hide': '../node_modules/core-js/modules/_hide.js',
        './_redefine': '../node_modules/core-js/modules/_redefine.js',
        './_ctx': '../node_modules/core-js/modules/_ctx.js',
      },
    ],
    '../node_modules/core-js/modules/_iterators.js': [
      function(require, module, exports) {
        module.exports = {}
      },
      {},
    ],
    '../node_modules/core-js/modules/_iobject.js': [
      function(require, module, exports) {
        // fallback for non-array-like ES3 and non-enumerable old V8 strings
        var cof = require('./_cof')
        // eslint-disable-next-line no-prototype-builtins
        module.exports = Object('z').propertyIsEnumerable(0)
          ? Object
          : function(it) {
              return cof(it) == 'String' ? it.split('') : Object(it)
            }
      },
      {'./_cof': '../node_modules/core-js/modules/_cof.js'},
    ],
    '../node_modules/core-js/modules/_to-iobject.js': [
      function(require, module, exports) {
        // to indexed object, toObject with fallback for non-array-like ES3 strings
        var IObject = require('./_iobject')
        var defined = require('./_defined')
        module.exports = function(it) {
          return IObject(defined(it))
        }
      },
      {
        './_iobject': '../node_modules/core-js/modules/_iobject.js',
        './_defined': '../node_modules/core-js/modules/_defined.js',
      },
    ],
    '../node_modules/core-js/modules/_to-length.js': [
      function(require, module, exports) {
        // 7.1.15 ToLength
        var toInteger = require('./_to-integer')
        var min = Math.min
        module.exports = function(it) {
          return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0 // pow(2, 53) - 1 == 9007199254740991
        }
      },
      {'./_to-integer': '../node_modules/core-js/modules/_to-integer.js'},
    ],
    '../node_modules/core-js/modules/_to-absolute-index.js': [
      function(require, module, exports) {
        var toInteger = require('./_to-integer')
        var max = Math.max
        var min = Math.min
        module.exports = function(index, length) {
          index = toInteger(index)
          return index < 0 ? max(index + length, 0) : min(index, length)
        }
      },
      {'./_to-integer': '../node_modules/core-js/modules/_to-integer.js'},
    ],
    '../node_modules/core-js/modules/_array-includes.js': [
      function(require, module, exports) {
        // false -> Array#indexOf
        // true  -> Array#includes
        var toIObject = require('./_to-iobject')
        var toLength = require('./_to-length')
        var toAbsoluteIndex = require('./_to-absolute-index')
        module.exports = function(IS_INCLUDES) {
          return function($this, el, fromIndex) {
            var O = toIObject($this)
            var length = toLength(O.length)
            var index = toAbsoluteIndex(fromIndex, length)
            var value
            // Array#includes uses SameValueZero equality algorithm
            // eslint-disable-next-line no-self-compare
            if (IS_INCLUDES && el != el)
              while (length > index) {
                value = O[index++]
                // eslint-disable-next-line no-self-compare
                if (value != value) return true
                // Array#indexOf ignores holes, Array#includes - not
              }
            else
              for (; length > index; index++)
                if (IS_INCLUDES || index in O) {
                  if (O[index] === el) return IS_INCLUDES || index || 0
                }
            return !IS_INCLUDES && -1
          }
        }
      },
      {
        './_to-iobject': '../node_modules/core-js/modules/_to-iobject.js',
        './_to-length': '../node_modules/core-js/modules/_to-length.js',
        './_to-absolute-index':
          '../node_modules/core-js/modules/_to-absolute-index.js',
      },
    ],
    '../node_modules/core-js/modules/_shared-key.js': [
      function(require, module, exports) {
        var shared = require('./_shared')('keys')
        var uid = require('./_uid')
        module.exports = function(key) {
          return shared[key] || (shared[key] = uid(key))
        }
      },
      {
        './_shared': '../node_modules/core-js/modules/_shared.js',
        './_uid': '../node_modules/core-js/modules/_uid.js',
      },
    ],
    '../node_modules/core-js/modules/_object-keys-internal.js': [
      function(require, module, exports) {
        var has = require('./_has')
        var toIObject = require('./_to-iobject')
        var arrayIndexOf = require('./_array-includes')(false)
        var IE_PROTO = require('./_shared-key')('IE_PROTO')

        module.exports = function(object, names) {
          var O = toIObject(object)
          var i = 0
          var result = []
          var key
          for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key)
          // Don't enum bug & hidden keys
          while (names.length > i)
            if (has(O, (key = names[i++]))) {
              ~arrayIndexOf(result, key) || result.push(key)
            }
          return result
        }
      },
      {
        './_has': '../node_modules/core-js/modules/_has.js',
        './_to-iobject': '../node_modules/core-js/modules/_to-iobject.js',
        './_array-includes':
          '../node_modules/core-js/modules/_array-includes.js',
        './_shared-key': '../node_modules/core-js/modules/_shared-key.js',
      },
    ],
    '../node_modules/core-js/modules/_enum-bug-keys.js': [
      function(require, module, exports) {
        // IE 8- don't enum bug keys
        module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
          ','
        )
      },
      {},
    ],
    '../node_modules/core-js/modules/_object-keys.js': [
      function(require, module, exports) {
        // 19.1.2.14 / 15.2.3.14 Object.keys(O)
        var $keys = require('./_object-keys-internal')
        var enumBugKeys = require('./_enum-bug-keys')

        module.exports =
          Object.keys ||
          function keys(O) {
            return $keys(O, enumBugKeys)
          }
      },
      {
        './_object-keys-internal':
          '../node_modules/core-js/modules/_object-keys-internal.js',
        './_enum-bug-keys': '../node_modules/core-js/modules/_enum-bug-keys.js',
      },
    ],
    '../node_modules/core-js/modules/_object-dps.js': [
      function(require, module, exports) {
        var dP = require('./_object-dp')
        var anObject = require('./_an-object')
        var getKeys = require('./_object-keys')

        module.exports = require('./_descriptors')
          ? Object.defineProperties
          : function defineProperties(O, Properties) {
              anObject(O)
              var keys = getKeys(Properties)
              var length = keys.length
              var i = 0
              var P
              while (length > i) dP.f(O, (P = keys[i++]), Properties[P])
              return O
            }
      },
      {
        './_object-dp': '../node_modules/core-js/modules/_object-dp.js',
        './_an-object': '../node_modules/core-js/modules/_an-object.js',
        './_object-keys': '../node_modules/core-js/modules/_object-keys.js',
        './_descriptors': '../node_modules/core-js/modules/_descriptors.js',
      },
    ],
    '../node_modules/core-js/modules/_html.js': [
      function(require, module, exports) {
        var document = require('./_global').document
        module.exports = document && document.documentElement
      },
      {'./_global': '../node_modules/core-js/modules/_global.js'},
    ],
    '../node_modules/core-js/modules/_object-create.js': [
      function(require, module, exports) {
        // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
        var anObject = require('./_an-object')
        var dPs = require('./_object-dps')
        var enumBugKeys = require('./_enum-bug-keys')
        var IE_PROTO = require('./_shared-key')('IE_PROTO')
        var Empty = function() {
          /* empty */
        }
        var PROTOTYPE = 'prototype'

        // Create object with fake `null` prototype: use iframe Object with cleared prototype
        var createDict = function() {
          // Thrash, waste and sodomy: IE GC bug
          var iframe = require('./_dom-create')('iframe')
          var i = enumBugKeys.length
          var lt = '<'
          var gt = '>'
          var iframeDocument
          iframe.style.display = 'none'
          require('./_html').appendChild(iframe)
          iframe.src = 'javascript:' // eslint-disable-line no-script-url
          // createDict = iframe.contentWindow.Object;
          // html.removeChild(iframe);
          iframeDocument = iframe.contentWindow.document
          iframeDocument.open()
          iframeDocument.write(
            lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt
          )
          iframeDocument.close()
          createDict = iframeDocument.F
          while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]]
          return createDict()
        }

        module.exports =
          Object.create ||
          function create(O, Properties) {
            var result
            if (O !== null) {
              Empty[PROTOTYPE] = anObject(O)
              result = new Empty()
              Empty[PROTOTYPE] = null
              // add "__proto__" for Object.getPrototypeOf polyfill
              result[IE_PROTO] = O
            } else result = createDict()
            return Properties === undefined ? result : dPs(result, Properties)
          }
      },
      {
        './_an-object': '../node_modules/core-js/modules/_an-object.js',
        './_object-dps': '../node_modules/core-js/modules/_object-dps.js',
        './_enum-bug-keys': '../node_modules/core-js/modules/_enum-bug-keys.js',
        './_shared-key': '../node_modules/core-js/modules/_shared-key.js',
        './_dom-create': '../node_modules/core-js/modules/_dom-create.js',
        './_html': '../node_modules/core-js/modules/_html.js',
      },
    ],
    '../node_modules/core-js/modules/_set-to-string-tag.js': [
      function(require, module, exports) {
        var def = require('./_object-dp').f
        var has = require('./_has')
        var TAG = require('./_wks')('toStringTag')

        module.exports = function(it, tag, stat) {
          if (it && !has((it = stat ? it : it.prototype), TAG))
            def(it, TAG, {configurable: true, value: tag})
        }
      },
      {
        './_object-dp': '../node_modules/core-js/modules/_object-dp.js',
        './_has': '../node_modules/core-js/modules/_has.js',
        './_wks': '../node_modules/core-js/modules/_wks.js',
      },
    ],
    '../node_modules/core-js/modules/_iter-create.js': [
      function(require, module, exports) {
        'use strict'
        var create = require('./_object-create')
        var descriptor = require('./_property-desc')
        var setToStringTag = require('./_set-to-string-tag')
        var IteratorPrototype = {}

        // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
        require('./_hide')(
          IteratorPrototype,
          require('./_wks')('iterator'),
          function() {
            return this
          }
        )

        module.exports = function(Constructor, NAME, next) {
          Constructor.prototype = create(IteratorPrototype, {
            next: descriptor(1, next),
          })
          setToStringTag(Constructor, NAME + ' Iterator')
        }
      },
      {
        './_object-create': '../node_modules/core-js/modules/_object-create.js',
        './_property-desc': '../node_modules/core-js/modules/_property-desc.js',
        './_set-to-string-tag':
          '../node_modules/core-js/modules/_set-to-string-tag.js',
        './_hide': '../node_modules/core-js/modules/_hide.js',
        './_wks': '../node_modules/core-js/modules/_wks.js',
      },
    ],
    '../node_modules/core-js/modules/_to-object.js': [
      function(require, module, exports) {
        // 7.1.13 ToObject(argument)
        var defined = require('./_defined')
        module.exports = function(it) {
          return Object(defined(it))
        }
      },
      {'./_defined': '../node_modules/core-js/modules/_defined.js'},
    ],
    '../node_modules/core-js/modules/_object-gpo.js': [
      function(require, module, exports) {
        // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
        var has = require('./_has')
        var toObject = require('./_to-object')
        var IE_PROTO = require('./_shared-key')('IE_PROTO')
        var ObjectProto = Object.prototype

        module.exports =
          Object.getPrototypeOf ||
          function(O) {
            O = toObject(O)
            if (has(O, IE_PROTO)) return O[IE_PROTO]
            if (
              typeof O.constructor == 'function' &&
              O instanceof O.constructor
            ) {
              return O.constructor.prototype
            }
            return O instanceof Object ? ObjectProto : null
          }
      },
      {
        './_has': '../node_modules/core-js/modules/_has.js',
        './_to-object': '../node_modules/core-js/modules/_to-object.js',
        './_shared-key': '../node_modules/core-js/modules/_shared-key.js',
      },
    ],
    '../node_modules/core-js/modules/_iter-define.js': [
      function(require, module, exports) {
        'use strict'
        var LIBRARY = require('./_library')
        var $export = require('./_export')
        var redefine = require('./_redefine')
        var hide = require('./_hide')
        var Iterators = require('./_iterators')
        var $iterCreate = require('./_iter-create')
        var setToStringTag = require('./_set-to-string-tag')
        var getPrototypeOf = require('./_object-gpo')
        var ITERATOR = require('./_wks')('iterator')
        var BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
        var FF_ITERATOR = '@@iterator'
        var KEYS = 'keys'
        var VALUES = 'values'

        var returnThis = function() {
          return this
        }

        module.exports = function(
          Base,
          NAME,
          Constructor,
          next,
          DEFAULT,
          IS_SET,
          FORCED
        ) {
          $iterCreate(Constructor, NAME, next)
          var getMethod = function(kind) {
            if (!BUGGY && kind in proto) return proto[kind]
            switch (kind) {
              case KEYS:
                return function keys() {
                  return new Constructor(this, kind)
                }
              case VALUES:
                return function values() {
                  return new Constructor(this, kind)
                }
            }
            return function entries() {
              return new Constructor(this, kind)
            }
          }
          var TAG = NAME + ' Iterator'
          var DEF_VALUES = DEFAULT == VALUES
          var VALUES_BUG = false
          var proto = Base.prototype
          var $native =
            proto[ITERATOR] || proto[FF_ITERATOR] || (DEFAULT && proto[DEFAULT])
          var $default = $native || getMethod(DEFAULT)
          var $entries = DEFAULT
            ? !DEF_VALUES
              ? $default
              : getMethod('entries')
            : undefined
          var $anyNative = NAME == 'Array' ? proto.entries || $native : $native
          var methods, key, IteratorPrototype
          // Fix native
          if ($anyNative) {
            IteratorPrototype = getPrototypeOf($anyNative.call(new Base()))
            if (
              IteratorPrototype !== Object.prototype &&
              IteratorPrototype.next
            ) {
              // Set @@toStringTag to native iterators
              setToStringTag(IteratorPrototype, TAG, true)
              // fix for some old engines
              if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function')
                hide(IteratorPrototype, ITERATOR, returnThis)
            }
          }
          // fix Array#{values, @@iterator}.name in V8 / FF
          if (DEF_VALUES && $native && $native.name !== VALUES) {
            VALUES_BUG = true
            $default = function values() {
              return $native.call(this)
            }
          }
          // Define iterator
          if (
            (!LIBRARY || FORCED) &&
            (BUGGY || VALUES_BUG || !proto[ITERATOR])
          ) {
            hide(proto, ITERATOR, $default)
          }
          // Plug for library
          Iterators[NAME] = $default
          Iterators[TAG] = returnThis
          if (DEFAULT) {
            methods = {
              values: DEF_VALUES ? $default : getMethod(VALUES),
              keys: IS_SET ? $default : getMethod(KEYS),
              entries: $entries,
            }
            if (FORCED)
              for (key in methods) {
                if (!(key in proto)) redefine(proto, key, methods[key])
              }
            else
              $export(
                $export.P + $export.F * (BUGGY || VALUES_BUG),
                NAME,
                methods
              )
          }
          return methods
        }
      },
      {
        './_library': '../node_modules/core-js/modules/_library.js',
        './_export': '../node_modules/core-js/modules/_export.js',
        './_redefine': '../node_modules/core-js/modules/_redefine.js',
        './_hide': '../node_modules/core-js/modules/_hide.js',
        './_iterators': '../node_modules/core-js/modules/_iterators.js',
        './_iter-create': '../node_modules/core-js/modules/_iter-create.js',
        './_set-to-string-tag':
          '../node_modules/core-js/modules/_set-to-string-tag.js',
        './_object-gpo': '../node_modules/core-js/modules/_object-gpo.js',
        './_wks': '../node_modules/core-js/modules/_wks.js',
      },
    ],
    '../node_modules/core-js/modules/es6.string.iterator.js': [
      function(require, module, exports) {
        'use strict'
        var $at = require('./_string-at')(true)

        // 21.1.3.27 String.prototype[@@iterator]()
        require('./_iter-define')(
          String,
          'String',
          function(iterated) {
            this._t = String(iterated) // target
            this._i = 0 // next index
            // 21.1.5.2.1 %StringIteratorPrototype%.next()
          },
          function() {
            var O = this._t
            var index = this._i
            var point
            if (index >= O.length) return {value: undefined, done: true}
            point = $at(O, index)
            this._i += point.length
            return {value: point, done: false}
          }
        )
      },
      {
        './_string-at': '../node_modules/core-js/modules/_string-at.js',
        './_iter-define': '../node_modules/core-js/modules/_iter-define.js',
      },
    ],
    '../node_modules/core-js/modules/_add-to-unscopables.js': [
      function(require, module, exports) {
        // 22.1.3.31 Array.prototype[@@unscopables]
        var UNSCOPABLES = require('./_wks')('unscopables')
        var ArrayProto = Array.prototype
        if (ArrayProto[UNSCOPABLES] == undefined)
          require('./_hide')(ArrayProto, UNSCOPABLES, {})
        module.exports = function(key) {
          ArrayProto[UNSCOPABLES][key] = true
        }
      },
      {
        './_wks': '../node_modules/core-js/modules/_wks.js',
        './_hide': '../node_modules/core-js/modules/_hide.js',
      },
    ],
    '../node_modules/core-js/modules/_iter-step.js': [
      function(require, module, exports) {
        module.exports = function(done, value) {
          return {value: value, done: !!done}
        }
      },
      {},
    ],
    '../node_modules/core-js/modules/es6.array.iterator.js': [
      function(require, module, exports) {
        'use strict'
        var addToUnscopables = require('./_add-to-unscopables')
        var step = require('./_iter-step')
        var Iterators = require('./_iterators')
        var toIObject = require('./_to-iobject')

        // 22.1.3.4 Array.prototype.entries()
        // 22.1.3.13 Array.prototype.keys()
        // 22.1.3.29 Array.prototype.values()
        // 22.1.3.30 Array.prototype[@@iterator]()
        module.exports = require('./_iter-define')(
          Array,
          'Array',
          function(iterated, kind) {
            this._t = toIObject(iterated) // target
            this._i = 0 // next index
            this._k = kind // kind
            // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
          },
          function() {
            var O = this._t
            var kind = this._k
            var index = this._i++
            if (!O || index >= O.length) {
              this._t = undefined
              return step(1)
            }
            if (kind == 'keys') return step(0, index)
            if (kind == 'values') return step(0, O[index])
            return step(0, [index, O[index]])
          },
          'values'
        )

        // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
        Iterators.Arguments = Iterators.Array

        addToUnscopables('keys')
        addToUnscopables('values')
        addToUnscopables('entries')
      },
      {
        './_add-to-unscopables':
          '../node_modules/core-js/modules/_add-to-unscopables.js',
        './_iter-step': '../node_modules/core-js/modules/_iter-step.js',
        './_iterators': '../node_modules/core-js/modules/_iterators.js',
        './_to-iobject': '../node_modules/core-js/modules/_to-iobject.js',
        './_iter-define': '../node_modules/core-js/modules/_iter-define.js',
      },
    ],
    '../node_modules/core-js/modules/web.dom.iterable.js': [
      function(require, module, exports) {
        var $iterators = require('./es6.array.iterator')
        var getKeys = require('./_object-keys')
        var redefine = require('./_redefine')
        var global = require('./_global')
        var hide = require('./_hide')
        var Iterators = require('./_iterators')
        var wks = require('./_wks')
        var ITERATOR = wks('iterator')
        var TO_STRING_TAG = wks('toStringTag')
        var ArrayValues = Iterators.Array

        var DOMIterables = {
          CSSRuleList: true, // TODO: Not spec compliant, should be false.
          CSSStyleDeclaration: false,
          CSSValueList: false,
          ClientRectList: false,
          DOMRectList: false,
          DOMStringList: false,
          DOMTokenList: true,
          DataTransferItemList: false,
          FileList: false,
          HTMLAllCollection: false,
          HTMLCollection: false,
          HTMLFormElement: false,
          HTMLSelectElement: false,
          MediaList: true, // TODO: Not spec compliant, should be false.
          MimeTypeArray: false,
          NamedNodeMap: false,
          NodeList: true,
          PaintRequestList: false,
          Plugin: false,
          PluginArray: false,
          SVGLengthList: false,
          SVGNumberList: false,
          SVGPathSegList: false,
          SVGPointList: false,
          SVGStringList: false,
          SVGTransformList: false,
          SourceBufferList: false,
          StyleSheetList: true, // TODO: Not spec compliant, should be false.
          TextTrackCueList: false,
          TextTrackList: false,
          TouchList: false,
        }

        for (
          var collections = getKeys(DOMIterables), i = 0;
          i < collections.length;
          i++
        ) {
          var NAME = collections[i]
          var explicit = DOMIterables[NAME]
          var Collection = global[NAME]
          var proto = Collection && Collection.prototype
          var key
          if (proto) {
            if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues)
            if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME)
            Iterators[NAME] = ArrayValues
            if (explicit)
              for (key in $iterators)
                if (!proto[key]) redefine(proto, key, $iterators[key], true)
          }
        }
      },
      {
        './es6.array.iterator':
          '../node_modules/core-js/modules/es6.array.iterator.js',
        './_object-keys': '../node_modules/core-js/modules/_object-keys.js',
        './_redefine': '../node_modules/core-js/modules/_redefine.js',
        './_global': '../node_modules/core-js/modules/_global.js',
        './_hide': '../node_modules/core-js/modules/_hide.js',
        './_iterators': '../node_modules/core-js/modules/_iterators.js',
        './_wks': '../node_modules/core-js/modules/_wks.js',
      },
    ],
    '../node_modules/core-js/modules/_an-instance.js': [
      function(require, module, exports) {
        module.exports = function(it, Constructor, name, forbiddenField) {
          if (
            !(it instanceof Constructor) ||
            (forbiddenField !== undefined && forbiddenField in it)
          ) {
            throw TypeError(name + ': incorrect invocation!')
          }
          return it
        }
      },
      {},
    ],
    '../node_modules/core-js/modules/_iter-call.js': [
      function(require, module, exports) {
        // call something on iterator step with safe closing on error
        var anObject = require('./_an-object')
        module.exports = function(iterator, fn, value, entries) {
          try {
            return entries ? fn(anObject(value)[0], value[1]) : fn(value)
            // 7.4.6 IteratorClose(iterator, completion)
          } catch (e) {
            var ret = iterator['return']
            if (ret !== undefined) anObject(ret.call(iterator))
            throw e
          }
        }
      },
      {'./_an-object': '../node_modules/core-js/modules/_an-object.js'},
    ],
    '../node_modules/core-js/modules/_is-array-iter.js': [
      function(require, module, exports) {
        // check on default Array iterator
        var Iterators = require('./_iterators')
        var ITERATOR = require('./_wks')('iterator')
        var ArrayProto = Array.prototype

        module.exports = function(it) {
          return (
            it !== undefined &&
            (Iterators.Array === it || ArrayProto[ITERATOR] === it)
          )
        }
      },
      {
        './_iterators': '../node_modules/core-js/modules/_iterators.js',
        './_wks': '../node_modules/core-js/modules/_wks.js',
      },
    ],
    '../node_modules/core-js/modules/core.get-iterator-method.js': [
      function(require, module, exports) {
        var classof = require('./_classof')
        var ITERATOR = require('./_wks')('iterator')
        var Iterators = require('./_iterators')
        module.exports = require('./_core').getIteratorMethod = function(it) {
          if (it != undefined)
            return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)]
        }
      },
      {
        './_classof': '../node_modules/core-js/modules/_classof.js',
        './_wks': '../node_modules/core-js/modules/_wks.js',
        './_iterators': '../node_modules/core-js/modules/_iterators.js',
        './_core': '../node_modules/core-js/modules/_core.js',
      },
    ],
    '../node_modules/core-js/modules/_for-of.js': [
      function(require, module, exports) {
        var ctx = require('./_ctx')
        var call = require('./_iter-call')
        var isArrayIter = require('./_is-array-iter')
        var anObject = require('./_an-object')
        var toLength = require('./_to-length')
        var getIterFn = require('./core.get-iterator-method')
        var BREAK = {}
        var RETURN = {}
        var exports = (module.exports = function(
          iterable,
          entries,
          fn,
          that,
          ITERATOR
        ) {
          var iterFn = ITERATOR
            ? function() {
                return iterable
              }
            : getIterFn(iterable)
          var f = ctx(fn, that, entries ? 2 : 1)
          var index = 0
          var length, step, iterator, result
          if (typeof iterFn != 'function')
            throw TypeError(iterable + ' is not iterable!')
          // fast case for arrays with default iterator
          if (isArrayIter(iterFn))
            for (length = toLength(iterable.length); length > index; index++) {
              result = entries
                ? f(anObject((step = iterable[index]))[0], step[1])
                : f(iterable[index])
              if (result === BREAK || result === RETURN) return result
            }
          else
            for (
              iterator = iterFn.call(iterable);
              !(step = iterator.next()).done;

            ) {
              result = call(iterator, f, step.value, entries)
              if (result === BREAK || result === RETURN) return result
            }
        })
        exports.BREAK = BREAK
        exports.RETURN = RETURN
      },
      {
        './_ctx': '../node_modules/core-js/modules/_ctx.js',
        './_iter-call': '../node_modules/core-js/modules/_iter-call.js',
        './_is-array-iter': '../node_modules/core-js/modules/_is-array-iter.js',
        './_an-object': '../node_modules/core-js/modules/_an-object.js',
        './_to-length': '../node_modules/core-js/modules/_to-length.js',
        './core.get-iterator-method':
          '../node_modules/core-js/modules/core.get-iterator-method.js',
      },
    ],
    '../node_modules/core-js/modules/_species-constructor.js': [
      function(require, module, exports) {
        // 7.3.20 SpeciesConstructor(O, defaultConstructor)
        var anObject = require('./_an-object')
        var aFunction = require('./_a-function')
        var SPECIES = require('./_wks')('species')
        module.exports = function(O, D) {
          var C = anObject(O).constructor
          var S
          return C === undefined || (S = anObject(C)[SPECIES]) == undefined
            ? D
            : aFunction(S)
        }
      },
      {
        './_an-object': '../node_modules/core-js/modules/_an-object.js',
        './_a-function': '../node_modules/core-js/modules/_a-function.js',
        './_wks': '../node_modules/core-js/modules/_wks.js',
      },
    ],
    '../node_modules/core-js/modules/_invoke.js': [
      function(require, module, exports) {
        // fast apply, http://jsperf.lnkit.com/fast-apply/5
        module.exports = function(fn, args, that) {
          var un = that === undefined
          switch (args.length) {
            case 0:
              return un ? fn() : fn.call(that)
            case 1:
              return un ? fn(args[0]) : fn.call(that, args[0])
            case 2:
              return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1])
            case 3:
              return un
                ? fn(args[0], args[1], args[2])
                : fn.call(that, args[0], args[1], args[2])
            case 4:
              return un
                ? fn(args[0], args[1], args[2], args[3])
                : fn.call(that, args[0], args[1], args[2], args[3])
          }
          return fn.apply(that, args)
        }
      },
      {},
    ],
    '../node_modules/core-js/modules/_task.js': [
      function(require, module, exports) {
        var ctx = require('./_ctx')
        var invoke = require('./_invoke')
        var html = require('./_html')
        var cel = require('./_dom-create')
        var global = require('./_global')
        var process = global.process
        var setTask = global.setImmediate
        var clearTask = global.clearImmediate
        var MessageChannel = global.MessageChannel
        var Dispatch = global.Dispatch
        var counter = 0
        var queue = {}
        var ONREADYSTATECHANGE = 'onreadystatechange'
        var defer, channel, port
        var run = function() {
          var id = +this
          // eslint-disable-next-line no-prototype-builtins
          if (queue.hasOwnProperty(id)) {
            var fn = queue[id]
            delete queue[id]
            fn()
          }
        }
        var listener = function(event) {
          run.call(event.data)
        }
        // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
        if (!setTask || !clearTask) {
          setTask = function setImmediate(fn) {
            var args = []
            var i = 1
            while (arguments.length > i) args.push(arguments[i++])
            queue[++counter] = function() {
              // eslint-disable-next-line no-new-func
              invoke(typeof fn == 'function' ? fn : Function(fn), args)
            }
            defer(counter)
            return counter
          }
          clearTask = function clearImmediate(id) {
            delete queue[id]
          }
          // Node.js 0.8-
          if (require('./_cof')(process) == 'process') {
            defer = function(id) {
              process.nextTick(ctx(run, id, 1))
            }
            // Sphere (JS game engine) Dispatch API
          } else if (Dispatch && Dispatch.now) {
            defer = function(id) {
              Dispatch.now(ctx(run, id, 1))
            }
            // Browsers with MessageChannel, includes WebWorkers
          } else if (MessageChannel) {
            channel = new MessageChannel()
            port = channel.port2
            channel.port1.onmessage = listener
            defer = ctx(port.postMessage, port, 1)
            // Browsers with postMessage, skip WebWorkers
            // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
          } else if (
            global.addEventListener &&
            typeof postMessage == 'function' &&
            !global.importScripts
          ) {
            defer = function(id) {
              global.postMessage(id + '', '*')
            }
            global.addEventListener('message', listener, false)
            // IE8-
          } else if (ONREADYSTATECHANGE in cel('script')) {
            defer = function(id) {
              html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function() {
                html.removeChild(this)
                run.call(id)
              }
            }
            // Rest old browsers
          } else {
            defer = function(id) {
              setTimeout(ctx(run, id, 1), 0)
            }
          }
        }
        module.exports = {
          set: setTask,
          clear: clearTask,
        }
      },
      {
        './_ctx': '../node_modules/core-js/modules/_ctx.js',
        './_invoke': '../node_modules/core-js/modules/_invoke.js',
        './_html': '../node_modules/core-js/modules/_html.js',
        './_dom-create': '../node_modules/core-js/modules/_dom-create.js',
        './_global': '../node_modules/core-js/modules/_global.js',
        './_cof': '../node_modules/core-js/modules/_cof.js',
      },
    ],
    '../node_modules/core-js/modules/_microtask.js': [
      function(require, module, exports) {
        var global = require('./_global')
        var macrotask = require('./_task').set
        var Observer = global.MutationObserver || global.WebKitMutationObserver
        var process = global.process
        var Promise = global.Promise
        var isNode = require('./_cof')(process) == 'process'

        module.exports = function() {
          var head, last, notify

          var flush = function() {
            var parent, fn
            if (isNode && (parent = process.domain)) parent.exit()
            while (head) {
              fn = head.fn
              head = head.next
              try {
                fn()
              } catch (e) {
                if (head) notify()
                else last = undefined
                throw e
              }
            }
            last = undefined
            if (parent) parent.enter()
          }

          // Node.js
          if (isNode) {
            notify = function() {
              process.nextTick(flush)
            }
            // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
          } else if (
            Observer &&
            !(global.navigator && global.navigator.standalone)
          ) {
            var toggle = true
            var node = document.createTextNode('')
            new Observer(flush).observe(node, {characterData: true}) // eslint-disable-line no-new
            notify = function() {
              node.data = toggle = !toggle
            }
            // environments with maybe non-completely correct, but existent Promise
          } else if (Promise && Promise.resolve) {
            // Promise.resolve without an argument throws an error in LG WebOS 2
            var promise = Promise.resolve(undefined)
            notify = function() {
              promise.then(flush)
            }
            // for other environments - macrotask based on:
            // - setImmediate
            // - MessageChannel
            // - window.postMessag
            // - onreadystatechange
            // - setTimeout
          } else {
            notify = function() {
              // strange IE + webpack dev server bug - use .call(global)
              macrotask.call(global, flush)
            }
          }

          return function(fn) {
            var task = {fn: fn, next: undefined}
            if (last) last.next = task
            if (!head) {
              head = task
              notify()
            }
            last = task
          }
        }
      },
      {
        './_global': '../node_modules/core-js/modules/_global.js',
        './_task': '../node_modules/core-js/modules/_task.js',
        './_cof': '../node_modules/core-js/modules/_cof.js',
      },
    ],
    '../node_modules/core-js/modules/_new-promise-capability.js': [
      function(require, module, exports) {
        'use strict'
        // 25.4.1.5 NewPromiseCapability(C)
        var aFunction = require('./_a-function')

        function PromiseCapability(C) {
          var resolve, reject
          this.promise = new C(function($$resolve, $$reject) {
            if (resolve !== undefined || reject !== undefined)
              throw TypeError('Bad Promise constructor')
            resolve = $$resolve
            reject = $$reject
          })
          this.resolve = aFunction(resolve)
          this.reject = aFunction(reject)
        }

        module.exports.f = function(C) {
          return new PromiseCapability(C)
        }
      },
      {'./_a-function': '../node_modules/core-js/modules/_a-function.js'},
    ],
    '../node_modules/core-js/modules/_perform.js': [
      function(require, module, exports) {
        module.exports = function(exec) {
          try {
            return {e: false, v: exec()}
          } catch (e) {
            return {e: true, v: e}
          }
        }
      },
      {},
    ],
    '../node_modules/core-js/modules/_user-agent.js': [
      function(require, module, exports) {
        var global = require('./_global')
        var navigator = global.navigator

        module.exports = (navigator && navigator.userAgent) || ''
      },
      {'./_global': '../node_modules/core-js/modules/_global.js'},
    ],
    '../node_modules/core-js/modules/_promise-resolve.js': [
      function(require, module, exports) {
        var anObject = require('./_an-object')
        var isObject = require('./_is-object')
        var newPromiseCapability = require('./_new-promise-capability')

        module.exports = function(C, x) {
          anObject(C)
          if (isObject(x) && x.constructor === C) return x
          var promiseCapability = newPromiseCapability.f(C)
          var resolve = promiseCapability.resolve
          resolve(x)
          return promiseCapability.promise
        }
      },
      {
        './_an-object': '../node_modules/core-js/modules/_an-object.js',
        './_is-object': '../node_modules/core-js/modules/_is-object.js',
        './_new-promise-capability':
          '../node_modules/core-js/modules/_new-promise-capability.js',
      },
    ],
    '../node_modules/core-js/modules/_redefine-all.js': [
      function(require, module, exports) {
        var redefine = require('./_redefine')
        module.exports = function(target, src, safe) {
          for (var key in src) redefine(target, key, src[key], safe)
          return target
        }
      },
      {'./_redefine': '../node_modules/core-js/modules/_redefine.js'},
    ],
    '../node_modules/core-js/modules/_set-species.js': [
      function(require, module, exports) {
        'use strict'
        var global = require('./_global')
        var dP = require('./_object-dp')
        var DESCRIPTORS = require('./_descriptors')
        var SPECIES = require('./_wks')('species')

        module.exports = function(KEY) {
          var C = global[KEY]
          if (DESCRIPTORS && C && !C[SPECIES])
            dP.f(C, SPECIES, {
              configurable: true,
              get: function() {
                return this
              },
            })
        }
      },
      {
        './_global': '../node_modules/core-js/modules/_global.js',
        './_object-dp': '../node_modules/core-js/modules/_object-dp.js',
        './_descriptors': '../node_modules/core-js/modules/_descriptors.js',
        './_wks': '../node_modules/core-js/modules/_wks.js',
      },
    ],
    '../node_modules/core-js/modules/_iter-detect.js': [
      function(require, module, exports) {
        var ITERATOR = require('./_wks')('iterator')
        var SAFE_CLOSING = false

        try {
          var riter = [7][ITERATOR]()
          riter['return'] = function() {
            SAFE_CLOSING = true
          }
          // eslint-disable-next-line no-throw-literal
          Array.from(riter, function() {
            throw 2
          })
        } catch (e) {
          /* empty */
        }

        module.exports = function(exec, skipClosing) {
          if (!skipClosing && !SAFE_CLOSING) return false
          var safe = false
          try {
            var arr = [7]
            var iter = arr[ITERATOR]()
            iter.next = function() {
              return {done: (safe = true)}
            }
            arr[ITERATOR] = function() {
              return iter
            }
            exec(arr)
          } catch (e) {
            /* empty */
          }
          return safe
        }
      },
      {'./_wks': '../node_modules/core-js/modules/_wks.js'},
    ],
    '../node_modules/core-js/modules/es6.promise.js': [
      function(require, module, exports) {
        'use strict'
        var LIBRARY = require('./_library')
        var global = require('./_global')
        var ctx = require('./_ctx')
        var classof = require('./_classof')
        var $export = require('./_export')
        var isObject = require('./_is-object')
        var aFunction = require('./_a-function')
        var anInstance = require('./_an-instance')
        var forOf = require('./_for-of')
        var speciesConstructor = require('./_species-constructor')
        var task = require('./_task').set
        var microtask = require('./_microtask')()
        var newPromiseCapabilityModule = require('./_new-promise-capability')
        var perform = require('./_perform')
        var userAgent = require('./_user-agent')
        var promiseResolve = require('./_promise-resolve')
        var PROMISE = 'Promise'
        var TypeError = global.TypeError
        var process = global.process
        var versions = process && process.versions
        var v8 = (versions && versions.v8) || ''
        var $Promise = global[PROMISE]
        var isNode = classof(process) == 'process'
        var empty = function() {
          /* empty */
        }
        var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper
        var newPromiseCapability = (newGenericPromiseCapability =
          newPromiseCapabilityModule.f)

        var USE_NATIVE = !!(function() {
          try {
            // correct subclassing with @@species support
            var promise = $Promise.resolve(1)
            var FakePromise = ((promise.constructor = {})[
              require('./_wks')('species')
            ] = function(exec) {
              exec(empty, empty)
            })
            // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
            return (
              (isNode || typeof PromiseRejectionEvent == 'function') &&
              promise.then(empty) instanceof FakePromise &&
              // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
              // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
              // we can't detect it synchronously, so just check versions
              v8.indexOf('6.6') !== 0 &&
              userAgent.indexOf('Chrome/66') === -1
            )
          } catch (e) {
            /* empty */
          }
        })()

        // helpers
        var isThenable = function(it) {
          var then
          return isObject(it) && typeof (then = it.then) == 'function'
            ? then
            : false
        }
        var notify = function(promise, isReject) {
          if (promise._n) return
          promise._n = true
          var chain = promise._c
          microtask(function() {
            var value = promise._v
            var ok = promise._s == 1
            var i = 0
            var run = function(reaction) {
              var handler = ok ? reaction.ok : reaction.fail
              var resolve = reaction.resolve
              var reject = reaction.reject
              var domain = reaction.domain
              var result, then, exited
              try {
                if (handler) {
                  if (!ok) {
                    if (promise._h == 2) onHandleUnhandled(promise)
                    promise._h = 1
                  }
                  if (handler === true) result = value
                  else {
                    if (domain) domain.enter()
                    result = handler(value) // may throw
                    if (domain) {
                      domain.exit()
                      exited = true
                    }
                  }
                  if (result === reaction.promise) {
                    reject(TypeError('Promise-chain cycle'))
                  } else if ((then = isThenable(result))) {
                    then.call(result, resolve, reject)
                  } else resolve(result)
                } else reject(value)
              } catch (e) {
                if (domain && !exited) domain.exit()
                reject(e)
              }
            }
            while (chain.length > i) run(chain[i++]) // variable length - can't use forEach
            promise._c = []
            promise._n = false
            if (isReject && !promise._h) onUnhandled(promise)
          })
        }
        var onUnhandled = function(promise) {
          task.call(global, function() {
            var value = promise._v
            var unhandled = isUnhandled(promise)
            var result, handler, console
            if (unhandled) {
              result = perform(function() {
                if (isNode) {
                  process.emit('unhandledRejection', value, promise)
                } else if ((handler = global.onunhandledrejection)) {
                  handler({promise: promise, reason: value})
                } else if ((console = global.console) && console.error) {
                  console.error('Unhandled promise rejection', value)
                }
              })
              // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
              promise._h = isNode || isUnhandled(promise) ? 2 : 1
            }
            promise._a = undefined
            if (unhandled && result.e) throw result.v
          })
        }
        var isUnhandled = function(promise) {
          return promise._h !== 1 && (promise._a || promise._c).length === 0
        }
        var onHandleUnhandled = function(promise) {
          task.call(global, function() {
            var handler
            if (isNode) {
              process.emit('rejectionHandled', promise)
            } else if ((handler = global.onrejectionhandled)) {
              handler({promise: promise, reason: promise._v})
            }
          })
        }
        var $reject = function(value) {
          var promise = this
          if (promise._d) return
          promise._d = true
          promise = promise._w || promise // unwrap
          promise._v = value
          promise._s = 2
          if (!promise._a) promise._a = promise._c.slice()
          notify(promise, true)
        }
        var $resolve = function(value) {
          var promise = this
          var then
          if (promise._d) return
          promise._d = true
          promise = promise._w || promise // unwrap
          try {
            if (promise === value)
              throw TypeError("Promise can't be resolved itself")
            if ((then = isThenable(value))) {
              microtask(function() {
                var wrapper = {_w: promise, _d: false} // wrap
                try {
                  then.call(
                    value,
                    ctx($resolve, wrapper, 1),
                    ctx($reject, wrapper, 1)
                  )
                } catch (e) {
                  $reject.call(wrapper, e)
                }
              })
            } else {
              promise._v = value
              promise._s = 1
              notify(promise, false)
            }
          } catch (e) {
            $reject.call({_w: promise, _d: false}, e) // wrap
          }
        }

        // constructor polyfill
        if (!USE_NATIVE) {
          // 25.4.3.1 Promise(executor)
          $Promise = function Promise(executor) {
            anInstance(this, $Promise, PROMISE, '_h')
            aFunction(executor)
            Internal.call(this)
            try {
              executor(ctx($resolve, this, 1), ctx($reject, this, 1))
            } catch (err) {
              $reject.call(this, err)
            }
          }
          // eslint-disable-next-line no-unused-vars
          Internal = function Promise(executor) {
            this._c = [] // <- awaiting reactions
            this._a = undefined // <- checked in isUnhandled reactions
            this._s = 0 // <- state
            this._d = false // <- done
            this._v = undefined // <- value
            this._h = 0 // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
            this._n = false // <- notify
          }
          Internal.prototype = require('./_redefine-all')($Promise.prototype, {
            // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
            then: function then(onFulfilled, onRejected) {
              var reaction = newPromiseCapability(
                speciesConstructor(this, $Promise)
              )
              reaction.ok =
                typeof onFulfilled == 'function' ? onFulfilled : true
              reaction.fail = typeof onRejected == 'function' && onRejected
              reaction.domain = isNode ? process.domain : undefined
              this._c.push(reaction)
              if (this._a) this._a.push(reaction)
              if (this._s) notify(this, false)
              return reaction.promise
            },
            // 25.4.5.1 Promise.prototype.catch(onRejected)
            catch: function(onRejected) {
              return this.then(undefined, onRejected)
            },
          })
          OwnPromiseCapability = function() {
            var promise = new Internal()
            this.promise = promise
            this.resolve = ctx($resolve, promise, 1)
            this.reject = ctx($reject, promise, 1)
          }
          newPromiseCapabilityModule.f = newPromiseCapability = function(C) {
            return C === $Promise || C === Wrapper
              ? new OwnPromiseCapability(C)
              : newGenericPromiseCapability(C)
          }
        }

        $export($export.G + $export.W + $export.F * !USE_NATIVE, {
          Promise: $Promise,
        })
        require('./_set-to-string-tag')($Promise, PROMISE)
        require('./_set-species')(PROMISE)
        Wrapper = require('./_core')[PROMISE]

        // statics
        $export($export.S + $export.F * !USE_NATIVE, PROMISE, {
          // 25.4.4.5 Promise.reject(r)
          reject: function reject(r) {
            var capability = newPromiseCapability(this)
            var $$reject = capability.reject
            $$reject(r)
            return capability.promise
          },
        })
        $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
          // 25.4.4.6 Promise.resolve(x)
          resolve: function resolve(x) {
            return promiseResolve(
              LIBRARY && this === Wrapper ? $Promise : this,
              x
            )
          },
        })
        $export(
          $export.S +
            $export.F *
              !(
                USE_NATIVE &&
                require('./_iter-detect')(function(iter) {
                  $Promise.all(iter)['catch'](empty)
                })
              ),
          PROMISE,
          {
            // 25.4.4.1 Promise.all(iterable)
            all: function all(iterable) {
              var C = this
              var capability = newPromiseCapability(C)
              var resolve = capability.resolve
              var reject = capability.reject
              var result = perform(function() {
                var values = []
                var index = 0
                var remaining = 1
                forOf(iterable, false, function(promise) {
                  var $index = index++
                  var alreadyCalled = false
                  values.push(undefined)
                  remaining++
                  C.resolve(promise).then(function(value) {
                    if (alreadyCalled) return
                    alreadyCalled = true
                    values[$index] = value
                    --remaining || resolve(values)
                  }, reject)
                })
                --remaining || resolve(values)
              })
              if (result.e) reject(result.v)
              return capability.promise
            },
            // 25.4.4.4 Promise.race(iterable)
            race: function race(iterable) {
              var C = this
              var capability = newPromiseCapability(C)
              var reject = capability.reject
              var result = perform(function() {
                forOf(iterable, false, function(promise) {
                  C.resolve(promise).then(capability.resolve, reject)
                })
              })
              if (result.e) reject(result.v)
              return capability.promise
            },
          }
        )
      },
      {
        './_library': '../node_modules/core-js/modules/_library.js',
        './_global': '../node_modules/core-js/modules/_global.js',
        './_ctx': '../node_modules/core-js/modules/_ctx.js',
        './_classof': '../node_modules/core-js/modules/_classof.js',
        './_export': '../node_modules/core-js/modules/_export.js',
        './_is-object': '../node_modules/core-js/modules/_is-object.js',
        './_a-function': '../node_modules/core-js/modules/_a-function.js',
        './_an-instance': '../node_modules/core-js/modules/_an-instance.js',
        './_for-of': '../node_modules/core-js/modules/_for-of.js',
        './_species-constructor':
          '../node_modules/core-js/modules/_species-constructor.js',
        './_task': '../node_modules/core-js/modules/_task.js',
        './_microtask': '../node_modules/core-js/modules/_microtask.js',
        './_new-promise-capability':
          '../node_modules/core-js/modules/_new-promise-capability.js',
        './_perform': '../node_modules/core-js/modules/_perform.js',
        './_user-agent': '../node_modules/core-js/modules/_user-agent.js',
        './_promise-resolve':
          '../node_modules/core-js/modules/_promise-resolve.js',
        './_wks': '../node_modules/core-js/modules/_wks.js',
        './_redefine-all': '../node_modules/core-js/modules/_redefine-all.js',
        './_set-to-string-tag':
          '../node_modules/core-js/modules/_set-to-string-tag.js',
        './_set-species': '../node_modules/core-js/modules/_set-species.js',
        './_core': '../node_modules/core-js/modules/_core.js',
        './_iter-detect': '../node_modules/core-js/modules/_iter-detect.js',
      },
    ],
    '../node_modules/core-js/es6/promise.js': [
      function(require, module, exports) {
        require('../modules/es6.object.to-string')
        require('../modules/es6.string.iterator')
        require('../modules/web.dom.iterable')
        require('../modules/es6.promise')
        module.exports = require('../modules/_core').Promise
      },
      {
        '../modules/es6.object.to-string':
          '../node_modules/core-js/modules/es6.object.to-string.js',
        '../modules/es6.string.iterator':
          '../node_modules/core-js/modules/es6.string.iterator.js',
        '../modules/web.dom.iterable':
          '../node_modules/core-js/modules/web.dom.iterable.js',
        '../modules/es6.promise':
          '../node_modules/core-js/modules/es6.promise.js',
        '../modules/_core': '../node_modules/core-js/modules/_core.js',
      },
    ],
    '../node_modules/whatwg-fetch/fetch.js': [
      function(require, module, exports) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        exports.Headers = Headers
        exports.Request = Request
        exports.Response = Response
        exports.fetch = fetch
        exports.DOMException = void 0
        var support = {
          searchParams: 'URLSearchParams' in self,
          iterable: 'Symbol' in self && 'iterator' in Symbol,
          blob:
            'FileReader' in self &&
            'Blob' in self &&
            (function() {
              try {
                new Blob()
                return true
              } catch (e) {
                return false
              }
            })(),
          formData: 'FormData' in self,
          arrayBuffer: 'ArrayBuffer' in self,
        }

        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj)
        }

        if (support.arrayBuffer) {
          var viewClasses = [
            '[object Int8Array]',
            '[object Uint8Array]',
            '[object Uint8ClampedArray]',
            '[object Int16Array]',
            '[object Uint16Array]',
            '[object Int32Array]',
            '[object Uint32Array]',
            '[object Float32Array]',
            '[object Float64Array]',
          ]

          var isArrayBufferView =
            ArrayBuffer.isView ||
            function(obj) {
              return (
                obj &&
                viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
              )
            }
        }

        function normalizeName(name) {
          if (typeof name !== 'string') {
            name = String(name)
          }

          if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
            throw new TypeError('Invalid character in header field name')
          }

          return name.toLowerCase()
        }

        function normalizeValue(value) {
          if (typeof value !== 'string') {
            value = String(value)
          }

          return value
        } // Build a destructive iterator for the value list

        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift()
              return {
                done: value === undefined,
                value: value,
              }
            },
          }

          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator
            }
          }

          return iterator
        }

        function Headers(headers) {
          this.map = {}

          if (headers instanceof Headers) {
            headers.forEach(function(value, name) {
              this.append(name, value)
            }, this)
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1])
            }, this)
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name])
            }, this)
          }
        }

        Headers.prototype.append = function(name, value) {
          name = normalizeName(name)
          value = normalizeValue(value)
          var oldValue = this.map[name]
          this.map[name] = oldValue ? oldValue + ', ' + value : value
        }

        Headers.prototype['delete'] = function(name) {
          delete this.map[normalizeName(name)]
        }

        Headers.prototype.get = function(name) {
          name = normalizeName(name)
          return this.has(name) ? this.map[name] : null
        }

        Headers.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name))
        }

        Headers.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value)
        }

        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this)
            }
          }
        }

        Headers.prototype.keys = function() {
          var items = []
          this.forEach(function(value, name) {
            items.push(name)
          })
          return iteratorFor(items)
        }

        Headers.prototype.values = function() {
          var items = []
          this.forEach(function(value) {
            items.push(value)
          })
          return iteratorFor(items)
        }

        Headers.prototype.entries = function() {
          var items = []
          this.forEach(function(value, name) {
            items.push([name, value])
          })
          return iteratorFor(items)
        }

        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries
        }

        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError('Already read'))
          }

          body.bodyUsed = true
        }

        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result)
            }

            reader.onerror = function() {
              reject(reader.error)
            }
          })
        }

        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader()
          var promise = fileReaderReady(reader)
          reader.readAsArrayBuffer(blob)
          return promise
        }

        function readBlobAsText(blob) {
          var reader = new FileReader()
          var promise = fileReaderReady(reader)
          reader.readAsText(blob)
          return promise
        }

        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf)
          var chars = new Array(view.length)

          for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i])
          }

          return chars.join('')
        }

        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0)
          } else {
            var view = new Uint8Array(buf.byteLength)
            view.set(new Uint8Array(buf))
            return view.buffer
          }
        }

        function Body() {
          this.bodyUsed = false

          this._initBody = function(body) {
            this._bodyInit = body

            if (!body) {
              this._bodyText = ''
            } else if (typeof body === 'string') {
              this._bodyText = body
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body
            } else if (
              support.formData &&
              FormData.prototype.isPrototypeOf(body)
            ) {
              this._bodyFormData = body
            } else if (
              support.searchParams &&
              URLSearchParams.prototype.isPrototypeOf(body)
            ) {
              this._bodyText = body.toString()
            } else if (
              support.arrayBuffer &&
              support.blob &&
              isDataView(body)
            ) {
              this._bodyArrayBuffer = bufferClone(body.buffer) // IE 10-11 can't handle a DataView body.

              this._bodyInit = new Blob([this._bodyArrayBuffer])
            } else if (
              support.arrayBuffer &&
              (ArrayBuffer.prototype.isPrototypeOf(body) ||
                isArrayBufferView(body))
            ) {
              this._bodyArrayBuffer = bufferClone(body)
            } else {
              this._bodyText = body = Object.prototype.toString.call(body)
            }

            if (!this.headers.get('content-type')) {
              if (typeof body === 'string') {
                this.headers.set('content-type', 'text/plain;charset=UTF-8')
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set('content-type', this._bodyBlob.type)
              } else if (
                support.searchParams &&
                URLSearchParams.prototype.isPrototypeOf(body)
              ) {
                this.headers.set(
                  'content-type',
                  'application/x-www-form-urlencoded;charset=UTF-8'
                )
              }
            }
          }

          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this)

              if (rejected) {
                return rejected
              }

              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob)
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]))
              } else if (this._bodyFormData) {
                throw new Error('could not read FormData body as blob')
              } else {
                return Promise.resolve(new Blob([this._bodyText]))
              }
            }

            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
              } else {
                return this.blob().then(readBlobAsArrayBuffer)
              }
            }
          }

          this.text = function() {
            var rejected = consumed(this)

            if (rejected) {
              return rejected
            }

            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob)
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(
                readArrayBufferAsText(this._bodyArrayBuffer)
              )
            } else if (this._bodyFormData) {
              throw new Error('could not read FormData body as text')
            } else {
              return Promise.resolve(this._bodyText)
            }
          }

          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode)
            }
          }

          this.json = function() {
            return this.text().then(JSON.parse)
          }

          return this
        } // HTTP methods whose capitalization should be normalized

        var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

        function normalizeMethod(method) {
          var upcased = method.toUpperCase()
          return methods.indexOf(upcased) > -1 ? upcased : method
        }

        function Request(input, options) {
          options = options || {}
          var body = options.body

          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError('Already read')
            }

            this.url = input.url
            this.credentials = input.credentials

            if (!options.headers) {
              this.headers = new Headers(input.headers)
            }

            this.method = input.method
            this.mode = input.mode
            this.signal = input.signal

            if (!body && input._bodyInit != null) {
              body = input._bodyInit
              input.bodyUsed = true
            }
          } else {
            this.url = String(input)
          }

          this.credentials =
            options.credentials || this.credentials || 'same-origin'

          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers)
          }

          this.method = normalizeMethod(options.method || this.method || 'GET')
          this.mode = options.mode || this.mode || null
          this.signal = options.signal || this.signal
          this.referrer = null

          if ((this.method === 'GET' || this.method === 'HEAD') && body) {
            throw new TypeError('Body not allowed for GET or HEAD requests')
          }

          this._initBody(body)
        }

        Request.prototype.clone = function() {
          return new Request(this, {
            body: this._bodyInit,
          })
        }

        function decode(body) {
          var form = new FormData()
          body
            .trim()
            .split('&')
            .forEach(function(bytes) {
              if (bytes) {
                var split = bytes.split('=')
                var name = split.shift().replace(/\+/g, ' ')
                var value = split.join('=').replace(/\+/g, ' ')
                form.append(decodeURIComponent(name), decodeURIComponent(value))
              }
            })
          return form
        }

        function parseHeaders(rawHeaders) {
          var headers = new Headers() // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
          // https://tools.ietf.org/html/rfc7230#section-3.2

          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
          preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(':')
            var key = parts.shift().trim()

            if (key) {
              var value = parts.join(':').trim()
              headers.append(key, value)
            }
          })
          return headers
        }

        Body.call(Request.prototype)

        function Response(bodyInit, options) {
          if (!options) {
            options = {}
          }

          this.type = 'default'
          this.status = options.status === undefined ? 200 : options.status
          this.ok = this.status >= 200 && this.status < 300
          this.statusText = 'statusText' in options ? options.statusText : 'OK'
          this.headers = new Headers(options.headers)
          this.url = options.url || ''

          this._initBody(bodyInit)
        }

        Body.call(Response.prototype)

        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url,
          })
        }

        Response.error = function() {
          var response = new Response(null, {
            status: 0,
            statusText: '',
          })
          response.type = 'error'
          return response
        }

        var redirectStatuses = [301, 302, 303, 307, 308]

        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError('Invalid status code')
          }

          return new Response(null, {
            status: status,
            headers: {
              location: url,
            },
          })
        }

        var DOMException = self.DOMException
        exports.DOMException = DOMException

        try {
          new DOMException()
        } catch (err) {
          exports.DOMException = DOMException = function(message, name) {
            this.message = message
            this.name = name
            var error = Error(message)
            this.stack = error.stack
          }

          DOMException.prototype = Object.create(Error.prototype)
          DOMException.prototype.constructor = DOMException
        }

        function fetch(input, init) {
          return new Promise(function(resolve, reject) {
            var request = new Request(input, init)

            if (request.signal && request.signal.aborted) {
              return reject(new DOMException('Aborted', 'AbortError'))
            }

            var xhr = new XMLHttpRequest()

            function abortXhr() {
              xhr.abort()
            }

            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || ''),
              }
              options.url =
                'responseURL' in xhr
                  ? xhr.responseURL
                  : options.headers.get('X-Request-URL')
              var body = 'response' in xhr ? xhr.response : xhr.responseText
              resolve(new Response(body, options))
            }

            xhr.onerror = function() {
              reject(new TypeError('Network request failed'))
            }

            xhr.ontimeout = function() {
              reject(new TypeError('Network request failed'))
            }

            xhr.onabort = function() {
              reject(new DOMException('Aborted', 'AbortError'))
            }

            xhr.open(request.method, request.url, true)

            if (request.credentials === 'include') {
              xhr.withCredentials = true
            } else if (request.credentials === 'omit') {
              xhr.withCredentials = false
            }

            if ('responseType' in xhr && support.blob) {
              xhr.responseType = 'blob'
            }

            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value)
            })

            if (request.signal) {
              request.signal.addEventListener('abort', abortXhr)

              xhr.onreadystatechange = function() {
                // DONE (success or failure)
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener('abort', abortXhr)
                }
              }
            }

            xhr.send(
              typeof request._bodyInit === 'undefined'
                ? null
                : request._bodyInit
            )
          })
        }

        fetch.polyfill = true

        if (!self.fetch) {
          self.fetch = fetch
          self.Headers = Headers
          self.Request = Request
          self.Response = Response
        }
      },
      {},
    ],
    '../node_modules/core-js/modules/_typed.js': [
      function(require, module, exports) {
        var global = require('./_global')
        var hide = require('./_hide')
        var uid = require('./_uid')
        var TYPED = uid('typed_array')
        var VIEW = uid('view')
        var ABV = !!(global.ArrayBuffer && global.DataView)
        var CONSTR = ABV
        var i = 0
        var l = 9
        var Typed

        var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(
          ','
        )

        while (i < l) {
          if ((Typed = global[TypedArrayConstructors[i++]])) {
            hide(Typed.prototype, TYPED, true)
            hide(Typed.prototype, VIEW, true)
          } else CONSTR = false
        }

        module.exports = {
          ABV: ABV,
          CONSTR: CONSTR,
          TYPED: TYPED,
          VIEW: VIEW,
        }
      },
      {
        './_global': '../node_modules/core-js/modules/_global.js',
        './_hide': '../node_modules/core-js/modules/_hide.js',
        './_uid': '../node_modules/core-js/modules/_uid.js',
      },
    ],
    '../node_modules/core-js/modules/_to-index.js': [
      function(require, module, exports) {
        // https://tc39.github.io/ecma262/#sec-toindex
        var toInteger = require('./_to-integer')
        var toLength = require('./_to-length')
        module.exports = function(it) {
          if (it === undefined) return 0
          var number = toInteger(it)
          var length = toLength(number)
          if (number !== length) throw RangeError('Wrong length!')
          return length
        }
      },
      {
        './_to-integer': '../node_modules/core-js/modules/_to-integer.js',
        './_to-length': '../node_modules/core-js/modules/_to-length.js',
      },
    ],
    '../node_modules/core-js/modules/_object-gopn.js': [
      function(require, module, exports) {
        // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
        var $keys = require('./_object-keys-internal')
        var hiddenKeys = require('./_enum-bug-keys').concat(
          'length',
          'prototype'
        )

        exports.f =
          Object.getOwnPropertyNames ||
          function getOwnPropertyNames(O) {
            return $keys(O, hiddenKeys)
          }
      },
      {
        './_object-keys-internal':
          '../node_modules/core-js/modules/_object-keys-internal.js',
        './_enum-bug-keys': '../node_modules/core-js/modules/_enum-bug-keys.js',
      },
    ],
    '../node_modules/core-js/modules/_array-fill.js': [
      function(require, module, exports) {
        // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
        'use strict'
        var toObject = require('./_to-object')
        var toAbsoluteIndex = require('./_to-absolute-index')
        var toLength = require('./_to-length')
        module.exports = function fill(value /* , start = 0, end = @length */) {
          var O = toObject(this)
          var length = toLength(O.length)
          var aLen = arguments.length
          var index = toAbsoluteIndex(
            aLen > 1 ? arguments[1] : undefined,
            length
          )
          var end = aLen > 2 ? arguments[2] : undefined
          var endPos = end === undefined ? length : toAbsoluteIndex(end, length)
          while (endPos > index) O[index++] = value
          return O
        }
      },
      {
        './_to-object': '../node_modules/core-js/modules/_to-object.js',
        './_to-absolute-index':
          '../node_modules/core-js/modules/_to-absolute-index.js',
        './_to-length': '../node_modules/core-js/modules/_to-length.js',
      },
    ],
    '../node_modules/core-js/modules/_typed-buffer.js': [
      function(require, module, exports) {
        'use strict'
        var global = require('./_global')
        var DESCRIPTORS = require('./_descriptors')
        var LIBRARY = require('./_library')
        var $typed = require('./_typed')
        var hide = require('./_hide')
        var redefineAll = require('./_redefine-all')
        var fails = require('./_fails')
        var anInstance = require('./_an-instance')
        var toInteger = require('./_to-integer')
        var toLength = require('./_to-length')
        var toIndex = require('./_to-index')
        var gOPN = require('./_object-gopn').f
        var dP = require('./_object-dp').f
        var arrayFill = require('./_array-fill')
        var setToStringTag = require('./_set-to-string-tag')
        var ARRAY_BUFFER = 'ArrayBuffer'
        var DATA_VIEW = 'DataView'
        var PROTOTYPE = 'prototype'
        var WRONG_LENGTH = 'Wrong length!'
        var WRONG_INDEX = 'Wrong index!'
        var $ArrayBuffer = global[ARRAY_BUFFER]
        var $DataView = global[DATA_VIEW]
        var Math = global.Math
        var RangeError = global.RangeError
        // eslint-disable-next-line no-shadow-restricted-names
        var Infinity = global.Infinity
        var BaseBuffer = $ArrayBuffer
        var abs = Math.abs
        var pow = Math.pow
        var floor = Math.floor
        var log = Math.log
        var LN2 = Math.LN2
        var BUFFER = 'buffer'
        var BYTE_LENGTH = 'byteLength'
        var BYTE_OFFSET = 'byteOffset'
        var $BUFFER = DESCRIPTORS ? '_b' : BUFFER
        var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH
        var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET

        // IEEE754 conversions based on https://github.com/feross/ieee754
        function packIEEE754(value, mLen, nBytes) {
          var buffer = new Array(nBytes)
          var eLen = nBytes * 8 - mLen - 1
          var eMax = (1 << eLen) - 1
          var eBias = eMax >> 1
          var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
          var i = 0
          var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
          var e, m, c
          value = abs(value)
          // eslint-disable-next-line no-self-compare
          if (value != value || value === Infinity) {
            // eslint-disable-next-line no-self-compare
            m = value != value ? 1 : 0
            e = eMax
          } else {
            e = floor(log(value) / LN2)
            if (value * (c = pow(2, -e)) < 1) {
              e--
              c *= 2
            }
            if (e + eBias >= 1) {
              value += rt / c
            } else {
              value += rt * pow(2, 1 - eBias)
            }
            if (value * c >= 2) {
              e++
              c /= 2
            }
            if (e + eBias >= eMax) {
              m = 0
              e = eMax
            } else if (e + eBias >= 1) {
              m = (value * c - 1) * pow(2, mLen)
              e = e + eBias
            } else {
              m = value * pow(2, eBias - 1) * pow(2, mLen)
              e = 0
            }
          }
          for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
          e = (e << mLen) | m
          eLen += mLen
          for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
          buffer[--i] |= s * 128
          return buffer
        }
        function unpackIEEE754(buffer, mLen, nBytes) {
          var eLen = nBytes * 8 - mLen - 1
          var eMax = (1 << eLen) - 1
          var eBias = eMax >> 1
          var nBits = eLen - 7
          var i = nBytes - 1
          var s = buffer[i--]
          var e = s & 127
          var m
          s >>= 7
          for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
          m = e & ((1 << -nBits) - 1)
          e >>= -nBits
          nBits += mLen
          for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
          if (e === 0) {
            e = 1 - eBias
          } else if (e === eMax) {
            return m ? NaN : s ? -Infinity : Infinity
          } else {
            m = m + pow(2, mLen)
            e = e - eBias
          }
          return (s ? -1 : 1) * m * pow(2, e - mLen)
        }

        function unpackI32(bytes) {
          return (
            (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0]
          )
        }
        function packI8(it) {
          return [it & 0xff]
        }
        function packI16(it) {
          return [it & 0xff, (it >> 8) & 0xff]
        }
        function packI32(it) {
          return [
            it & 0xff,
            (it >> 8) & 0xff,
            (it >> 16) & 0xff,
            (it >> 24) & 0xff,
          ]
        }
        function packF64(it) {
          return packIEEE754(it, 52, 8)
        }
        function packF32(it) {
          return packIEEE754(it, 23, 4)
        }

        function addGetter(C, key, internal) {
          dP(C[PROTOTYPE], key, {
            get: function() {
              return this[internal]
            },
          })
        }

        function get(view, bytes, index, isLittleEndian) {
          var numIndex = +index
          var intIndex = toIndex(numIndex)
          if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX)
          var store = view[$BUFFER]._b
          var start = intIndex + view[$OFFSET]
          var pack = store.slice(start, start + bytes)
          return isLittleEndian ? pack : pack.reverse()
        }
        function set(view, bytes, index, conversion, value, isLittleEndian) {
          var numIndex = +index
          var intIndex = toIndex(numIndex)
          if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX)
          var store = view[$BUFFER]._b
          var start = intIndex + view[$OFFSET]
          var pack = conversion(+value)
          for (var i = 0; i < bytes; i++)
            store[start + i] = pack[isLittleEndian ? i : bytes - i - 1]
        }

        if (!$typed.ABV) {
          $ArrayBuffer = function ArrayBuffer(length) {
            anInstance(this, $ArrayBuffer, ARRAY_BUFFER)
            var byteLength = toIndex(length)
            this._b = arrayFill.call(new Array(byteLength), 0)
            this[$LENGTH] = byteLength
          }

          $DataView = function DataView(buffer, byteOffset, byteLength) {
            anInstance(this, $DataView, DATA_VIEW)
            anInstance(buffer, $ArrayBuffer, DATA_VIEW)
            var bufferLength = buffer[$LENGTH]
            var offset = toInteger(byteOffset)
            if (offset < 0 || offset > bufferLength)
              throw RangeError('Wrong offset!')
            byteLength =
              byteLength === undefined
                ? bufferLength - offset
                : toLength(byteLength)
            if (offset + byteLength > bufferLength)
              throw RangeError(WRONG_LENGTH)
            this[$BUFFER] = buffer
            this[$OFFSET] = offset
            this[$LENGTH] = byteLength
          }

          if (DESCRIPTORS) {
            addGetter($ArrayBuffer, BYTE_LENGTH, '_l')
            addGetter($DataView, BUFFER, '_b')
            addGetter($DataView, BYTE_LENGTH, '_l')
            addGetter($DataView, BYTE_OFFSET, '_o')
          }

          redefineAll($DataView[PROTOTYPE], {
            getInt8: function getInt8(byteOffset) {
              return (get(this, 1, byteOffset)[0] << 24) >> 24
            },
            getUint8: function getUint8(byteOffset) {
              return get(this, 1, byteOffset)[0]
            },
            getInt16: function getInt16(byteOffset /* , littleEndian */) {
              var bytes = get(this, 2, byteOffset, arguments[1])
              return (((bytes[1] << 8) | bytes[0]) << 16) >> 16
            },
            getUint16: function getUint16(byteOffset /* , littleEndian */) {
              var bytes = get(this, 2, byteOffset, arguments[1])
              return (bytes[1] << 8) | bytes[0]
            },
            getInt32: function getInt32(byteOffset /* , littleEndian */) {
              return unpackI32(get(this, 4, byteOffset, arguments[1]))
            },
            getUint32: function getUint32(byteOffset /* , littleEndian */) {
              return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0
            },
            getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
              return unpackIEEE754(
                get(this, 4, byteOffset, arguments[1]),
                23,
                4
              )
            },
            getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
              return unpackIEEE754(
                get(this, 8, byteOffset, arguments[1]),
                52,
                8
              )
            },
            setInt8: function setInt8(byteOffset, value) {
              set(this, 1, byteOffset, packI8, value)
            },
            setUint8: function setUint8(byteOffset, value) {
              set(this, 1, byteOffset, packI8, value)
            },
            setInt16: function setInt16(
              byteOffset,
              value /* , littleEndian */
            ) {
              set(this, 2, byteOffset, packI16, value, arguments[2])
            },
            setUint16: function setUint16(
              byteOffset,
              value /* , littleEndian */
            ) {
              set(this, 2, byteOffset, packI16, value, arguments[2])
            },
            setInt32: function setInt32(
              byteOffset,
              value /* , littleEndian */
            ) {
              set(this, 4, byteOffset, packI32, value, arguments[2])
            },
            setUint32: function setUint32(
              byteOffset,
              value /* , littleEndian */
            ) {
              set(this, 4, byteOffset, packI32, value, arguments[2])
            },
            setFloat32: function setFloat32(
              byteOffset,
              value /* , littleEndian */
            ) {
              set(this, 4, byteOffset, packF32, value, arguments[2])
            },
            setFloat64: function setFloat64(
              byteOffset,
              value /* , littleEndian */
            ) {
              set(this, 8, byteOffset, packF64, value, arguments[2])
            },
          })
        } else {
          if (
            !fails(function() {
              $ArrayBuffer(1)
            }) ||
            !fails(function() {
              new $ArrayBuffer(-1) // eslint-disable-line no-new
            }) ||
            fails(function() {
              new $ArrayBuffer() // eslint-disable-line no-new
              new $ArrayBuffer(1.5) // eslint-disable-line no-new
              new $ArrayBuffer(NaN) // eslint-disable-line no-new
              return $ArrayBuffer.name != ARRAY_BUFFER
            })
          ) {
            $ArrayBuffer = function ArrayBuffer(length) {
              anInstance(this, $ArrayBuffer)
              return new BaseBuffer(toIndex(length))
            }
            var ArrayBufferProto = ($ArrayBuffer[PROTOTYPE] =
              BaseBuffer[PROTOTYPE])
            for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ) {
              if (!((key = keys[j++]) in $ArrayBuffer))
                hide($ArrayBuffer, key, BaseBuffer[key])
            }
            if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer
          }
          // iOS Safari 7.x bug
          var view = new $DataView(new $ArrayBuffer(2))
          var $setInt8 = $DataView[PROTOTYPE].setInt8
          view.setInt8(0, 2147483648)
          view.setInt8(1, 2147483649)
          if (view.getInt8(0) || !view.getInt8(1))
            redefineAll(
              $DataView[PROTOTYPE],
              {
                setInt8: function setInt8(byteOffset, value) {
                  $setInt8.call(this, byteOffset, (value << 24) >> 24)
                },
                setUint8: function setUint8(byteOffset, value) {
                  $setInt8.call(this, byteOffset, (value << 24) >> 24)
                },
              },
              true
            )
        }
        setToStringTag($ArrayBuffer, ARRAY_BUFFER)
        setToStringTag($DataView, DATA_VIEW)
        hide($DataView[PROTOTYPE], $typed.VIEW, true)
        exports[ARRAY_BUFFER] = $ArrayBuffer
        exports[DATA_VIEW] = $DataView
      },
      {
        './_global': '../node_modules/core-js/modules/_global.js',
        './_descriptors': '../node_modules/core-js/modules/_descriptors.js',
        './_library': '../node_modules/core-js/modules/_library.js',
        './_typed': '../node_modules/core-js/modules/_typed.js',
        './_hide': '../node_modules/core-js/modules/_hide.js',
        './_redefine-all': '../node_modules/core-js/modules/_redefine-all.js',
        './_fails': '../node_modules/core-js/modules/_fails.js',
        './_an-instance': '../node_modules/core-js/modules/_an-instance.js',
        './_to-integer': '../node_modules/core-js/modules/_to-integer.js',
        './_to-length': '../node_modules/core-js/modules/_to-length.js',
        './_to-index': '../node_modules/core-js/modules/_to-index.js',
        './_object-gopn': '../node_modules/core-js/modules/_object-gopn.js',
        './_object-dp': '../node_modules/core-js/modules/_object-dp.js',
        './_array-fill': '../node_modules/core-js/modules/_array-fill.js',
        './_set-to-string-tag':
          '../node_modules/core-js/modules/_set-to-string-tag.js',
      },
    ],
    '../node_modules/core-js/modules/_is-array.js': [
      function(require, module, exports) {
        // 7.2.2 IsArray(argument)
        var cof = require('./_cof')
        module.exports =
          Array.isArray ||
          function isArray(arg) {
            return cof(arg) == 'Array'
          }
      },
      {'./_cof': '../node_modules/core-js/modules/_cof.js'},
    ],
    '../node_modules/core-js/modules/_array-species-constructor.js': [
      function(require, module, exports) {
        var isObject = require('./_is-object')
        var isArray = require('./_is-array')
        var SPECIES = require('./_wks')('species')

        module.exports = function(original) {
          var C
          if (isArray(original)) {
            C = original.constructor
            // cross-realm fallback
            if (typeof C == 'function' && (C === Array || isArray(C.prototype)))
              C = undefined
            if (isObject(C)) {
              C = C[SPECIES]
              if (C === null) C = undefined
            }
          }
          return C === undefined ? Array : C
        }
      },
      {
        './_is-object': '../node_modules/core-js/modules/_is-object.js',
        './_is-array': '../node_modules/core-js/modules/_is-array.js',
        './_wks': '../node_modules/core-js/modules/_wks.js',
      },
    ],
    '../node_modules/core-js/modules/_array-species-create.js': [
      function(require, module, exports) {
        // 9.4.2.3 ArraySpeciesCreate(originalArray, length)
        var speciesConstructor = require('./_array-species-constructor')

        module.exports = function(original, length) {
          return new (speciesConstructor(original))(length)
        }
      },
      {
        './_array-species-constructor':
          '../node_modules/core-js/modules/_array-species-constructor.js',
      },
    ],
    '../node_modules/core-js/modules/_array-methods.js': [
      function(require, module, exports) {
        // 0 -> Array#forEach
        // 1 -> Array#map
        // 2 -> Array#filter
        // 3 -> Array#some
        // 4 -> Array#every
        // 5 -> Array#find
        // 6 -> Array#findIndex
        var ctx = require('./_ctx')
        var IObject = require('./_iobject')
        var toObject = require('./_to-object')
        var toLength = require('./_to-length')
        var asc = require('./_array-species-create')
        module.exports = function(TYPE, $create) {
          var IS_MAP = TYPE == 1
          var IS_FILTER = TYPE == 2
          var IS_SOME = TYPE == 3
          var IS_EVERY = TYPE == 4
          var IS_FIND_INDEX = TYPE == 6
          var NO_HOLES = TYPE == 5 || IS_FIND_INDEX
          var create = $create || asc
          return function($this, callbackfn, that) {
            var O = toObject($this)
            var self = IObject(O)
            var f = ctx(callbackfn, that, 3)
            var length = toLength(self.length)
            var index = 0
            var result = IS_MAP
              ? create($this, length)
              : IS_FILTER
              ? create($this, 0)
              : undefined
            var val, res
            for (; length > index; index++)
              if (NO_HOLES || index in self) {
                val = self[index]
                res = f(val, index, O)
                if (TYPE) {
                  if (IS_MAP) result[index] = res
                  // map
                  else if (res)
                    switch (TYPE) {
                      case 3:
                        return true // some
                      case 5:
                        return val // find
                      case 6:
                        return index // findIndex
                      case 2:
                        result.push(val) // filter
                    }
                  else if (IS_EVERY) return false // every
                }
              }
            return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result
          }
        }
      },
      {
        './_ctx': '../node_modules/core-js/modules/_ctx.js',
        './_iobject': '../node_modules/core-js/modules/_iobject.js',
        './_to-object': '../node_modules/core-js/modules/_to-object.js',
        './_to-length': '../node_modules/core-js/modules/_to-length.js',
        './_array-species-create':
          '../node_modules/core-js/modules/_array-species-create.js',
      },
    ],
    '../node_modules/core-js/modules/_array-copy-within.js': [
      function(require, module, exports) {
        // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
        'use strict'
        var toObject = require('./_to-object')
        var toAbsoluteIndex = require('./_to-absolute-index')
        var toLength = require('./_to-length')

        module.exports =
          [].copyWithin ||
          function copyWithin(
            target /* = 0 */,
            start /* = 0, end = @length */
          ) {
            var O = toObject(this)
            var len = toLength(O.length)
            var to = toAbsoluteIndex(target, len)
            var from = toAbsoluteIndex(start, len)
            var end = arguments.length > 2 ? arguments[2] : undefined
            var count = Math.min(
              (end === undefined ? len : toAbsoluteIndex(end, len)) - from,
              len - to
            )
            var inc = 1
            if (from < to && to < from + count) {
              inc = -1
              from += count - 1
              to += count - 1
            }
            while (count-- > 0) {
              if (from in O) O[to] = O[from]
              else delete O[to]
              to += inc
              from += inc
            }
            return O
          }
      },
      {
        './_to-object': '../node_modules/core-js/modules/_to-object.js',
        './_to-absolute-index':
          '../node_modules/core-js/modules/_to-absolute-index.js',
        './_to-length': '../node_modules/core-js/modules/_to-length.js',
      },
    ],
    '../node_modules/core-js/modules/_object-pie.js': [
      function(require, module, exports) {
        exports.f = {}.propertyIsEnumerable
      },
      {},
    ],
    '../node_modules/core-js/modules/_object-gopd.js': [
      function(require, module, exports) {
        var pIE = require('./_object-pie')
        var createDesc = require('./_property-desc')
        var toIObject = require('./_to-iobject')
        var toPrimitive = require('./_to-primitive')
        var has = require('./_has')
        var IE8_DOM_DEFINE = require('./_ie8-dom-define')
        var gOPD = Object.getOwnPropertyDescriptor

        exports.f = require('./_descriptors')
          ? gOPD
          : function getOwnPropertyDescriptor(O, P) {
              O = toIObject(O)
              P = toPrimitive(P, true)
              if (IE8_DOM_DEFINE)
                try {
                  return gOPD(O, P)
                } catch (e) {
                  /* empty */
                }
              if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P])
            }
      },
      {
        './_object-pie': '../node_modules/core-js/modules/_object-pie.js',
        './_property-desc': '../node_modules/core-js/modules/_property-desc.js',
        './_to-iobject': '../node_modules/core-js/modules/_to-iobject.js',
        './_to-primitive': '../node_modules/core-js/modules/_to-primitive.js',
        './_has': '../node_modules/core-js/modules/_has.js',
        './_ie8-dom-define':
          '../node_modules/core-js/modules/_ie8-dom-define.js',
        './_descriptors': '../node_modules/core-js/modules/_descriptors.js',
      },
    ],
    '../node_modules/core-js/modules/_typed-array.js': [
      function(require, module, exports) {
        var global = arguments[3]
        ;('use strict')
        if (require('./_descriptors')) {
          var LIBRARY = require('./_library')
          var global = require('./_global')
          var fails = require('./_fails')
          var $export = require('./_export')
          var $typed = require('./_typed')
          var $buffer = require('./_typed-buffer')
          var ctx = require('./_ctx')
          var anInstance = require('./_an-instance')
          var propertyDesc = require('./_property-desc')
          var hide = require('./_hide')
          var redefineAll = require('./_redefine-all')
          var toInteger = require('./_to-integer')
          var toLength = require('./_to-length')
          var toIndex = require('./_to-index')
          var toAbsoluteIndex = require('./_to-absolute-index')
          var toPrimitive = require('./_to-primitive')
          var has = require('./_has')
          var classof = require('./_classof')
          var isObject = require('./_is-object')
          var toObject = require('./_to-object')
          var isArrayIter = require('./_is-array-iter')
          var create = require('./_object-create')
          var getPrototypeOf = require('./_object-gpo')
          var gOPN = require('./_object-gopn').f
          var getIterFn = require('./core.get-iterator-method')
          var uid = require('./_uid')
          var wks = require('./_wks')
          var createArrayMethod = require('./_array-methods')
          var createArrayIncludes = require('./_array-includes')
          var speciesConstructor = require('./_species-constructor')
          var ArrayIterators = require('./es6.array.iterator')
          var Iterators = require('./_iterators')
          var $iterDetect = require('./_iter-detect')
          var setSpecies = require('./_set-species')
          var arrayFill = require('./_array-fill')
          var arrayCopyWithin = require('./_array-copy-within')
          var $DP = require('./_object-dp')
          var $GOPD = require('./_object-gopd')
          var dP = $DP.f
          var gOPD = $GOPD.f
          var RangeError = global.RangeError
          var TypeError = global.TypeError
          var Uint8Array = global.Uint8Array
          var ARRAY_BUFFER = 'ArrayBuffer'
          var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER
          var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT'
          var PROTOTYPE = 'prototype'
          var ArrayProto = Array[PROTOTYPE]
          var $ArrayBuffer = $buffer.ArrayBuffer
          var $DataView = $buffer.DataView
          var arrayForEach = createArrayMethod(0)
          var arrayFilter = createArrayMethod(2)
          var arraySome = createArrayMethod(3)
          var arrayEvery = createArrayMethod(4)
          var arrayFind = createArrayMethod(5)
          var arrayFindIndex = createArrayMethod(6)
          var arrayIncludes = createArrayIncludes(true)
          var arrayIndexOf = createArrayIncludes(false)
          var arrayValues = ArrayIterators.values
          var arrayKeys = ArrayIterators.keys
          var arrayEntries = ArrayIterators.entries
          var arrayLastIndexOf = ArrayProto.lastIndexOf
          var arrayReduce = ArrayProto.reduce
          var arrayReduceRight = ArrayProto.reduceRight
          var arrayJoin = ArrayProto.join
          var arraySort = ArrayProto.sort
          var arraySlice = ArrayProto.slice
          var arrayToString = ArrayProto.toString
          var arrayToLocaleString = ArrayProto.toLocaleString
          var ITERATOR = wks('iterator')
          var TAG = wks('toStringTag')
          var TYPED_CONSTRUCTOR = uid('typed_constructor')
          var DEF_CONSTRUCTOR = uid('def_constructor')
          var ALL_CONSTRUCTORS = $typed.CONSTR
          var TYPED_ARRAY = $typed.TYPED
          var VIEW = $typed.VIEW
          var WRONG_LENGTH = 'Wrong length!'

          var $map = createArrayMethod(1, function(O, length) {
            return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length)
          })

          var LITTLE_ENDIAN = fails(function() {
            // eslint-disable-next-line no-undef
            return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1
          })

          var FORCED_SET =
            !!Uint8Array &&
            !!Uint8Array[PROTOTYPE].set &&
            fails(function() {
              new Uint8Array(1).set({})
            })

          var toOffset = function(it, BYTES) {
            var offset = toInteger(it)
            if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!')
            return offset
          }

          var validate = function(it) {
            if (isObject(it) && TYPED_ARRAY in it) return it
            throw TypeError(it + ' is not a typed array!')
          }

          var allocate = function(C, length) {
            if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
              throw TypeError('It is not a typed array constructor!')
            }
            return new C(length)
          }

          var speciesFromList = function(O, list) {
            return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list)
          }

          var fromList = function(C, list) {
            var index = 0
            var length = list.length
            var result = allocate(C, length)
            while (length > index) result[index] = list[index++]
            return result
          }

          var addGetter = function(it, key, internal) {
            dP(it, key, {
              get: function() {
                return this._d[internal]
              },
            })
          }

          var $from = function from(source /* , mapfn, thisArg */) {
            var O = toObject(source)
            var aLen = arguments.length
            var mapfn = aLen > 1 ? arguments[1] : undefined
            var mapping = mapfn !== undefined
            var iterFn = getIterFn(O)
            var i, length, values, result, step, iterator
            if (iterFn != undefined && !isArrayIter(iterFn)) {
              for (
                iterator = iterFn.call(O), values = [], i = 0;
                !(step = iterator.next()).done;
                i++
              ) {
                values.push(step.value)
              }
              O = values
            }
            if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2)
            for (
              i = 0,
                length = toLength(O.length),
                result = allocate(this, length);
              length > i;
              i++
            ) {
              result[i] = mapping ? mapfn(O[i], i) : O[i]
            }
            return result
          }

          var $of = function of(/* ...items */) {
            var index = 0
            var length = arguments.length
            var result = allocate(this, length)
            while (length > index) result[index] = arguments[index++]
            return result
          }

          // iOS Safari 6.x fails here
          var TO_LOCALE_BUG =
            !!Uint8Array &&
            fails(function() {
              arrayToLocaleString.call(new Uint8Array(1))
            })

          var $toLocaleString = function toLocaleString() {
            return arrayToLocaleString.apply(
              TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this),
              arguments
            )
          }

          var proto = {
            copyWithin: function copyWithin(target, start /* , end */) {
              return arrayCopyWithin.call(
                validate(this),
                target,
                start,
                arguments.length > 2 ? arguments[2] : undefined
              )
            },
            every: function every(callbackfn /* , thisArg */) {
              return arrayEvery(
                validate(this),
                callbackfn,
                arguments.length > 1 ? arguments[1] : undefined
              )
            },
            fill: function fill(value /* , start, end */) {
              // eslint-disable-line no-unused-vars
              return arrayFill.apply(validate(this), arguments)
            },
            filter: function filter(callbackfn /* , thisArg */) {
              return speciesFromList(
                this,
                arrayFilter(
                  validate(this),
                  callbackfn,
                  arguments.length > 1 ? arguments[1] : undefined
                )
              )
            },
            find: function find(predicate /* , thisArg */) {
              return arrayFind(
                validate(this),
                predicate,
                arguments.length > 1 ? arguments[1] : undefined
              )
            },
            findIndex: function findIndex(predicate /* , thisArg */) {
              return arrayFindIndex(
                validate(this),
                predicate,
                arguments.length > 1 ? arguments[1] : undefined
              )
            },
            forEach: function forEach(callbackfn /* , thisArg */) {
              arrayForEach(
                validate(this),
                callbackfn,
                arguments.length > 1 ? arguments[1] : undefined
              )
            },
            indexOf: function indexOf(searchElement /* , fromIndex */) {
              return arrayIndexOf(
                validate(this),
                searchElement,
                arguments.length > 1 ? arguments[1] : undefined
              )
            },
            includes: function includes(searchElement /* , fromIndex */) {
              return arrayIncludes(
                validate(this),
                searchElement,
                arguments.length > 1 ? arguments[1] : undefined
              )
            },
            join: function join(separator) {
              // eslint-disable-line no-unused-vars
              return arrayJoin.apply(validate(this), arguments)
            },
            lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) {
              // eslint-disable-line no-unused-vars
              return arrayLastIndexOf.apply(validate(this), arguments)
            },
            map: function map(mapfn /* , thisArg */) {
              return $map(
                validate(this),
                mapfn,
                arguments.length > 1 ? arguments[1] : undefined
              )
            },
            reduce: function reduce(callbackfn /* , initialValue */) {
              // eslint-disable-line no-unused-vars
              return arrayReduce.apply(validate(this), arguments)
            },
            reduceRight: function reduceRight(callbackfn /* , initialValue */) {
              // eslint-disable-line no-unused-vars
              return arrayReduceRight.apply(validate(this), arguments)
            },
            reverse: function reverse() {
              var that = this
              var length = validate(that).length
              var middle = Math.floor(length / 2)
              var index = 0
              var value
              while (index < middle) {
                value = that[index]
                that[index++] = that[--length]
                that[length] = value
              }
              return that
            },
            some: function some(callbackfn /* , thisArg */) {
              return arraySome(
                validate(this),
                callbackfn,
                arguments.length > 1 ? arguments[1] : undefined
              )
            },
            sort: function sort(comparefn) {
              return arraySort.call(validate(this), comparefn)
            },
            subarray: function subarray(begin, end) {
              var O = validate(this)
              var length = O.length
              var $begin = toAbsoluteIndex(begin, length)
              return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
                O.buffer,
                O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
                toLength(
                  (end === undefined ? length : toAbsoluteIndex(end, length)) -
                    $begin
                )
              )
            },
          }

          var $slice = function slice(start, end) {
            return speciesFromList(
              this,
              arraySlice.call(validate(this), start, end)
            )
          }

          var $set = function set(arrayLike /* , offset */) {
            validate(this)
            var offset = toOffset(arguments[1], 1)
            var length = this.length
            var src = toObject(arrayLike)
            var len = toLength(src.length)
            var index = 0
            if (len + offset > length) throw RangeError(WRONG_LENGTH)
            while (index < len) this[offset + index] = src[index++]
          }

          var $iterators = {
            entries: function entries() {
              return arrayEntries.call(validate(this))
            },
            keys: function keys() {
              return arrayKeys.call(validate(this))
            },
            values: function values() {
              return arrayValues.call(validate(this))
            },
          }

          var isTAIndex = function(target, key) {
            return (
              isObject(target) &&
              target[TYPED_ARRAY] &&
              typeof key != 'symbol' &&
              key in target &&
              String(+key) == String(key)
            )
          }
          var $getDesc = function getOwnPropertyDescriptor(target, key) {
            return isTAIndex(target, (key = toPrimitive(key, true)))
              ? propertyDesc(2, target[key])
              : gOPD(target, key)
          }
          var $setDesc = function defineProperty(target, key, desc) {
            if (
              isTAIndex(target, (key = toPrimitive(key, true))) &&
              isObject(desc) &&
              has(desc, 'value') &&
              !has(desc, 'get') &&
              !has(desc, 'set') &&
              // TODO: add validation descriptor w/o calling accessors
              !desc.configurable &&
              (!has(desc, 'writable') || desc.writable) &&
              (!has(desc, 'enumerable') || desc.enumerable)
            ) {
              target[key] = desc.value
              return target
            }
            return dP(target, key, desc)
          }

          if (!ALL_CONSTRUCTORS) {
            $GOPD.f = $getDesc
            $DP.f = $setDesc
          }

          $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
            getOwnPropertyDescriptor: $getDesc,
            defineProperty: $setDesc,
          })

          if (
            fails(function() {
              arrayToString.call({})
            })
          ) {
            arrayToString = arrayToLocaleString = function toString() {
              return arrayJoin.call(this)
            }
          }

          var $TypedArrayPrototype$ = redefineAll({}, proto)
          redefineAll($TypedArrayPrototype$, $iterators)
          hide($TypedArrayPrototype$, ITERATOR, $iterators.values)
          redefineAll($TypedArrayPrototype$, {
            slice: $slice,
            set: $set,
            constructor: function() {
              /* noop */
            },
            toString: arrayToString,
            toLocaleString: $toLocaleString,
          })
          addGetter($TypedArrayPrototype$, 'buffer', 'b')
          addGetter($TypedArrayPrototype$, 'byteOffset', 'o')
          addGetter($TypedArrayPrototype$, 'byteLength', 'l')
          addGetter($TypedArrayPrototype$, 'length', 'e')
          dP($TypedArrayPrototype$, TAG, {
            get: function() {
              return this[TYPED_ARRAY]
            },
          })

          // eslint-disable-next-line max-statements
          module.exports = function(KEY, BYTES, wrapper, CLAMPED) {
            CLAMPED = !!CLAMPED
            var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
            var GETTER = 'get' + KEY
            var SETTER = 'set' + KEY
            var TypedArray = global[NAME]
            var Base = TypedArray || {}
            var TAC = TypedArray && getPrototypeOf(TypedArray)
            var FORCED = !TypedArray || !$typed.ABV
            var O = {}
            var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE]
            var getter = function(that, index) {
              var data = that._d
              return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN)
            }
            var setter = function(that, index, value) {
              var data = that._d
              if (CLAMPED)
                value =
                  (value = Math.round(value)) < 0
                    ? 0
                    : value > 0xff
                    ? 0xff
                    : value & 0xff
              data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN)
            }
            var addElement = function(that, index) {
              dP(that, index, {
                get: function() {
                  return getter(this, index)
                },
                set: function(value) {
                  return setter(this, index, value)
                },
                enumerable: true,
              })
            }
            if (FORCED) {
              TypedArray = wrapper(function(that, data, $offset, $length) {
                anInstance(that, TypedArray, NAME, '_d')
                var index = 0
                var offset = 0
                var buffer, byteLength, length, klass
                if (!isObject(data)) {
                  length = toIndex(data)
                  byteLength = length * BYTES
                  buffer = new $ArrayBuffer(byteLength)
                } else if (
                  data instanceof $ArrayBuffer ||
                  (klass = classof(data)) == ARRAY_BUFFER ||
                  klass == SHARED_BUFFER
                ) {
                  buffer = data
                  offset = toOffset($offset, BYTES)
                  var $len = data.byteLength
                  if ($length === undefined) {
                    if ($len % BYTES) throw RangeError(WRONG_LENGTH)
                    byteLength = $len - offset
                    if (byteLength < 0) throw RangeError(WRONG_LENGTH)
                  } else {
                    byteLength = toLength($length) * BYTES
                    if (byteLength + offset > $len)
                      throw RangeError(WRONG_LENGTH)
                  }
                  length = byteLength / BYTES
                } else if (TYPED_ARRAY in data) {
                  return fromList(TypedArray, data)
                } else {
                  return $from.call(TypedArray, data)
                }
                hide(that, '_d', {
                  b: buffer,
                  o: offset,
                  l: byteLength,
                  e: length,
                  v: new $DataView(buffer),
                })
                while (index < length) addElement(that, index++)
              })
              TypedArrayPrototype = TypedArray[PROTOTYPE] = create(
                $TypedArrayPrototype$
              )
              hide(TypedArrayPrototype, 'constructor', TypedArray)
            } else if (
              !fails(function() {
                TypedArray(1)
              }) ||
              !fails(function() {
                new TypedArray(-1) // eslint-disable-line no-new
              }) ||
              !$iterDetect(function(iter) {
                new TypedArray() // eslint-disable-line no-new
                new TypedArray(null) // eslint-disable-line no-new
                new TypedArray(1.5) // eslint-disable-line no-new
                new TypedArray(iter) // eslint-disable-line no-new
              }, true)
            ) {
              TypedArray = wrapper(function(that, data, $offset, $length) {
                anInstance(that, TypedArray, NAME)
                var klass
                // `ws` module bug, temporarily remove validation length for Uint8Array
                // https://github.com/websockets/ws/pull/645
                if (!isObject(data)) return new Base(toIndex(data))
                if (
                  data instanceof $ArrayBuffer ||
                  (klass = classof(data)) == ARRAY_BUFFER ||
                  klass == SHARED_BUFFER
                ) {
                  return $length !== undefined
                    ? new Base(data, toOffset($offset, BYTES), $length)
                    : $offset !== undefined
                    ? new Base(data, toOffset($offset, BYTES))
                    : new Base(data)
                }
                if (TYPED_ARRAY in data) return fromList(TypedArray, data)
                return $from.call(TypedArray, data)
              })
              arrayForEach(
                TAC !== Function.prototype
                  ? gOPN(Base).concat(gOPN(TAC))
                  : gOPN(Base),
                function(key) {
                  if (!(key in TypedArray)) hide(TypedArray, key, Base[key])
                }
              )
              TypedArray[PROTOTYPE] = TypedArrayPrototype
              if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray
            }
            var $nativeIterator = TypedArrayPrototype[ITERATOR]
            var CORRECT_ITER_NAME =
              !!$nativeIterator &&
              ($nativeIterator.name == 'values' ||
                $nativeIterator.name == undefined)
            var $iterator = $iterators.values
            hide(TypedArray, TYPED_CONSTRUCTOR, true)
            hide(TypedArrayPrototype, TYPED_ARRAY, NAME)
            hide(TypedArrayPrototype, VIEW, true)
            hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray)

            if (
              CLAMPED
                ? new TypedArray(1)[TAG] != NAME
                : !(TAG in TypedArrayPrototype)
            ) {
              dP(TypedArrayPrototype, TAG, {
                get: function() {
                  return NAME
                },
              })
            }

            O[NAME] = TypedArray

            $export($export.G + $export.W + $export.F * (TypedArray != Base), O)

            $export($export.S, NAME, {
              BYTES_PER_ELEMENT: BYTES,
            })

            $export(
              $export.S +
                $export.F *
                  fails(function() {
                    Base.of.call(TypedArray, 1)
                  }),
              NAME,
              {
                from: $from,
                of: $of,
              }
            )

            if (!(BYTES_PER_ELEMENT in TypedArrayPrototype))
              hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES)

            $export($export.P, NAME, proto)

            setSpecies(NAME)

            $export($export.P + $export.F * FORCED_SET, NAME, {set: $set})

            $export(
              $export.P + $export.F * !CORRECT_ITER_NAME,
              NAME,
              $iterators
            )

            if (!LIBRARY && TypedArrayPrototype.toString != arrayToString)
              TypedArrayPrototype.toString = arrayToString

            $export(
              $export.P +
                $export.F *
                  fails(function() {
                    new TypedArray(1).slice()
                  }),
              NAME,
              {slice: $slice}
            )

            $export(
              $export.P +
                $export.F *
                  (fails(function() {
                    return (
                      [1, 2].toLocaleString() !=
                      new TypedArray([1, 2]).toLocaleString()
                    )
                  }) ||
                    !fails(function() {
                      TypedArrayPrototype.toLocaleString.call([1, 2])
                    })),
              NAME,
              {toLocaleString: $toLocaleString}
            )

            Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator
            if (!LIBRARY && !CORRECT_ITER_NAME)
              hide(TypedArrayPrototype, ITERATOR, $iterator)
          }
        } else
          module.exports = function() {
            /* empty */
          }
      },
      {
        './_descriptors': '../node_modules/core-js/modules/_descriptors.js',
        './_library': '../node_modules/core-js/modules/_library.js',
        './_global': '../node_modules/core-js/modules/_global.js',
        './_fails': '../node_modules/core-js/modules/_fails.js',
        './_export': '../node_modules/core-js/modules/_export.js',
        './_typed': '../node_modules/core-js/modules/_typed.js',
        './_typed-buffer': '../node_modules/core-js/modules/_typed-buffer.js',
        './_ctx': '../node_modules/core-js/modules/_ctx.js',
        './_an-instance': '../node_modules/core-js/modules/_an-instance.js',
        './_property-desc': '../node_modules/core-js/modules/_property-desc.js',
        './_hide': '../node_modules/core-js/modules/_hide.js',
        './_redefine-all': '../node_modules/core-js/modules/_redefine-all.js',
        './_to-integer': '../node_modules/core-js/modules/_to-integer.js',
        './_to-length': '../node_modules/core-js/modules/_to-length.js',
        './_to-index': '../node_modules/core-js/modules/_to-index.js',
        './_to-absolute-index':
          '../node_modules/core-js/modules/_to-absolute-index.js',
        './_to-primitive': '../node_modules/core-js/modules/_to-primitive.js',
        './_has': '../node_modules/core-js/modules/_has.js',
        './_classof': '../node_modules/core-js/modules/_classof.js',
        './_is-object': '../node_modules/core-js/modules/_is-object.js',
        './_to-object': '../node_modules/core-js/modules/_to-object.js',
        './_is-array-iter': '../node_modules/core-js/modules/_is-array-iter.js',
        './_object-create': '../node_modules/core-js/modules/_object-create.js',
        './_object-gpo': '../node_modules/core-js/modules/_object-gpo.js',
        './_object-gopn': '../node_modules/core-js/modules/_object-gopn.js',
        './core.get-iterator-method':
          '../node_modules/core-js/modules/core.get-iterator-method.js',
        './_uid': '../node_modules/core-js/modules/_uid.js',
        './_wks': '../node_modules/core-js/modules/_wks.js',
        './_array-methods': '../node_modules/core-js/modules/_array-methods.js',
        './_array-includes':
          '../node_modules/core-js/modules/_array-includes.js',
        './_species-constructor':
          '../node_modules/core-js/modules/_species-constructor.js',
        './es6.array.iterator':
          '../node_modules/core-js/modules/es6.array.iterator.js',
        './_iterators': '../node_modules/core-js/modules/_iterators.js',
        './_iter-detect': '../node_modules/core-js/modules/_iter-detect.js',
        './_set-species': '../node_modules/core-js/modules/_set-species.js',
        './_array-fill': '../node_modules/core-js/modules/_array-fill.js',
        './_array-copy-within':
          '../node_modules/core-js/modules/_array-copy-within.js',
        './_object-dp': '../node_modules/core-js/modules/_object-dp.js',
        './_object-gopd': '../node_modules/core-js/modules/_object-gopd.js',
      },
    ],
    '../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js': [
      function(require, module, exports) {
        require('./_typed-array')(
          'Uint8',
          1,
          function(init) {
            return function Uint8ClampedArray(data, byteOffset, length) {
              return init(this, data, byteOffset, length)
            }
          },
          true
        )
      },
      {'./_typed-array': '../node_modules/core-js/modules/_typed-array.js'},
    ],
    '../node_modules/core-js/fn/typed/uint8-clamped-array.js': [
      function(require, module, exports) {
        require('../../modules/es6.typed.uint8-clamped-array')
        module.exports = require('../../modules/_core').Uint8ClampedArray
      },
      {
        '../../modules/es6.typed.uint8-clamped-array':
          '../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js',
        '../../modules/_core': '../node_modules/core-js/modules/_core.js',
      },
    ],
    'index.js': [
      function(require, module, exports) {
        var define
        function _typeof(obj) {
          if (
            typeof Symbol === 'function' &&
            typeof Symbol.iterator === 'symbol'
          ) {
            _typeof = function _typeof(obj) {
              return typeof obj
            }
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === 'function' &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj
            }
          }
          return _typeof(obj)
        }

        /* globals define: true, module: true */
        ;(function() {
          'use strict'

          var root = Function('return this')() // eslint-disable-line

          var FileReader = root.FileReader
          var Promise = root.Promise
          var _Symbol = root.Symbol
          var toStringTag = _Symbol && _Symbol.toStringTag
          var Blob = root.Blob
          var File = root.File
          var Image = root.Image
          var createImageBitmap = root.createImageBitmap
          var atob = root.atob
          var URL = root.URL || root.webkitURL
          var parseJSON = JSON.parse.bind(JSON)
          var fetch = window.fetch
          var OffscreenCanvas = root.OffscreenCanvas
          var DOMParser = root.DOMParser
          var XMLSerializer = root.XMLSerializer
          var push = Array.prototype.push
          var slice = Array.prototype.slice
          var toString = Object.prototype.toString
          var fromCharCode = String.fromCharCode
          var CURRY_SIDE_START = 'start'
          var CURRY_SIDE_END = 'end'
          var base64DataURLPattern = /^data:(.*?)?;base64,(.+)$/
          var moduleName = 'PromisifyFile'
          var fileReaderSupportedDataTypes = [
            'ArrayBuffer',
            'Text',
            'DataURL',
            'BinaryString',
          ]
          var arrayBufferViews = [
            'Int8Array',
            'Uint8Array',
            'Uint8ClampedArray',
            'Int16Array',
            'Uint16Array',
            'Int32Array',
            'Uint32Array',
            'Float32Array',
            'Float64Array',
            'DataView',
          ]
          var MIME_TYPES = {
            xml: 'application/xml',
            svg: 'image/svg+xml',
            html: 'text/html',
          }
          var XHR_RESPONSE_TYPES = {
            none: '',
            text: 'text',
            json: 'json',
            document: 'document',
          }
          var DEFAULT_TEXT_ENCODING = 'UTF-8'
          var FILEREADER_METHOD_PREFIX = 'readAs'
          var imageLoadError = new Error('GET image failed.')
          var xmlhttpLoadError = new Error('XMLHttpRequest load failed.')
          var xmlhttpTimeoutError = new Error('XMLHttpRequest timeout.')
          var prepend = curry.bind(null, CURRY_SIDE_START) // var prepend = curry(CURRY_SIDE_START, curry, CURRY_SIDE_START)

          var append = prepend(curry, CURRY_SIDE_END)
          var supports = {
            // ie don't support DataView As Blob parts
            blobConstructorWithDataView: (function() {
              try {
                var arrayBuffer = new ArrayBuffer()
                var dataView = new DataView(arrayBuffer)
                var blob = new Blob([dataView])
                return isObject(blob)
              } catch (err) {
                return false
              }
            })(),
            // is do't support File Constructor
            fileConstructor: (function() {
              try {
                var file = new File([], '')
                return isObject(file)
              } catch (err) {
                return false
              }
            })(),
            offscreenCanvas: isFunction(OffscreenCanvas),
            readAsBinaryString: FileReader.prototype.readAsBinaryString,
          }

          function isObject(x) {
            return x !== null && _typeof(x) === 'object'
          }

          function isFunction(x) {
            return typeof x === 'function'
          }

          function isThenAble(x) {
            return isObject(x) && isFunction(x.then)
          }

          function isCanvas(x) {
            return isObject(x) && isFunction(x.getContext)
          } // function isHTMLCanvasElement(x) {
          //   return isCanvas(x) && getType(x) === 'HTMLCanvasElement'
          // }
          // function isOffscreenCanvas(x) {
          //   return isCanvas(x) && getType(x) === 'OffscreenCanvas'
          // }

          function isRenderingContext(x) {
            return isObject(x) && isCanvas(x.canvas)
          }

          function isArrayBuffer(x) {
            return isObject(x) && getType(x) === 'ArrayBuffer'
          }

          function isDocument(x) {
            return (
              isObject(x) &&
              isObject(x.documentElement) &&
              isFunction(x.createElement)
            )
          } // ie DataView.toString is [object Object]

          function isDataView(x) {
            // can't do ArrayBuffer.isView check on ie 10
            return isObject(x) && isArrayBuffer(x.buffer)
          } // whatwg-fetch polyfilled fetch Symbol.toString is not current

          function isBody(x) {
            return (
              isObject(x) &&
              isFunction(x.arrayBuffer) &&
              isFunction(x.blob) &&
              isFunction(x.formData) &&
              isFunction(x.json) &&
              isFunction(x.text)
            )
          }

          function getType(x) {
            return toString.call(x).slice(8, -1)
          }

          function on(obj, type, listener, options) {
            obj.addEventListener(type, listener, options || false)
          }

          function promisify(func) {
            function promised() {
              var args = arguments
              var context = this
              return new Promise(function(resolve, reject) {
                var result = apply(
                  prepend(func, resolve, reject),
                  context,
                  args
                )

                if (typeof result !== 'undefined') {
                  resolve(result)
                }
              })
            }

            return promised
          }
          /**
           * Faster apply
           * Call is faster than apply, optimize less than 4 args
           *
           * @param  {Function} func
           * @param  {any} context
           * @param  {Array} args
           */

          function apply(func, context, args) {
            switch (args.length) {
              case 0:
                return func.call(context)

              case 1:
                return func.call(context, args[0])

              case 2:
                return func.call(context, args[0], args[1])

              case 3:
                return func.call(context, args[0], args[1], args[2])

              default:
                return func.apply(context, args)
            }
          }
          /**
           * Simple memoize
           * internal use only
           * func should accept 0 / 1 argument and argument only primitive
           * func should return primitive value or function
           *
           * @param  {Function} func
           * @returns {Function}
           */

          function memoize(func) {
            var cache = {}

            function memoized(first) {
              var key = first

              if (!cache[key]) {
                cache[key] = apply(func, this, arguments)
              }

              return cache[key]
            }

            return memoized
          }
          /**
           * Simple curry
           * internal use only
           * returns a function accept argumentst
           *
           * @param  {String} side (start | end)
           * @param  {Function} func
           * @returns  {Function}
           */

          function curry(side, func) {
            var rest = slice.call(arguments, 2)

            function curried() {
              var args =
                side === CURRY_SIDE_END
                  ? concat(arguments, rest)
                  : concat(rest, arguments)
              return apply(func, this, args)
            }

            return curried
          }
          /**
           * concat two ArrayLike
           *
           * @param  {ArrayLike} first
           * @param  {ArrayLike} second
           * @returns  {Array}
           */

          function concat(first, second) {
            var arr = []
            apply(push, arr, first)
            apply(push, arr, second)
            return arr
          }
          /**
           * camelcase
           * lowercase first letter
           *
           * @param  {String} s
           * @returns  {String}
           */

          var camelcase = memoize(function camelcase(s) {
            return s[0].toLowerCase() + s.slice(1)
          })
          /**
           * umdExport
           * export mod as name
           *
           * @param  {String} name
           * @param  {any} mod
           * @returns  {any}
           */

          function umdExport(mod) {
            if (isFunction(define) && define.amd) {
              define(moduleName, [], function() {
                return mod
              })
            } else if (isObject(module) && module.exports) {
              module.exports = mod
            } else {
              root[moduleName] = mod
            }

            return mod
          }

          var constructFile = supports.fileConstructor
            ? function(parts, fileName, options) {
                return new File(parts, fileName, options)
              } // use Blob as as fake File
            : function(parts, fileName, options) {
                var blob = new Blob(parts, options)
                blob.name = fileName
                blob.lastModified = options.lastModified || Date.now()
                return blob
              }
          var waitForImage = promisify(function waitForImage(
            resolve,
            reject,
            image
          ) {
            if (image.naturalWidth) {
              return resolve(image)
            }

            on(image, 'load', function() {
              resolve(image)
            })
            on(image, 'error', function() {
              resolve(imageLoadError)
            })
          })
          var waitForFileReader = promisify(function waitForFileReader(
            resolve,
            reject,
            fileReader
          ) {
            if (fileReader.result) {
              return resolve(fileReader.result)
            }

            if (fileReader.error) {
              return reject(fileReader.error)
            }

            on(fileReader, 'load', function() {
              resolve(fileReader.result)
            })
            on(fileReader, 'error', function() {
              reject(fileReader.error)
            })
          })
          var waitForXMLHttpRequest = promisify(function waitForXMLHttpRequest(
            resolve,
            reject,
            xhr
          ) {
            if (xhr.readyState === 4) {
              return resolve(parseXHRData(xhr))
            }

            on(xhr, 'load', function() {
              resolve(parseXHRData(xhr))
            })
            on(xhr, 'error', function() {
              reject(xmlhttpLoadError)
            })
            on(xhr, 'timeout', function() {
              reject(xmlhttpTimeoutError)
            })
          })

          function parseBase64DataURL(url) {
            var matches = String(url).match(base64DataURLPattern)

            if (!matches) {
              return
            }

            var mimeType = matches[1]
            var bin = atob(matches[2])
            var i = 0
            var length = bin.length
            var uint8Array = new Uint8Array(length)

            for (; i < length; i++) {
              uint8Array[i] = bin.charCodeAt(i)
            }

            return new Blob([uint8Array], {
              type: mimeType,
            })
          }

          function PromisifyFile(data, options) {
            options = options || {}
            var blob = data
            var type = options.type || data.type
            var name = options.name || data.name
            var lastModified = options.lastModified || data.lastModified

            if (
              type !== data.type ||
              name !== data.name ||
              lastModified !== data.lastModified
            ) {
              if (name) {
                blob = constructFile([data], name, {
                  type: type,
                  lastModified: lastModified,
                })
              } else {
                blob = new Blob([data], {
                  type: type,
                })
              }
            }

            this.$store = {
              orignal: data,
              blob: blob,
            }
            this.$options = options
          }

          var proto = PromisifyFile.prototype // use FileReader `readAs...` method

          function arrayBufferToBinaryString(buffer) {
            var bytes = new Uint8Array(buffer)
            return apply(fromCharCode, String, bytes)
          }

          function readFile(method, blob, encoding) {
            var fileReader = new FileReader()
            var args = concat([blob], encoding ? [encoding] : [])
            apply(method, fileReader, args)
            return waitForFileReader(fileReader)
          }

          var getFileReader = memoize(function getFileReader(dataType) {
            var method =
              FileReader.prototype[FILEREADER_METHOD_PREFIX + dataType]
            return prepend(readFile, method)
          })

          function getFileReaderResult(fileReader, dataType, encoding) {
            var store = this.$store
            var storeKey = camelcase(dataType)

            if (dataType === 'Text') {
              encoding = encoding || this.$options.encoding
              storeKey +=
                '.' + String(encoding || DEFAULT_TEXT_ENCODING).toUpperCase()
            }

            if (!store[storeKey]) {
              // ie don't support readAsBinaryString
              if (dataType === 'BinaryString' && !supports.readAsBinaryString) {
                store[storeKey] = this.arrayBuffer().then(
                  arrayBufferToBinaryString
                )
              } else {
                store[storeKey] = fileReader(this.$store.blob, encoding)
              }
            }

            return store[storeKey]
          }

          fileReaderSupportedDataTypes.forEach(function(dataType) {
            var fileReader = getFileReader(dataType)
            proto[camelcase(dataType)] = prepend(
              getFileReaderResult,
              fileReader,
              dataType
            )
          })

          function arrayBufferToView(TypedArray, buffer, byteOffset, length) {
            return new TypedArray(buffer, byteOffset, length)
          }

          var getArrayBufferParser = memoize(function getDOMParser(viewType) {
            var TypedArray = root[viewType]
            return prepend(arrayBufferToView, TypedArray)
          })

          function toArrayBufferView(parser, byteOffset, length) {
            parser = append(parser, byteOffset, length)
            return this.arrayBuffer().then(parser)
          } // get getArrayBufferView

          arrayBufferViews.forEach(function(viewType) {
            var parser = getArrayBufferParser(viewType)
            proto[camelcase(viewType)] = prepend(toArrayBufferView, parser)
          }) // get `Blob`

          proto.blob = function(options) {
            var blob = new Blob([this.$store.blob], options || this.$store.blob)
            return Promise.resolve(blob)
          } // get `File`

          proto.file = function(name, options) {
            var file = constructFile(
              [this.$store.blob],
              name || this.$store.blob.name,
              options || this.$store.blob
            )
            return Promise.resolve(file)
          }

          proto.json = function(encoding, reviver) {
            var parser = append(parseJSON, reviver)
            return this.text(encoding || this.$options.encoding).then(parser)
          } // get `URL`

          proto.url = function() {
            var url = URL.createObjectURL(this.$store.blob)
            return Promise.resolve(url)
          } // load as a `HTMLImageElement`

          function loadImage(src) {
            var image = new Image()
            image.src = src
            return waitForImage(image)
          }

          proto.image = function() {
            return this.dataURL().then(loadImage)
          } // get `ImageBitmap`

          proto.imageBitmap = function() {
            return apply(
              createImageBitmap,
              root,
              concat([this.$store.blob], arguments)
            )
          }

          var getRenderingContext2D = supports.offscreenCanvas
            ? function getOffscreenCanvasRenderingContext2D(width, height) {
                var canvas = new OffscreenCanvas(width, height)
                return canvas.getContext('2d')
              }
            : function getCanvasRenderingContext2D(width, height) {
                var canvas = root.document.createElement('canvas')
                canvas.width = width
                canvas.height = height
                return canvas.getContext('2d')
              }

          function drawImage(image) {
            var context = getRenderingContext2D(
              image.naturalWidth || image.width,
              image.naturalHeight || image.height
            )
            context.drawImage(image, 0, 0)
            return context
          }

          function putImageData(data) {
            var context = getRenderingContext2D(data.width, data.height)
            context.putImageData(data, 0, 0)
            return context
          }

          function getImageData(image, sx, sy, sw, sh) {
            sx = sx || 0
            sy = sy || 0
            sw = sw || image.naturalWidth || image.width
            sh = sh || image.naturalHeight || image.height
            var context = drawImage(image)
            return context.getImageData(sx, sy, sw, sh)
          }

          proto.imageData = function(sx, sy, sw, sh) {
            var parser = append(getImageData, sx, sy, sw, sh)
            return this.image().then(parser)
          } // DOMParser

          function throwParserError(document) {
            var parserError = document.getElementsByTagName('parsererror')[0]

            if (parserError) {
              throw new Error(parserError.innerText || parserError.textContent)
            }

            return document
          }

          function textToDocument(text, mimeType) {
            var parser = new DOMParser()
            var document = parser.parseFromString(text, mimeType)
            throwParserError(document)
            return document
          }

          var getDOMParser = memoize(function getDOMParser(mimeType) {
            return append(textToDocument, mimeType)
          })

          function toDocument(encoding, mimeType) {
            encoding = encoding || this.$options.encoding
            mimeType = mimeType || this.$store.blob.type
            var parser = getDOMParser(mimeType)
            return this.text(encoding).then(parser)
          }

          proto.document = toDocument
          proto.xml = append(toDocument, MIME_TYPES.xml)
          proto.svg = append(toDocument, MIME_TYPES.svg)
          proto.html = append(toDocument, MIME_TYPES.html)

          function parseXHRData(xhr) {
            switch (xhr.responseType) {
              case XHR_RESPONSE_TYPES.none:
              case XHR_RESPONSE_TYPES.text:
                return xhr.responseText

              case XHR_RESPONSE_TYPES.json:
                return JSON.stringify(xhr.response)

              case XHR_RESPONSE_TYPES.document:
                return xhr.responseXML

              default:
                return xhr.response
            }
          }

          function documentToString(document) {
            return (
              document.documentElement.outerHTML ||
              new XMLSerializer().serializeToString(document)
            )
          }

          var canvasToBlob = promisify(function(
            resolve,
            reject,
            canvas,
            type,
            quality
          ) {
            if (canvas.toBlob) {
              canvas.toBlob(resolve, type, quality)
              return
            }

            var url = canvas.toDataURL(type, quality)
            var blob = parseBase64DataURL(url)
            return resolve(blob)
          })

          function parseFromData(data, options) {
            var parser = append(parseFromData, options) // Promise

            if (isThenAble(data)) {
              return data.then(parser)
            }

            var type = getType(data)

            if (type === 'Blob' || type === 'File') {
              return data
            }

            if (type === 'XMLHttpRequest') {
              return waitForXMLHttpRequest(data).then(parser)
            }

            if (type === 'HTMLImageElement') {
              return waitForImage(data)
                .then(drawImage)
                .then(parser)
            }

            if (type === 'ImageBitmap') {
              return parser(drawImage(data))
            }

            if (type === 'ImageData') {
              return parser(putImageData(data))
            }

            if (type === 'FileReader') {
              return waitForFileReader(data).then(parser)
            }

            if (isBody(data)) {
              return data.blob()
            }

            if (isDocument(data)) {
              return parser(documentToString(data))
            } // HTMLCanvasElement

            if (type === 'HTMLCanvasElement') {
              return canvasToBlob(data, options.type, options.quality)
            } // OffscreenCanvas

            if (type === 'OffscreenCanvas') {
              return data.convertToBlob(options)
            } // RenderingContext

            if (isRenderingContext(data)) {
              return parser(data.canvas)
            }

            if (base64DataURLPattern.test(data)) {
              try {
                var blob = parseBase64DataURL(data)

                if (blob) {
                  return blob
                }
              } catch (err) {}
            }

            if (/^(?:blob|data):/.test(data)) {
              return fetch(data).then(parser)
            }

            if (!supports.blobConstructorWithDataView && isDataView(data)) {
              return parser(data.buffer)
            } // if (type === 'ArrayBuffer' || ArrayBuffer.isView(data)) {
            //   return new Blob([data])
            // }

            return new Blob([data], options)
          }

          function getInstance(blob, options) {
            return new PromisifyFile(blob, options)
          }

          if (toStringTag) {
            proto[toStringTag] = moduleName
          }

          PromisifyFile.from = function parseData(data, options) {
            options = options || {}
            var blob = parseFromData(data, options)
            var promise = isThenAble(blob) ? blob : Promise.resolve(blob)
            var toInstance = append(getInstance, options)
            return promise.then(toInstance)
          }

          return umdExport(PromisifyFile)
        })()
      },
      {},
    ],
    'test.js': [
      function(require, module, exports) {
        function asyncGeneratorStep(
          gen,
          resolve,
          reject,
          _next,
          _throw,
          key,
          arg
        ) {
          try {
            var info = gen[key](arg)
            var value = info.value
          } catch (error) {
            reject(error)
            return
          }
          if (info.done) {
            resolve(value)
          } else {
            Promise.resolve(value).then(_next, _throw)
          }
        }

        function _asyncToGenerator(fn) {
          return function() {
            var self = this,
              args = arguments
            return new Promise(function(resolve, reject) {
              var gen = fn.apply(self, args)
              function _next(value) {
                asyncGeneratorStep(
                  gen,
                  resolve,
                  reject,
                  _next,
                  _throw,
                  'next',
                  value
                )
              }
              function _throw(err) {
                asyncGeneratorStep(
                  gen,
                  resolve,
                  reject,
                  _next,
                  _throw,
                  'throw',
                  err
                )
              }
              _next(undefined)
            })
          }
        }

        window.regeneratorRuntime = require('regenerator-runtime')

        if (!window.Promise) {
          require('core-js/es6/promise')
        }

        if (!window.fetch) {
          require('whatwg-fetch')
        }

        if (!window.Uint8ClampedArray) {
          require('core-js/fn/typed/uint8-clamped-array')
        }

        var PromisifyFile = require('./index.js')

        var testText = 'hello promisify-file'
        var imageArr = [
          137,
          80,
          78,
          71,
          13,
          10,
          26,
          10,
          0,
          0,
          0,
          13,
          73,
          72,
          68,
          82,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          1,
          8,
          6,
          0,
          0,
          0,
          31,
          21,
          196,
          137,
          0,
          0,
          0,
          11,
          73,
          68,
          65,
          84,
          24,
          87,
          99,
          96,
          0,
          2,
          0,
          0,
          5,
          0,
          1,
          170,
          213,
          200,
          81,
          0,
          0,
          0,
          0,
          73,
          69,
          78,
          68,
          174,
          66,
          96,
          130,
        ]

        var getFile = (function() {
          function testFileSupport() {
            try {
              new File([], 'test') // eslint-disable-line
            } catch (err) {
              return false
            }

            return true
          }

          var getFile = function getFile(parts, fileName, options) {
            return new File(parts, fileName, options)
          }

          var supportNewFile = testFileSupport()

          if (!supportNewFile) {
            getFile = function getFile(parts, fileName, options) {
              var blob = new Blob(parts, options)
              blob.name = fileName
              blob.lastModified = options.lastModified || Date.now()
              return blob
            }
          }

          return getFile
        })()

        _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee46() {
            var ts,
              imageBIN,
              textFile,
              textBlob,
              imageFile,
              xmlBlob,
              xmlFile,
              htmlFile,
              svgFile,
              textFilePf,
              textBlobPf,
              imagePf,
              container,
              showResult,
              test,
              isPF,
              _isPF,
              ibrc

            return regeneratorRuntime.wrap(
              function _callee46$(_context46) {
                while (1) {
                  switch ((_context46.prev = _context46.next)) {
                    case 0:
                      _isPF = function _ref49() {
                        _isPF = _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee45(x, type) {
                            var file, img, text
                            return regeneratorRuntime.wrap(
                              function _callee45$(_context45) {
                                while (1) {
                                  switch ((_context45.prev = _context45.next)) {
                                    case 0:
                                      if (x instanceof PromisifyFile) {
                                        _context45.next = 2
                                        break
                                      }

                                      return _context45.abrupt('return', false)

                                    case 2:
                                      _context45.next = 4
                                      return x.binaryString()

                                    case 4:
                                      _context45.t0 = _context45.sent.length

                                      if (!(_context45.t0 < 1)) {
                                        _context45.next = 7
                                        break
                                      }

                                      return _context45.abrupt('return', false)

                                    case 7:
                                      if (!(type === 'img')) {
                                        _context45.next = 15
                                        break
                                      }

                                      _context45.next = 10
                                      return x.file('new.png', {
                                        type: 'image/png',
                                      })

                                    case 10:
                                      file = _context45.sent
                                      _context45.next = 13
                                      return new PromisifyFile(file).image()

                                    case 13:
                                      img = _context45.sent
                                      return _context45.abrupt(
                                        'return',
                                        img.width === 1
                                      )

                                    case 15:
                                      if (!(type === 'text')) {
                                        _context45.next = 20
                                        break
                                      }

                                      _context45.next = 18
                                      return x.text()

                                    case 18:
                                      text = _context45.sent
                                      return _context45.abrupt(
                                        'return',
                                        text === testText
                                      )

                                    case 20:
                                      if (!(type === 'xml')) {
                                        _context45.next = 25
                                        break
                                      }

                                      _context45.next = 23
                                      return x.text()

                                    case 23:
                                      text = _context45.sent
                                      return _context45.abrupt(
                                        'return',
                                        text[0] === '<' &&
                                          text[text.length - 1] === '>'
                                      )

                                    case 25:
                                      return _context45.abrupt('return', true)

                                    case 26:
                                    case 'end':
                                      return _context45.stop()
                                  }
                                }
                              },
                              _callee45,
                              this
                            )
                          })
                        )
                        return _isPF.apply(this, arguments)
                      }

                      isPF = function _ref48(_x, _x2) {
                        return _isPF.apply(this, arguments)
                      }

                      test = function _ref47(testDesc, fn, expect) {
                        var tr = document.createElement('tr')
                        var testTd = document.createElement('td')
                        testTd.innerText = testDesc
                        var resultTd = document.createElement('td')
                        resultTd.innerText = 'running'
                        var setResult = showResult(testDesc, resultTd, expect)

                        try {
                          var result = fn()

                          if (result.then) {
                            result.then(setResult, setResult)
                          } else {
                            setResult(result)
                          }
                        } catch (err) {
                          setResult(err)
                        }

                        tr.appendChild(testTd)
                        tr.appendChild(resultTd)
                        container.appendChild(tr)
                      }

                      showResult = function _ref46(testDesc, td, expect) {
                        if (typeof expect === 'undefined') {
                          expect = true
                        }

                        return function(result) {
                          console.assert(
                            result === expect,
                            testDesc,
                            result,
                            expect
                          )

                          if (result === expect) {
                            td.innerHTML = '<span class="pass">pass ✓</span>'
                          } else {
                            console.log(result, expect)
                            td.innerHTML = '<span class="fail">fail ✖</span>'
                          }
                        }
                      }

                      ts = Date.now()
                      imageBIN = imageArr
                        .map(function(chr) {
                          return String.fromCharCode(chr)
                        })
                        .join('')
                      textFile = getFile([testText], 'pf.txt', {
                        type: 'text/plain',
                      })
                      textBlob = new Blob([testText])
                      imageFile = getFile(
                        [new Int8Array(imageArr).buffer],
                        'pf.png',
                        {
                          type: 'image/png',
                        }
                      )
                      xmlBlob = new Blob([
                        '<xml><hello>promisify-file</hello></xml>',
                      ])
                      xmlFile = getFile(
                        ['<xml><hello>promisify-file</hello></xml>'],
                        'pf.xml',
                        {
                          type: 'text/xml',
                        }
                      )
                      htmlFile = getFile(
                        [
                          '<!DOCTYPE html><html lang="en"><head></head><body></body></html>',
                        ],
                        'pf.html',
                        {
                          type: 'text/html',
                        }
                      )
                      svgFile = getFile(
                        ['<svg xmlns="http://www.w3.org/2000/svg"></svg>'],
                        'pf.svg',
                        {
                          type: 'image/svg+xml',
                        }
                      )
                      _context46.next = 15
                      return PromisifyFile.from(fetch('./fixture/text.txt'))

                    case 15:
                      textFilePf = _context46.sent
                      _context46.next = 18
                      return PromisifyFile.from(fetch('./fixture/text.txt'), {
                        name: 'text.txt',
                      })

                    case 18:
                      textBlobPf = _context46.sent
                      _context46.next = 21
                      return PromisifyFile.from(fetch('./fixture/image.png'), {
                        name: 'image.png',
                      })

                    case 21:
                      imagePf = _context46.sent
                      container = document.getElementById('js-result')
                      test(
                        'arrayBuffer',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee() {
                            return regeneratorRuntime.wrap(
                              function _callee$(_context) {
                                while (1) {
                                  switch ((_context.prev = _context.next)) {
                                    case 0:
                                      _context.next = 2
                                      return textFilePf.arrayBuffer()

                                    case 2:
                                      return _context.abrupt(
                                        'return',
                                        _context.sent.byteLength
                                      )

                                    case 3:
                                    case 'end':
                                      return _context.stop()
                                  }
                                }
                              },
                              _callee,
                              this
                            )
                          })
                        ),
                        testText.length
                      )
                      test(
                        'text',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee2() {
                            return regeneratorRuntime.wrap(
                              function _callee2$(_context2) {
                                while (1) {
                                  switch ((_context2.prev = _context2.next)) {
                                    case 0:
                                      _context2.next = 2
                                      return textFilePf.text()

                                    case 2:
                                      return _context2.abrupt(
                                        'return',
                                        _context2.sent
                                      )

                                    case 3:
                                    case 'end':
                                      return _context2.stop()
                                  }
                                }
                              },
                              _callee2,
                              this
                            )
                          })
                        ),
                        testText
                      )
                      test(
                        'dataURL',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee3() {
                            return regeneratorRuntime.wrap(
                              function _callee3$(_context3) {
                                while (1) {
                                  switch ((_context3.prev = _context3.next)) {
                                    case 0:
                                      _context3.next = 2
                                      return textFilePf.dataURL()

                                    case 2:
                                      return _context3.abrupt(
                                        'return',
                                        _context3.sent
                                      )

                                    case 3:
                                    case 'end':
                                      return _context3.stop()
                                  }
                                }
                              },
                              _callee3,
                              this
                            )
                          })
                        ),
                        'data:text/plain;base64,' + btoa(testText)
                      )
                      test(
                        '`Blob` dataURL',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee4() {
                            var url, text
                            return regeneratorRuntime.wrap(
                              function _callee4$(_context4) {
                                while (1) {
                                  switch ((_context4.prev = _context4.next)) {
                                    case 0:
                                      _context4.next = 2
                                      return textBlobPf.dataURL()

                                    case 2:
                                      url = _context4.sent
                                      text = btoa(testText)
                                      return _context4.abrupt(
                                        'return',
                                        url.slice(-text.length) === text
                                      )

                                    case 5:
                                    case 'end':
                                      return _context4.stop()
                                  }
                                }
                              },
                              _callee4,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'BinaryString',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee5() {
                            return regeneratorRuntime.wrap(
                              function _callee5$(_context5) {
                                while (1) {
                                  switch ((_context5.prev = _context5.next)) {
                                    case 0:
                                      _context5.next = 2
                                      return imagePf.binaryString()

                                    case 2:
                                      return _context5.abrupt(
                                        'return',
                                        _context5.sent
                                      )

                                    case 3:
                                    case 'end':
                                      return _context5.stop()
                                  }
                                }
                              },
                              _callee5,
                              this
                            )
                          })
                        ),
                        imageBIN
                      )
                      test(
                        'blob',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee6() {
                            var blob
                            return regeneratorRuntime.wrap(
                              function _callee6$(_context6) {
                                while (1) {
                                  switch ((_context6.prev = _context6.next)) {
                                    case 0:
                                      _context6.next = 2
                                      return imagePf.blob()

                                    case 2:
                                      blob = _context6.sent
                                      _context6.t0 = !blob.name

                                      if (!_context6.t0) {
                                        _context6.next = 12
                                        break
                                      }

                                      _context6.next = 7
                                      return imagePf.dataURL()

                                    case 7:
                                      _context6.t1 = _context6.sent
                                      _context6.next = 10
                                      return new PromisifyFile(blob).dataURL()

                                    case 10:
                                      _context6.t2 = _context6.sent
                                      _context6.t0 =
                                        _context6.t1 === _context6.t2

                                    case 12:
                                      return _context6.abrupt(
                                        'return',
                                        _context6.t0
                                      )

                                    case 13:
                                    case 'end':
                                      return _context6.stop()
                                  }
                                }
                              },
                              _callee6,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'file',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee7() {
                            var newFileName, file
                            return regeneratorRuntime.wrap(
                              function _callee7$(_context7) {
                                while (1) {
                                  switch ((_context7.prev = _context7.next)) {
                                    case 0:
                                      newFileName = Date.now() + '.png'
                                      _context7.next = 3
                                      return imagePf.file(newFileName)

                                    case 3:
                                      file = _context7.sent
                                      _context7.t0 = file.name === newFileName

                                      if (!_context7.t0) {
                                        _context7.next = 13
                                        break
                                      }

                                      _context7.next = 8
                                      return imagePf.dataURL()

                                    case 8:
                                      _context7.t1 = _context7.sent
                                      _context7.next = 11
                                      return new PromisifyFile(file).dataURL()

                                    case 11:
                                      _context7.t2 = _context7.sent
                                      _context7.t0 =
                                        _context7.t1 === _context7.t2

                                    case 13:
                                      return _context7.abrupt(
                                        'return',
                                        _context7.t0
                                      )

                                    case 14:
                                    case 'end':
                                      return _context7.stop()
                                  }
                                }
                              },
                              _callee7,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'json',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee8() {
                            var data, str, blob, pf
                            return regeneratorRuntime.wrap(
                              function _callee8$(_context8) {
                                while (1) {
                                  switch ((_context8.prev = _context8.next)) {
                                    case 0:
                                      data = {
                                        hello: ts,
                                      }
                                      str = JSON.stringify(data)
                                      blob = new Blob([str])
                                      pf = new PromisifyFile(blob)
                                      _context8.next = 6
                                      return pf.json()

                                    case 6:
                                      return _context8.abrupt(
                                        'return',
                                        _context8.sent.hello
                                      )

                                    case 7:
                                    case 'end':
                                      return _context8.stop()
                                  }
                                }
                              },
                              _callee8,
                              this
                            )
                          })
                        ),
                        ts
                      )
                      test(
                        'url',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee9() {
                            var url
                            return regeneratorRuntime.wrap(
                              function _callee9$(_context9) {
                                while (1) {
                                  switch ((_context9.prev = _context9.next)) {
                                    case 0:
                                      _context9.next = 2
                                      return imagePf.url()

                                    case 2:
                                      url = _context9.sent
                                      return _context9.abrupt(
                                        'return',
                                        url.slice(0, 5) === 'blob:'
                                      )

                                    case 4:
                                    case 'end':
                                      return _context9.stop()
                                  }
                                }
                              },
                              _callee9,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'image',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee10() {
                            var image
                            return regeneratorRuntime.wrap(
                              function _callee10$(_context10) {
                                while (1) {
                                  switch ((_context10.prev = _context10.next)) {
                                    case 0:
                                      _context10.next = 2
                                      return imagePf.image()

                                    case 2:
                                      image = _context10.sent
                                      return _context10.abrupt(
                                        'return',
                                        image.tagName === 'IMG' &&
                                          image.naturalHeight === 1 &&
                                          image.naturalWidth === 1
                                      )

                                    case 4:
                                    case 'end':
                                      return _context10.stop()
                                  }
                                }
                              },
                              _callee10,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'imageData',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee11() {
                            var imageData
                            return regeneratorRuntime.wrap(
                              function _callee11$(_context11) {
                                while (1) {
                                  switch ((_context11.prev = _context11.next)) {
                                    case 0:
                                      _context11.next = 2
                                      return imagePf.imageData()

                                    case 2:
                                      imageData = _context11.sent
                                      return _context11.abrupt(
                                        'return',
                                        imageData.data.length === 4
                                      )

                                    case 4:
                                    case 'end':
                                      return _context11.stop()
                                  }
                                }
                              },
                              _callee11,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'document',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee12() {
                            var pf, document, type
                            return regeneratorRuntime.wrap(
                              function _callee12$(_context12) {
                                while (1) {
                                  switch ((_context12.prev = _context12.next)) {
                                    case 0:
                                      _context12.next = 2
                                      return PromisifyFile.from(
                                        fetch('./fixture/xml.xml')
                                      )

                                    case 2:
                                      pf = _context12.sent
                                      _context12.next = 5
                                      return pf.document()

                                    case 5:
                                      document = _context12.sent
                                      type = Object.prototype.toString
                                        .call(document)
                                        .slice(8, -1)
                                      return _context12.abrupt(
                                        'return',
                                        type === 'XMLDocument' ||
                                          type === 'Document'
                                      )

                                    case 8:
                                    case 'end':
                                      return _context12.stop()
                                  }
                                }
                              },
                              _callee12,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'document(unsupported type)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee13() {
                            return regeneratorRuntime.wrap(
                              function _callee13$(_context13) {
                                while (1) {
                                  switch ((_context13.prev = _context13.next)) {
                                    case 0:
                                      _context13.prev = 0
                                      _context13.next = 3
                                      return new PromisifyFile(
                                        xmlBlob
                                      ).document()

                                    case 3:
                                      _context13.next = 8
                                      break

                                    case 5:
                                      _context13.prev = 5
                                      _context13.t0 = _context13['catch'](0)
                                      return _context13.abrupt(
                                        'return',
                                        _context13.t0 instanceof Error
                                      )

                                    case 8:
                                      return _context13.abrupt('return', false)

                                    case 9:
                                    case 'end':
                                      return _context13.stop()
                                  }
                                }
                              },
                              _callee13,
                              this,
                              [[0, 5]]
                            )
                          })
                        )
                      )
                      test(
                        'document(overridemime)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee14() {
                            var document, type
                            return regeneratorRuntime.wrap(
                              function _callee14$(_context14) {
                                while (1) {
                                  switch ((_context14.prev = _context14.next)) {
                                    case 0:
                                      _context14.next = 2
                                      return new PromisifyFile(
                                        htmlFile
                                      ).document('UTF-8', 'text/xml')

                                    case 2:
                                      document = _context14.sent
                                      type = Object.prototype.toString
                                        .call(document)
                                        .slice(8, -1)
                                      return _context14.abrupt(
                                        'return',
                                        type === 'XMLDocument' ||
                                          type === 'Document'
                                      )

                                    case 5:
                                    case 'end':
                                      return _context14.stop()
                                  }
                                }
                              },
                              _callee14,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'document(broken)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee15() {
                            return regeneratorRuntime.wrap(
                              function _callee15$(_context15) {
                                while (1) {
                                  switch ((_context15.prev = _context15.next)) {
                                    case 0:
                                      _context15.prev = 0
                                      _context15.next = 3
                                      return new PromisifyFile(
                                        new Blob(['x'])
                                      ).xml()

                                    case 3:
                                      _context15.next = 8
                                      break

                                    case 5:
                                      _context15.prev = 5
                                      _context15.t0 = _context15['catch'](0)
                                      return _context15.abrupt(
                                        'return',
                                        _context15.t0 instanceof Error ||
                                          Object.prototype.toString.call(
                                            _context15.t0
                                          ) === '[object DOMException]' // ie
                                      )

                                    case 8:
                                    case 'end':
                                      return _context15.stop()
                                  }
                                }
                              },
                              _callee15,
                              this,
                              [[0, 5]]
                            )
                          })
                        )
                      )
                      test(
                        'xml',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee16() {
                            var document, type
                            return regeneratorRuntime.wrap(
                              function _callee16$(_context16) {
                                while (1) {
                                  switch ((_context16.prev = _context16.next)) {
                                    case 0:
                                      _context16.next = 2
                                      return new PromisifyFile(xmlFile).xml()

                                    case 2:
                                      document = _context16.sent
                                      type = Object.prototype.toString
                                        .call(document)
                                        .slice(8, -1)
                                      return _context16.abrupt(
                                        'return',
                                        type === 'XMLDocument' ||
                                          type === 'Document'
                                      )

                                    case 5:
                                    case 'end':
                                      return _context16.stop()
                                  }
                                }
                              },
                              _callee16,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'svg',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee17() {
                            var document, type
                            return regeneratorRuntime.wrap(
                              function _callee17$(_context17) {
                                while (1) {
                                  switch ((_context17.prev = _context17.next)) {
                                    case 0:
                                      _context17.next = 2
                                      return new PromisifyFile(svgFile).svg()

                                    case 2:
                                      document = _context17.sent
                                      type = Object.prototype.toString
                                        .call(document)
                                        .slice(8, -1)
                                      return _context17.abrupt(
                                        'return',
                                        type === 'XMLDocument' ||
                                          type === 'Document' ||
                                          type === 'SVGSVGElement'
                                      )

                                    case 5:
                                    case 'end':
                                      return _context17.stop()
                                  }
                                }
                              },
                              _callee17,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'html',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee18() {
                            var document, type
                            return regeneratorRuntime.wrap(
                              function _callee18$(_context18) {
                                while (1) {
                                  switch ((_context18.prev = _context18.next)) {
                                    case 0:
                                      _context18.next = 2
                                      return new PromisifyFile(htmlFile).html()

                                    case 2:
                                      document = _context18.sent
                                      type = Object.prototype.toString
                                        .call(document)
                                        .slice(8, -1)
                                      return _context18.abrupt(
                                        'return',
                                        type === 'HTMLDocument' ||
                                          type === 'Document'
                                      )

                                    case 5:
                                    case 'end':
                                      return _context18.stop()
                                  }
                                }
                              },
                              _callee18,
                              this
                            )
                          })
                        )
                      )
                      ;[
                        'Int8Array',
                        'Uint8Array',
                        'Uint8ClampedArray',
                        'Int16Array',
                        'Uint16Array',
                        'Int32Array',
                        'Uint32Array',
                        'Float32Array', // 'Float64Array',
                        'DataView',
                      ].forEach(function(type) {
                        var method = type[0].toLowerCase() + type.slice(1)
                        test(
                          method,
                          /*#__PURE__*/
                          _asyncToGenerator(
                            /*#__PURE__*/
                            regeneratorRuntime.mark(function _callee19() {
                              var view, type2
                              return regeneratorRuntime.wrap(
                                function _callee19$(_context19) {
                                  while (1) {
                                    switch (
                                      (_context19.prev = _context19.next)
                                    ) {
                                      case 0:
                                        _context19.next = 2
                                        return imagePf[method]()

                                      case 2:
                                        view = _context19.sent
                                        type2 = Object.prototype.toString
                                          .call(view)
                                          .slice(8, -1) // ie

                                        if (
                                          type === 'DataView' &&
                                          type2 === 'Object' &&
                                          view.buffer
                                        ) {
                                          type2 = type
                                        }

                                        return _context19.abrupt(
                                          'return',
                                          type2
                                        )

                                      case 6:
                                      case 'end':
                                        return _context19.stop()
                                    }
                                  }
                                },
                                _callee19,
                                this
                              )
                            })
                          ),
                          type
                        )
                      })
                      test(
                        'PromisifyFile.from(blob)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee20() {
                            var pf
                            return regeneratorRuntime.wrap(
                              function _callee20$(_context20) {
                                while (1) {
                                  switch ((_context20.prev = _context20.next)) {
                                    case 0:
                                      _context20.next = 2
                                      return PromisifyFile.from(textBlob)

                                    case 2:
                                      pf = _context20.sent
                                      return _context20.abrupt(
                                        'return',
                                        isPF(pf, 'text')
                                      )

                                    case 4:
                                    case 'end':
                                      return _context20.stop()
                                  }
                                }
                              },
                              _callee20,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(file)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee21() {
                            var pf
                            return regeneratorRuntime.wrap(
                              function _callee21$(_context21) {
                                while (1) {
                                  switch ((_context21.prev = _context21.next)) {
                                    case 0:
                                      _context21.next = 2
                                      return PromisifyFile.from(textFile)

                                    case 2:
                                      pf = _context21.sent
                                      return _context21.abrupt(
                                        'return',
                                        isPF(pf, 'text')
                                      )

                                    case 4:
                                    case 'end':
                                      return _context21.stop()
                                  }
                                }
                              },
                              _callee21,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(XMLHttpRequest not loaded yet)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee22() {
                            var testURL, xmlhttp, pf
                            return regeneratorRuntime.wrap(
                              function _callee22$(_context22) {
                                while (1) {
                                  switch ((_context22.prev = _context22.next)) {
                                    case 0:
                                      testURL = './fixture/image.png'
                                      xmlhttp = new XMLHttpRequest()
                                      xmlhttp.open('get', testURL)
                                      xmlhttp.send()
                                      xmlhttp.responseType = 'blob'
                                      _context22.next = 7
                                      return PromisifyFile.from(xmlhttp)

                                    case 7:
                                      pf = _context22.sent
                                      return _context22.abrupt(
                                        'return',
                                        isPF(pf, 'img')
                                      )

                                    case 9:
                                    case 'end':
                                      return _context22.stop()
                                  }
                                }
                              },
                              _callee22,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(XMLHttpRequest loaded)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee23() {
                            var testURL, xmlhttp, pf
                            return regeneratorRuntime.wrap(
                              function _callee23$(_context23) {
                                while (1) {
                                  switch ((_context23.prev = _context23.next)) {
                                    case 0:
                                      testURL = './fixture/image.png'
                                      _context23.next = 3
                                      return new Promise(function(reslove) {
                                        var xmlhttp = new XMLHttpRequest()
                                        xmlhttp.open('get', testURL)
                                        xmlhttp.send()
                                        xmlhttp.responseType = 'blob'

                                        xmlhttp.onload = function() {
                                          if (
                                            xmlhttp.readyState === 4 &&
                                            xmlhttp.status === 200
                                          ) {
                                            reslove(xmlhttp)
                                          }
                                        }
                                      })

                                    case 3:
                                      xmlhttp = _context23.sent
                                      _context23.next = 6
                                      return PromisifyFile.from(xmlhttp)

                                    case 6:
                                      pf = _context23.sent
                                      return _context23.abrupt(
                                        'return',
                                        isPF(pf, 'img')
                                      )

                                    case 8:
                                    case 'end':
                                      return _context23.stop()
                                  }
                                }
                              },
                              _callee23,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(XMLHttpRequest none responseType)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee24() {
                            var testURL, xmlhttp, pf
                            return regeneratorRuntime.wrap(
                              function _callee24$(_context24) {
                                while (1) {
                                  switch ((_context24.prev = _context24.next)) {
                                    case 0:
                                      testURL = './fixture/text.txt'
                                      _context24.next = 3
                                      return new Promise(function(reslove) {
                                        var xmlhttp = new XMLHttpRequest()
                                        xmlhttp.open('get', testURL)
                                        xmlhttp.send()

                                        xmlhttp.onload = function() {
                                          if (
                                            xmlhttp.readyState === 4 &&
                                            xmlhttp.status === 200
                                          ) {
                                            reslove(xmlhttp)
                                          }
                                        }
                                      })

                                    case 3:
                                      xmlhttp = _context24.sent
                                      _context24.next = 6
                                      return PromisifyFile.from(xmlhttp)

                                    case 6:
                                      pf = _context24.sent
                                      return _context24.abrupt(
                                        'return',
                                        isPF(pf, 'text')
                                      )

                                    case 8:
                                    case 'end':
                                      return _context24.stop()
                                  }
                                }
                              },
                              _callee24,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(XMLHttpRequest responseType = text)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee25() {
                            var testURL, xmlhttp, pf
                            return regeneratorRuntime.wrap(
                              function _callee25$(_context25) {
                                while (1) {
                                  switch ((_context25.prev = _context25.next)) {
                                    case 0:
                                      testURL = './fixture/text.txt'
                                      _context25.next = 3
                                      return new Promise(function(reslove) {
                                        var xmlhttp = new XMLHttpRequest()
                                        xmlhttp.open('get', testURL)
                                        xmlhttp.send()
                                        xmlhttp.responseType = 'text'

                                        xmlhttp.onload = function() {
                                          if (
                                            xmlhttp.readyState === 4 &&
                                            xmlhttp.status === 200
                                          ) {
                                            reslove(xmlhttp)
                                          }
                                        }
                                      })

                                    case 3:
                                      xmlhttp = _context25.sent
                                      _context25.next = 6
                                      return PromisifyFile.from(xmlhttp)

                                    case 6:
                                      pf = _context25.sent
                                      return _context25.abrupt(
                                        'return',
                                        isPF(pf, 'text')
                                      )

                                    case 8:
                                    case 'end':
                                      return _context25.stop()
                                  }
                                }
                              },
                              _callee25,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(XMLHttpRequest responseType = arraybuffer)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee26() {
                            var testURL, xmlhttp, pf
                            return regeneratorRuntime.wrap(
                              function _callee26$(_context26) {
                                while (1) {
                                  switch ((_context26.prev = _context26.next)) {
                                    case 0:
                                      testURL = './fixture/image.png'
                                      _context26.next = 3
                                      return new Promise(function(reslove) {
                                        var xmlhttp = new XMLHttpRequest()
                                        xmlhttp.open('get', testURL)
                                        xmlhttp.send()
                                        xmlhttp.responseType = 'arraybuffer'

                                        xmlhttp.onload = function() {
                                          if (
                                            xmlhttp.readyState === 4 &&
                                            xmlhttp.status === 200
                                          ) {
                                            reslove(xmlhttp)
                                          }
                                        }
                                      })

                                    case 3:
                                      xmlhttp = _context26.sent
                                      _context26.next = 6
                                      return PromisifyFile.from(xmlhttp)

                                    case 6:
                                      pf = _context26.sent
                                      return _context26.abrupt(
                                        'return',
                                        isPF(pf, 'image')
                                      )

                                    case 8:
                                    case 'end':
                                      return _context26.stop()
                                  }
                                }
                              },
                              _callee26,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(XMLHttpRequest responseType = blob)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee27() {
                            var testURL, xmlhttp, pf
                            return regeneratorRuntime.wrap(
                              function _callee27$(_context27) {
                                while (1) {
                                  switch ((_context27.prev = _context27.next)) {
                                    case 0:
                                      testURL = './fixture/image.png'
                                      _context27.next = 3
                                      return new Promise(function(reslove) {
                                        var xmlhttp = new XMLHttpRequest()
                                        xmlhttp.open('get', testURL)
                                        xmlhttp.send()
                                        xmlhttp.responseType = 'blob'

                                        xmlhttp.onload = function() {
                                          if (
                                            xmlhttp.readyState === 4 &&
                                            xmlhttp.status === 200
                                          ) {
                                            reslove(xmlhttp)
                                          }
                                        }
                                      })

                                    case 3:
                                      xmlhttp = _context27.sent
                                      _context27.next = 6
                                      return PromisifyFile.from(xmlhttp)

                                    case 6:
                                      pf = _context27.sent
                                      return _context27.abrupt(
                                        'return',
                                        isPF(pf, 'image')
                                      )

                                    case 8:
                                    case 'end':
                                      return _context27.stop()
                                  }
                                }
                              },
                              _callee27,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(XMLHttpRequest responseType = document)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee28() {
                            var testURL, xmlhttp, pf
                            return regeneratorRuntime.wrap(
                              function _callee28$(_context28) {
                                while (1) {
                                  switch ((_context28.prev = _context28.next)) {
                                    case 0:
                                      testURL = './fixture/xml.xml'
                                      _context28.next = 3
                                      return new Promise(function(reslove) {
                                        var xmlhttp = new XMLHttpRequest()
                                        xmlhttp.open('get', testURL)
                                        xmlhttp.send()
                                        xmlhttp.responseType = 'document'

                                        xmlhttp.onload = function() {
                                          if (
                                            xmlhttp.readyState === 4 &&
                                            xmlhttp.status === 200
                                          ) {
                                            reslove(xmlhttp)
                                          }
                                        }
                                      })

                                    case 3:
                                      xmlhttp = _context28.sent
                                      _context28.next = 6
                                      return PromisifyFile.from(xmlhttp)

                                    case 6:
                                      pf = _context28.sent
                                      return _context28.abrupt(
                                        'return',
                                        isPF(pf, 'xml')
                                      )

                                    case 8:
                                    case 'end':
                                      return _context28.stop()
                                  }
                                }
                              },
                              _callee28,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(XMLHttpRequest responseType = json)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee29() {
                            var test, testURL, xmlhttp, pf
                            return regeneratorRuntime.wrap(
                              function _callee29$(_context29) {
                                while (1) {
                                  switch ((_context29.prev = _context29.next)) {
                                    case 0:
                                      test = 'world'
                                      testURL = './fixture/json.json'
                                      _context29.next = 4
                                      return new Promise(function(reslove) {
                                        var xmlhttp = new XMLHttpRequest()
                                        xmlhttp.open('get', testURL)
                                        xmlhttp.send()
                                        xmlhttp.responseType = 'json'

                                        xmlhttp.onload = function() {
                                          if (
                                            xmlhttp.readyState === 4 &&
                                            xmlhttp.status === 200
                                          ) {
                                            reslove(xmlhttp)
                                          }
                                        }
                                      })

                                    case 4:
                                      xmlhttp = _context29.sent
                                      _context29.next = 7
                                      return PromisifyFile.from(xmlhttp)

                                    case 7:
                                      pf = _context29.sent
                                      _context29.t0 = isPF(pf)

                                      if (!_context29.t0) {
                                        _context29.next = 15
                                        break
                                      }

                                      _context29.next = 12
                                      return pf.json()

                                    case 12:
                                      _context29.t1 = _context29.sent.hello
                                      _context29.t2 = test
                                      _context29.t0 =
                                        _context29.t1 === _context29.t2

                                    case 15:
                                      return _context29.abrupt(
                                        'return',
                                        _context29.t0
                                      )

                                    case 16:
                                    case 'end':
                                      return _context29.stop()
                                  }
                                }
                              },
                              _callee29,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(canvas)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee30() {
                            var pf
                            return regeneratorRuntime.wrap(
                              function _callee30$(_context30) {
                                while (1) {
                                  switch ((_context30.prev = _context30.next)) {
                                    case 0:
                                      _context30.next = 2
                                      return PromisifyFile.from(
                                        document.createElement('canvas')
                                      )

                                    case 2:
                                      pf = _context30.sent
                                      _context30.t0 = isPF(pf)

                                      if (!_context30.t0) {
                                        _context30.next = 9
                                        break
                                      }

                                      _context30.next = 7
                                      return pf.image()

                                    case 7:
                                      _context30.t1 = _context30.sent.width
                                      _context30.t0 = _context30.t1 === 300

                                    case 9:
                                      return _context30.abrupt(
                                        'return',
                                        _context30.t0
                                      )

                                    case 10:
                                    case 'end':
                                      return _context30.stop()
                                  }
                                }
                              },
                              _callee30,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(CanvasRenderingContext2D)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee31() {
                            var pf
                            return regeneratorRuntime.wrap(
                              function _callee31$(_context31) {
                                while (1) {
                                  switch ((_context31.prev = _context31.next)) {
                                    case 0:
                                      _context31.next = 2
                                      return PromisifyFile.from(
                                        document
                                          .createElement('canvas')
                                          .getContext('2d')
                                      )

                                    case 2:
                                      pf = _context31.sent
                                      _context31.t0 = isPF(pf)

                                      if (!_context31.t0) {
                                        _context31.next = 9
                                        break
                                      }

                                      _context31.next = 7
                                      return pf.image()

                                    case 7:
                                      _context31.t1 = _context31.sent.width
                                      _context31.t0 = _context31.t1 === 300

                                    case 9:
                                      return _context31.abrupt(
                                        'return',
                                        _context31.t0
                                      )

                                    case 10:
                                    case 'end':
                                      return _context31.stop()
                                  }
                                }
                              },
                              _callee31,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(canvas as jpeg)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee32() {
                            var pf
                            return regeneratorRuntime.wrap(
                              function _callee32$(_context32) {
                                while (1) {
                                  switch ((_context32.prev = _context32.next)) {
                                    case 0:
                                      _context32.next = 2
                                      return PromisifyFile.from(
                                        document.createElement('canvas'),
                                        {
                                          type: 'image/jpeg',
                                        }
                                      )

                                    case 2:
                                      pf = _context32.sent
                                      _context32.t1 = isPF(pf)

                                      if (!_context32.t1) {
                                        _context32.next = 9
                                        break
                                      }

                                      _context32.next = 7
                                      return pf.image()

                                    case 7:
                                      _context32.t2 = _context32.sent.width
                                      _context32.t1 = _context32.t2 === 300

                                    case 9:
                                      _context32.t0 = _context32.t1

                                      if (!_context32.t0) {
                                        _context32.next = 16
                                        break
                                      }

                                      _context32.next = 13
                                      return pf.dataURL()

                                    case 13:
                                      _context32.t3 = _context32.sent.indexOf(
                                        'jpeg'
                                      )
                                      _context32.t4 = -1
                                      _context32.t0 =
                                        _context32.t3 !== _context32.t4

                                    case 16:
                                      return _context32.abrupt(
                                        'return',
                                        _context32.t0
                                      )

                                    case 17:
                                    case 'end':
                                      return _context32.stop()
                                  }
                                }
                              },
                              _callee32,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(ArrayBuffer)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee33() {
                            var buffer, pf
                            return regeneratorRuntime.wrap(
                              function _callee33$(_context33) {
                                while (1) {
                                  switch ((_context33.prev = _context33.next)) {
                                    case 0:
                                      _context33.next = 2
                                      return imagePf.arrayBuffer()

                                    case 2:
                                      buffer = _context33.sent
                                      _context33.next = 5
                                      return PromisifyFile.from(buffer)

                                    case 5:
                                      pf = _context33.sent
                                      console.log(pf)
                                      return _context33.abrupt(
                                        'return',
                                        isPF(pf, 'img')
                                      )

                                    case 8:
                                    case 'end':
                                      return _context33.stop()
                                  }
                                }
                              },
                              _callee33,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(DataView)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee34() {
                            var view, pf
                            return regeneratorRuntime.wrap(
                              function _callee34$(_context34) {
                                while (1) {
                                  switch ((_context34.prev = _context34.next)) {
                                    case 0:
                                      _context34.next = 2
                                      return imagePf.dataView()

                                    case 2:
                                      view = _context34.sent
                                      _context34.next = 5
                                      return PromisifyFile.from(view)

                                    case 5:
                                      pf = _context34.sent
                                      return _context34.abrupt(
                                        'return',
                                        isPF(pf, 'img')
                                      )

                                    case 7:
                                    case 'end':
                                      return _context34.stop()
                                  }
                                }
                              },
                              _callee34,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(TypedArray)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee35() {
                            var view, pf
                            return regeneratorRuntime.wrap(
                              function _callee35$(_context35) {
                                while (1) {
                                  switch ((_context35.prev = _context35.next)) {
                                    case 0:
                                      _context35.next = 2
                                      return imagePf.uint8Array()

                                    case 2:
                                      view = _context35.sent
                                      _context35.next = 5
                                      return PromisifyFile.from(view)

                                    case 5:
                                      pf = _context35.sent
                                      return _context35.abrupt(
                                        'return',
                                        isPF(pf, 'img')
                                      )

                                    case 7:
                                    case 'end':
                                      return _context35.stop()
                                  }
                                }
                              },
                              _callee35,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(Response)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee36() {
                            var pf
                            return regeneratorRuntime.wrap(
                              function _callee36$(_context36) {
                                while (1) {
                                  switch ((_context36.prev = _context36.next)) {
                                    case 0:
                                      _context36.next = 2
                                      return PromisifyFile.from(
                                        new Response(imageFile)
                                      )

                                    case 2:
                                      pf = _context36.sent
                                      return _context36.abrupt(
                                        'return',
                                        isPF(pf, 'img')
                                      )

                                    case 4:
                                    case 'end':
                                      return _context36.stop()
                                  }
                                }
                              },
                              _callee36,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(Image)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee37() {
                            var img, pf
                            return regeneratorRuntime.wrap(
                              function _callee37$(_context37) {
                                while (1) {
                                  switch ((_context37.prev = _context37.next)) {
                                    case 0:
                                      img = new Image()
                                      _context37.next = 3
                                      return imagePf.url()

                                    case 3:
                                      img.src = _context37.sent
                                      _context37.next = 6
                                      return PromisifyFile.from(img)

                                    case 6:
                                      pf = _context37.sent
                                      return _context37.abrupt(
                                        'return',
                                        isPF(pf, 'img')
                                      )

                                    case 8:
                                    case 'end':
                                      return _context37.stop()
                                  }
                                }
                              },
                              _callee37,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(ImageData)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee38() {
                            var canvas, context, imageData, pf, img
                            return regeneratorRuntime.wrap(
                              function _callee38$(_context38) {
                                while (1) {
                                  switch ((_context38.prev = _context38.next)) {
                                    case 0:
                                      canvas = document.createElement('canvas')
                                      context = canvas.getContext('2d')
                                      context.fillRect(0, 0, 100, 100)
                                      imageData = context.getImageData(
                                        0,
                                        0,
                                        1,
                                        1
                                      )
                                      _context38.next = 6
                                      return PromisifyFile.from(imageData)

                                    case 6:
                                      pf = _context38.sent
                                      img = new Image()
                                      _context38.next = 10
                                      return pf.url()

                                    case 10:
                                      img.src = _context38.sent
                                      _context38.t0 = isPF(pf, 'img')

                                      if (!_context38.t0) {
                                        _context38.next = 17
                                        break
                                      }

                                      _context38.next = 15
                                      return pf.imageData()

                                    case 15:
                                      _context38.t1 = _context38.sent.data[3]
                                      _context38.t0 = _context38.t1 === 255

                                    case 17:
                                      return _context38.abrupt(
                                        'return',
                                        _context38.t0
                                      )

                                    case 18:
                                    case 'end':
                                      return _context38.stop()
                                  }
                                }
                              },
                              _callee38,
                              this
                            )
                          })
                        )
                      )
                      test(
                        'PromisifyFile.from(FileReader.readAsDataURL)',
                        /*#__PURE__*/
                        _asyncToGenerator(
                          /*#__PURE__*/
                          regeneratorRuntime.mark(function _callee39() {
                            var fr, pf
                            return regeneratorRuntime.wrap(
                              function _callee39$(_context39) {
                                while (1) {
                                  switch ((_context39.prev = _context39.next)) {
                                    case 0:
                                      fr = new FileReader()
                                      fr.readAsDataURL(imageFile)
                                      _context39.next = 4
                                      return PromisifyFile.from(fr)

                                    case 4:
                                      pf = _context39.sent
                                      return _context39.abrupt(
                                        'return',
                                        isPF(pf, 'img')
                                      )

                                    case 6:
                                    case 'end':
                                      return _context39.stop()
                                  }
                                }
                              },
                              _callee39,
                              this
                            )
                          })
                        )
                      )

                      if (window.OffscreenCanvas) {
                        test(
                          'PromisifyFile.from(OffscreenCanvas)',
                          /*#__PURE__*/
                          _asyncToGenerator(
                            /*#__PURE__*/
                            regeneratorRuntime.mark(function _callee40() {
                              var canvas, context, pf
                              return regeneratorRuntime.wrap(
                                function _callee40$(_context40) {
                                  while (1) {
                                    switch (
                                      (_context40.prev = _context40.next)
                                    ) {
                                      case 0:
                                        canvas = new OffscreenCanvas(1, 1)
                                        context = canvas.getContext('2d')
                                        context.fillRect(0, 0, 1, 1)
                                        _context40.next = 5
                                        return PromisifyFile.from(canvas)

                                      case 5:
                                        pf = _context40.sent
                                        return _context40.abrupt(
                                          'return',
                                          isPF(pf, 'img')
                                        )

                                      case 7:
                                      case 'end':
                                        return _context40.stop()
                                    }
                                  }
                                },
                                _callee40,
                                this
                              )
                            })
                          )
                        )
                        test(
                          'PromisifyFile.from(OffscreenCanvas as jpeg)',
                          /*#__PURE__*/
                          _asyncToGenerator(
                            /*#__PURE__*/
                            regeneratorRuntime.mark(function _callee41() {
                              var canvas, context, pf
                              return regeneratorRuntime.wrap(
                                function _callee41$(_context41) {
                                  while (1) {
                                    switch (
                                      (_context41.prev = _context41.next)
                                    ) {
                                      case 0:
                                        canvas = new OffscreenCanvas(1, 1)
                                        context = canvas.getContext('2d')
                                        context.fillRect(0, 0, 1, 1)
                                        _context41.next = 5
                                        return PromisifyFile.from(canvas, {
                                          type: 'image/jpeg',
                                        })

                                      case 5:
                                        pf = _context41.sent
                                        _context41.t0 = isPF(pf, 'img')

                                        if (!_context41.t0) {
                                          _context41.next = 11
                                          break
                                        }

                                        _context41.next = 10
                                        return pf.dataURL()

                                      case 10:
                                        _context41.t0 = _context41.sent.includes(
                                          'jpeg'
                                        )

                                      case 11:
                                        return _context41.abrupt(
                                          'return',
                                          _context41.t0
                                        )

                                      case 12:
                                      case 'end':
                                        return _context41.stop()
                                    }
                                  }
                                },
                                _callee41,
                                this
                              )
                            })
                          )
                        )
                      }

                      ibrc = document
                        .createElement('canvas')
                        .getContext('bitmaprenderer')

                      if (ibrc && ibrc.canvas) {
                        test(
                          'PromisifyFile.from(ImageBitmapRenderingContext)',
                          /*#__PURE__*/
                          _asyncToGenerator(
                            /*#__PURE__*/
                            regeneratorRuntime.mark(function _callee42() {
                              var pf
                              return regeneratorRuntime.wrap(
                                function _callee42$(_context42) {
                                  while (1) {
                                    switch (
                                      (_context42.prev = _context42.next)
                                    ) {
                                      case 0:
                                        _context42.next = 2
                                        return PromisifyFile.from(ibrc)

                                      case 2:
                                        pf = _context42.sent
                                        _context42.t0 = isPF(pf)

                                        if (!_context42.t0) {
                                          _context42.next = 9
                                          break
                                        }

                                        _context42.next = 7
                                        return pf.image()

                                      case 7:
                                        _context42.t1 = _context42.sent.width
                                        _context42.t0 = _context42.t1 === 300

                                      case 9:
                                        return _context42.abrupt(
                                          'return',
                                          _context42.t0
                                        )

                                      case 10:
                                      case 'end':
                                        return _context42.stop()
                                    }
                                  }
                                },
                                _callee42,
                                this
                              )
                            })
                          )
                        )
                      }

                      if (window.createImageBitmap) {
                        test(
                          'imageBitmap',
                          /*#__PURE__*/
                          _asyncToGenerator(
                            /*#__PURE__*/
                            regeneratorRuntime.mark(function _callee43() {
                              var imageBitmap
                              return regeneratorRuntime.wrap(
                                function _callee43$(_context43) {
                                  while (1) {
                                    switch (
                                      (_context43.prev = _context43.next)
                                    ) {
                                      case 0:
                                        _context43.next = 2
                                        return imagePf.imageBitmap()

                                      case 2:
                                        imageBitmap = _context43.sent
                                        return _context43.abrupt(
                                          'return',
                                          imageBitmap.height === 1 &&
                                            imageBitmap.width === 1
                                        )

                                      case 4:
                                      case 'end':
                                        return _context43.stop()
                                    }
                                  }
                                },
                                _callee43,
                                this
                              )
                            })
                          )
                        )
                        test(
                          'PromisifyFile.from(imageBitmap)',
                          /*#__PURE__*/
                          _asyncToGenerator(
                            /*#__PURE__*/
                            regeneratorRuntime.mark(function _callee44() {
                              var imageBitmap, pf, img
                              return regeneratorRuntime.wrap(
                                function _callee44$(_context44) {
                                  while (1) {
                                    switch (
                                      (_context44.prev = _context44.next)
                                    ) {
                                      case 0:
                                        _context44.next = 2
                                        return createImageBitmap(imageFile)

                                      case 2:
                                        imageBitmap = _context44.sent
                                        _context44.next = 5
                                        return PromisifyFile.from(imageBitmap)

                                      case 5:
                                        pf = _context44.sent
                                        img = new Image()
                                        _context44.next = 9
                                        return pf.url()

                                      case 9:
                                        img.src = _context44.sent
                                        return _context44.abrupt(
                                          'return',
                                          isPF(pf, 'img')
                                        )

                                      case 11:
                                      case 'end':
                                        return _context44.stop()
                                    }
                                  }
                                },
                                _callee44,
                                this
                              )
                            })
                          )
                        )
                      }

                    case 66:
                    case 'end':
                      return _context46.stop()
                  }
                }
              },
              _callee46,
              this
            )
          })
        )()
      },
      {
        'regenerator-runtime':
          '../node_modules/regenerator-runtime/runtime-module.js',
        'core-js/es6/promise': '../node_modules/core-js/es6/promise.js',
        'whatwg-fetch': '../node_modules/whatwg-fetch/fetch.js',
        'core-js/fn/typed/uint8-clamped-array':
          '../node_modules/core-js/fn/typed/uint8-clamped-array.js',
        './index.js': 'index.js',
      },
    ],
    '../node_modules/parcel-bundler/src/builtins/hmr-runtime.js': [
      function(require, module, exports) {
        var global = arguments[3]
        var OVERLAY_ID = '__parcel__error__overlay__'
        var OldModule = module.bundle.Module

        function Module(moduleName) {
          OldModule.call(this, moduleName)
          this.hot = {
            data: module.bundle.hotData,
            _acceptCallbacks: [],
            _disposeCallbacks: [],
            accept: function(fn) {
              this._acceptCallbacks.push(fn || function() {})
            },
            dispose: function(fn) {
              this._disposeCallbacks.push(fn)
            },
          }
          module.bundle.hotData = null
        }

        module.bundle.Module = Module
        var parent = module.bundle.parent

        if (
          (!parent || !parent.isParcelRequire) &&
          typeof WebSocket !== 'undefined'
        ) {
          var hostname = '' || location.hostname
          var protocol = location.protocol === 'https:' ? 'wss' : 'ws'
          var ws = new WebSocket(
            protocol + '://' + hostname + ':' + '9859' + '/'
          )

          ws.onmessage = function(event) {
            var data = JSON.parse(event.data)

            if (data.type === 'update') {
              console.clear()
              data.assets.forEach(function(asset) {
                hmrApply(global.parcelRequire, asset)
              })
              data.assets.forEach(function(asset) {
                if (!asset.isNew) {
                  hmrAccept(global.parcelRequire, asset.id)
                }
              })
            }

            if (data.type === 'reload') {
              ws.close()

              ws.onclose = function() {
                location.reload()
              }
            }

            if (data.type === 'error-resolved') {
              console.log('[parcel] ✨ Error resolved')
              removeErrorOverlay()
            }

            if (data.type === 'error') {
              console.error(
                '[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack
              )
              removeErrorOverlay()
              var overlay = createErrorOverlay(data)
              document.body.appendChild(overlay)
            }
          }
        }

        function removeErrorOverlay() {
          var overlay = document.getElementById(OVERLAY_ID)

          if (overlay) {
            overlay.remove()
          }
        }

        function createErrorOverlay(data) {
          var overlay = document.createElement('div')
          overlay.id = OVERLAY_ID // html encode message and stack trace

          var message = document.createElement('div')
          var stackTrace = document.createElement('pre')
          message.innerText = data.error.message
          stackTrace.innerText = data.error.stack
          overlay.innerHTML =
            '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' +
            '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' +
            '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' +
            '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' +
            message.innerHTML +
            '</div>' +
            '<pre>' +
            stackTrace.innerHTML +
            '</pre>' +
            '</div>'
          return overlay
        }

        function getParents(bundle, id) {
          var modules = bundle.modules

          if (!modules) {
            return []
          }

          var parents = []
          var k, d, dep

          for (k in modules) {
            for (d in modules[k][1]) {
              dep = modules[k][1][d]

              if (
                dep === id ||
                (Array.isArray(dep) && dep[dep.length - 1] === id)
              ) {
                parents.push(k)
              }
            }
          }

          if (bundle.parent) {
            parents = parents.concat(getParents(bundle.parent, id))
          }

          return parents
        }

        function hmrApply(bundle, asset) {
          var modules = bundle.modules

          if (!modules) {
            return
          }

          if (modules[asset.id] || !bundle.parent) {
            var fn = new Function(
              'require',
              'module',
              'exports',
              asset.generated.js
            )
            asset.isNew = !modules[asset.id]
            modules[asset.id] = [fn, asset.deps]
          } else if (bundle.parent) {
            hmrApply(bundle.parent, asset)
          }
        }

        function hmrAccept(bundle, id) {
          var modules = bundle.modules

          if (!modules) {
            return
          }

          if (!modules[id] && bundle.parent) {
            return hmrAccept(bundle.parent, id)
          }

          var cached = bundle.cache[id]
          bundle.hotData = {}

          if (cached) {
            cached.hot.data = bundle.hotData
          }

          if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
            cached.hot._disposeCallbacks.forEach(function(cb) {
              cb(bundle.hotData)
            })
          }

          delete bundle.cache[id]
          bundle(id)
          cached = bundle.cache[id]

          if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
            cached.hot._acceptCallbacks.forEach(function(cb) {
              cb()
            })

            return true
          }

          return getParents(global.parcelRequire, id).some(function(id) {
            return hmrAccept(global.parcelRequire, id)
          })
        }
      },
      {},
    ],
  },
  {},
  ['../node_modules/parcel-bundler/src/builtins/hmr-runtime.js', 'test.js'],
  null
)
//# sourceMappingURL=/test.e98b79dd.map
