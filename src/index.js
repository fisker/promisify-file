/* globals define: true, module: true */
;(function () {
  'use strict'

  var root = Function('return this')() // eslint-disable-line
  var FileReader = root.FileReader
  var dataTypes = [
    'ArrayBuffer',
    'Text',
    'DataURL',
    'BinaryString'
  ]

  function umdExport (name, mod) {
    if (typeof define === 'function' && define.amd) {
      define(name, [], function () {
        return mod
      })
    } else if (typeof module === 'object' && module.exports) {
      module.exports = mod
    } else {
      root[name] = mod
    }

    return mod
  }

  function readAsPromise (method, file, args) {
    var fileReader = new FileReader()

    return new Promise(function (resolve, reject) {
      fileReader.onload = function () {
        resolve(fileReader.result)
      }

      fileReader.onerror = function () {
        reject(fileReader.error)
      }

      if (args.length) {
        method.apply(fileReader, args)
      } else {
        method.call(fileReader, file)
      }
    })
  }

  function callMethod (methodName) {
    var method = FileReader.prototype[methodName]

    return function readAs () {
      var file = this.file
      return readAsPromise(
        method,
        file,
        arguments
      )
    }
  }

  function PromisifyFile (blob) {
    this.file = blob
  }

  dataTypes.forEach(function (type) {
    var readerMethod = 'readAs' + type
    var fileMethod = type[0].toLowerCase() + type.slice(1)
    PromisifyFile.prototype[fileMethod] = callMethod(readerMethod)
  })

  return umdExport('PromisifyFile', PromisifyFile)
})()