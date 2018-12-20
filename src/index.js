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
  var createObjectURL = URL && URL.createObjectURL && URL.createObjectURL.bind(URL)

  var OffscreenCanvas = root.OffscreenCanvas
  var DOMParser = root.DOMParser

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
   * Call is faster than apply, optimize less than 4 args
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

  /**
   * Simple memoize
   * internal use only
   * func should accept 0 / 1 argument and argument only primitive
   * func should return primitive value or function
   *
   * @param  {Function} func
   * @returns {Function}
   */
  function memoize (func) {
    var cache = {}
    function memoized (first) {
      var key = first

      if (!cache[key]) {
        cache[key] = apply(func, this, arguments)
      }

      return cache[key]
    }
    return memoized
  }

  var camelcase = memoize(function camelcase (s) {
    return s[0].toLowerCase() + s.slice(1)
  })

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
    return new Promise(function (resolve, reject) {
      var fileReader = new FileReader()

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

    function fileReader () {
      var store = this.$store
      var key = storeKey

      if (dataType === 'Text') {
        var encoding = arguments[0] || 'UTF-8'
        store = store.text || (store.text = {})
        key = String(encoding).toUpperCase()
      }

      if (!store[key]) {
        store[key] = readFile(method, this.$store.orignal, arguments)
      }

      return store[key]
    }

    return fileReader
  }

  fileReaderSupportedDataTypes.forEach(function (dataType) {
    PromisifyFile.prototype[camelcase(dataType)] = readFileAs(dataType)
  })

  function getArrayBufferView (viewType) {
    var TypedArray = window[viewType]

    return function getArrayBufferView (byteOffset, length) {
      function arrayBufferParser (buffer) {
        return new TypedArray(
          buffer,
          byteOffset,
          length
        )
      }
      return this.arrayBuffer().then(arrayBufferParser)
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
    function JSONParser (text) {
      return JSON.parse(text, reviver)
    }
    return JSONParser
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
  PromisifyFile.prototype.imageBitmap = function () {
    return apply(
      createImageBitmap,
      root,
      prepend(this.$store.orignal, arguments)
    )
  }

  // get `ImageData`
  function getOffscreenCanvasContext (image) {
    var canvas = new OffscreenCanvas(image.naturalWidth, image.naturalHeight)
    return canvas.getContext('2d')
  }

  var getCanvasContext = (function () {
    var canvas
    var context
    function getCanvasContext (image) {
      canvas = canvas || (canvas = root.document.createElement('canvas'))
      context = context || (context = canvas.getContext('2d'))

      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight

      return context
    }

    return getCanvasContext
  })()

  var getContext = OffscreenCanvas ? getOffscreenCanvasContext : getCanvasContext

  function getImageDataByCanvas (image, sx, sy, sw, sh) {
    var context = getContext(image)
    var width = image.naturalWidth
    var height = image.naturalHeight
    sw = sw || width
    sh = sh || height

    context.drawImage(image, 0, 0, width, height)
    return context.getImageData(sx, sy, sw, sh)
  }

  function getImageData (sx, sy, sw, sh) {
    sx = sx || 0
    sy = sy || 0

    function getImageData (image) {
      return getImageDataByCanvas(image, sx, sy, sw, sh)
    }

    return getImageData
  }

  PromisifyFile.prototype.imageData = function (sx, sy, sw, sh) {
    return this.image().then(getImageData(sx, sy, sw, sh))
  }

  // DOMParser
  function throwParserError (document) {
    var parserError = document.getElementsByTagName('parsererror')[0]

    if (parserError) {
      throw new Error(parserError.innerText || parserError.textContent)
    }

    return document
  }

  var getParserForMimeType = (function () {
    var parser
    function parseDocument (mime) {
      function parseDocument (text) {
        parser = parser || (parser = new DOMParser())
        var document = parser.parseFromString(text, mime)
        return throwParserError(document)
      }

      return parseDocument
    }

    return memoize(parseDocument)
  })()

  function getDocumentByParser (parser) {
    return function (encoding) {
      return this.text(encoding).then(parser)
    }
  }

  function getDocumentByType (type) {
    var parser = getParserForMimeType(DOMParserMimeType[type])
    return getDocumentByParser(parser)
  }
  var DOMParserMimeType = {
    xml: 'application/xml',
    svg: 'image/svg+xml',
    html: 'text/html'
  }
  PromisifyFile.prototype.document = function (encoding, overrideMimeType) {
    var parser = getParserForMimeType(
      overrideMimeType || this.$store.orignal.type
    )
    return getDocumentByParser(parser).call(this, encoding)
  }
  PromisifyFile.prototype.xml = getDocumentByType('xml')
  PromisifyFile.prototype.svg = getDocumentByType('svg')
  PromisifyFile.prototype.html = getDocumentByType('html')

  return umdExport('PromisifyFile', PromisifyFile)
})()