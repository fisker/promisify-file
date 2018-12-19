/* globals define: true, module: true */
;(function () {
  'use strict'

  var root = Function('return this')() // eslint-disable-line

  var FileReader = root.FileReader
  var Promise = root.Promise
  var Blob = root.Blob
  var File = root.File
  var Image = root.Image
  var createImageBitmap = root.createImageBitmap

  var URL = root.URL || root.webkitURL
  var createObjectURL = URL.createObjectURL.bind(URL)

  var concat = Array.prototype.concat

  var dataTypes = [
    'ArrayBuffer',
    'Text',
    'DataURL',
    'BinaryString'
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
    'DataView'
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

      apply(method, fileReader, prepend(file, args))
    })
  }

  function apply (method, context, args) {
    switch (args.length) {
      case 0:
        return method.call(context)
      case 1:
        return method.call(context, args[0])
      case 2:
        return method.call(context, args[0], args[1])
      default:
        return method.apply(context, args)
    }
  }

  function callFileReaderMethod (methodName) {
    var method = FileReader.prototype[methodName]

    return function readAs () {
      var file = this.$file
      return readAsPromise(
        method,
        file,
        arguments
      )
    }
  }

  function getArrayBufferView (TypedArray) {
    return function getArrayBufferView (byteOffset, length) {
      return this.arrayBuffer().then(function (buffer) {
        return new TypedArray(
          buffer,
          byteOffset,
          length
        )
      })
    }
  }

  function camelcase (s) {
    return s[0].toLowerCase() + s.slice(1)
  }

  function prepend (first, rest) {
    return apply(concat, [first], rest)
  }

  function loadImage (src) {
    return new Promise(function (resolve, reject) {
      var image = new Image()
      image.onload = function () {
        resolve(image)
      }
      image.onerror = function () {
        reject(new Error('GET image failed.'))
      }
      image.src = src
    })
  }

  function imageToImageBitmap (args) {
    return function (image) {
      return apply(createImageBitmap, root, prepend(image, args))
    }
  }

  function textToJSON (reviver) {
    return function (text) {
      return JSON.parse(text, reviver)
    }
  }

  function imageToImageData (sx, sy, sw, sh) {
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')

    return function (image) {
      var width = canvas.width = image.naturalWidth
      var height = canvas.height = image.naturalHeight
      context.drawImage(image, 0, 0, width, height)
      sx = sx || 0
      sy = sy || 0
      sw = sw || width
      sh = sh || height
      return context.getImageData(sx, sy, sw, sh)
    }
  }

  function PromisifyFile (blob) {
    this.$file = blob
  }

  // use FileReader `readAs...` method
  dataTypes.forEach(function (type) {
    var readerMethod = 'readAs' + type
    var fileMethod = camelcase(type)
    PromisifyFile.prototype[fileMethod] = callFileReaderMethod(readerMethod)
  })

  // get getArrayBufferView
  arrayBufferViews.forEach(function (type) {
    var fileMethod = camelcase(type)
    var TypedArray = window[type]
    PromisifyFile.prototype[fileMethod] = getArrayBufferView(TypedArray)
  })

  // get `Blob`
  PromisifyFile.prototype.blob = function (options) {
    var blob = new Blob([this.$file], options || this.$file)
    return Promise.resolve(blob)
  }

  // get `File`
  PromisifyFile.prototype.file = function (name, options) {
    var fileName = name || this.$file.name || 'blob'
    var file = new File([this.$file], fileName, options || this.$file)
    return Promise.resolve(file)
  }

  // parse text content to `JSON`
  PromisifyFile.prototype.json = function (reviver) {
    return this.text('UTF-8').then(textToJSON(reviver))
  }

  // get `URL`
  PromisifyFile.prototype.url = function () {
    return Promise.resolve(createObjectURL(this.$file))
  }

  // load as a `HTMLImageElement`
  PromisifyFile.prototype.image = function () {
    return this.dataURL().then(loadImage)
  }

  // get `ImageBitmap`
  PromisifyFile.prototype.imageBitmap = function () {
    return this.image().then(imageToImageBitmap(arguments))
  }

  // get `ImageData`
  PromisifyFile.prototype.imageData = function (sx, sy, sw, sh) {
    return this.image().then(imageToImageData(sx, sy, sw, sh))
  }

  return umdExport('PromisifyFile', PromisifyFile)
})()