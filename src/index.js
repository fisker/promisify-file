/* globals define: true, module: true */
;(function () {
  'use strict'

  var root = Function('return this')() // eslint-disable-line

  var document = root.document

  var FileReader = root.FileReader
  var Promise = root.Promise
  var Blob = root.Blob
  var File = root.File
  var Image = root.Image
  var createImageBitmap = root.createImageBitmap

  var URL = root.URL || root.webkitURL
  var createObjectURL = URL && URL.createObjectURL && URL.createObjectURL.bind(URL)

  var concat = Array.prototype.concat

  var fileReaderSupportedDataTypes = [
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

  /**
   * Faster apply
   * Call is faster than apply, optimize less than 4 args *
   *
   * @param  {Function} func
   * @param  {any} context
   * @param  {Array} args
   */
  function apply (func, context, args) {
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

  function camelcase (s) {
    return s[0].toLowerCase() + s.slice(1)
  }

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

  function prepend (first, rest) {
    return apply(concat, [first], rest)
  }

  function PromisifyFile (blob, options) {
    this.$store = {
      orignal: blob
    }
    this.$options = options
  }

  // use FileReader `readAs...` method

  function readFile (method, blob, args) {
    var fileReader = new FileReader()

    return new Promise(function (resolve, reject) {
      fileReader.onload = function () {
        resolve(fileReader.result)
      }

      fileReader.onerror = function () {
        reject(fileReader.error)
      }

      apply(method, fileReader, prepend(blob, args || []))
    })
  }

  function readFileAs (dataType) {
    var method = FileReader.prototype['readAs' + dataType]
    var storeKey = camelcase(dataType)
    var reDefaultEncoding = /utf-8/i

    return function readAs () {
      if (
        dataType === 'Text' &&
        arguments[0] &&
        !reDefaultEncoding.test(arguments[0])
      ) {
        return readFile(method, this.$store.orignal, arguments)
      }

      if (!this.$store[storeKey]) {
        this.$store[storeKey] = readFile(method, this.$store.orignal, arguments)
      }

      return this.$store[storeKey]
    }
  }

  fileReaderSupportedDataTypes.forEach(function (dataType) {
    PromisifyFile.prototype[camelcase(dataType)] = readFileAs(dataType)
  })

  function getArrayBufferView (viewType) {
    var TypedArray = window[viewType]

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
  // get getArrayBufferView
  arrayBufferViews.forEach(function (viewType) {
    PromisifyFile.prototype[camelcase(viewType)] = getArrayBufferView(viewType)
  })

  // get `Blob`
  PromisifyFile.prototype.blob = function (options) {
    var blob = new Blob(
      [this.$store.orignal],
      options || this.$store.orignal
    )
    return Promise.resolve(blob)
  }

  // get `File`
  PromisifyFile.prototype.file = function (name, options) {
    var file = new File(
      [this.$store.orignal],
      name || this.$store.orignal.name,
      options || this.$store.orignal
    )
    return Promise.resolve(file)
  }

  // parse text content to `JSON`
  function textToJSON (reviver) {
    return function (text) {
      return JSON.parse(text, reviver)
    }
  }

  PromisifyFile.prototype.json = function (encoding, reviver) {
    return this.text(encoding).then(textToJSON(reviver))
  }

  // get `URL`
  PromisifyFile.prototype.url = function () {
    var url = createObjectURL(this.$store.orignal)
    return Promise.resolve(url)
  }

  // load as a `HTMLImageElement`
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
  PromisifyFile.prototype.image = function () {
    return this.dataURL().then(loadImage)
  }

  // get `ImageBitmap`
  function imageToImageBitmap (args) {
    return function (image) {
      return apply(createImageBitmap, root, prepend(image, args))
    }
  }
  PromisifyFile.prototype.imageBitmap = function () {
    return this.image().then(imageToImageBitmap(arguments))
  }

  // get `ImageData`
  var getImageData = (function () {
    var canvas
    var context

    return function getImageData (sx, sy, sw, sh) {
      sx = sx || 0
      sy = sy || 0

      return function getImageData (image) {
        canvas = canvas || document.createElement('canvas')
        context = context || canvas.getContext('2d')

        var width = canvas.width = image.naturalWidth
        var height = canvas.height = image.naturalHeight
        sw = sw || width
        sh = sh || height

        return context.getImageData(sx, sy, sw, sh)
      }
    }
  })()
  PromisifyFile.prototype.imageData = function (sx, sy, sw, sh) {
    return this.image().then(getImageData(sx, sy, sw, sh))
  }

  return umdExport('PromisifyFile', PromisifyFile)
})()