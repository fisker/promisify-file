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
  var toString = Object.prototype.toString

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

  var imageLoadError = new Error('GET image failed.')
  var xmlhttpLoadError = new Error('XMLHttpRequest load failed.')
  var xmlhttpTimeoutError = new Error('XMLHttpRequest timeout.')

  function isObject (x) {
    return x !== null && typeof x === 'object'
  }

  function isFunction (x) {
    return typeof x === 'function'
  }

  function isThenAble (x) {
    return isObject(x) && isFunction(x.then)
  }

  function isCanvasContext (x) {
    return isObject(x) && isObject(x.canvas) && isFunction(x.canvas.getContext)
  }

  function getType (x) {
    return toString.call(x).slice(8, -1)
  }

  function on (obj, type, listener, options) {
    obj.addEventListener(type, listener, options || false)
  }

  function waitForImage (image) {
    if (image.naturalWidth) {
      return Promise.resolve(image)
    }

    return new Promise(function (resolve, reject) {
      on(image, 'load', function () {
        resolve(image)
      })
      on(image, 'error', function () {
        resolve(imageLoadError)
      })
    })
  }

  function waitForFileReader (fileReader) {
    if (fileReader.result) {
      return Promise.resolve(fileReader)
    }

    if (fileReader.error) {
      return Promise.reject(fileReader.error)
    }

    return new Promise(function (resolve, reject) {
      on(fileReader, 'load', function () {
        resolve(fileReader.result)
      })
      on(fileReader, 'error', function () {
        reject(fileReader.error)
      })
    })
  }

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
    var define = root.define
    var module = root.module

    if (isFunction(define) && define.amd) {
      define(name, [], function () {
        return mod
      })
    } else if (isObject(module) && module.exports) {
      module.exports = mod
    } else {
      root[name] = mod
    }

    return mod
  }

  function prepend (first, rest) {
    return apply(concat, [first], rest)
  }

  function PromisifyFile (data, options) {
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
        blob = new File([data], name, {
          type: type,
          lastModified: lastModified
        })
      } else {
        blob = new Blob([data], {
          type: type
        })
      }
    }

    this.$store = {
      orignal: blob
    }
    this.$options = options
  }

  // use FileReader `readAs...` method
  function readFile (method, blob, args) {
    var fileReader = new FileReader()
    apply(method, fileReader, prepend(blob, args || []))
    return waitForFileReader(fileReader)
  }

  function readFileAs (dataType) {
    var method = FileReader.prototype['readAs' + dataType]
    var storeKey = camelcase(dataType)

    function fileReader () {
      var store = this.$store
      var key = storeKey
      var args = []

      if (dataType === 'Text') {
        var encoding = arguments[0] || this.$options.encoding
        if (encoding) {
          args[0] = encoding
        }
        store = store.text || (store.text = {})
        key = String(encoding || 'UTF-8').toUpperCase()
      }

      if (!store[key]) {
        store[key] = readFile(method, this.$store.orignal, args)
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
    return this.text(encoding || this.$options.encoding).then(textToJSON(reviver))
  }

  // get `URL`
  PromisifyFile.prototype.url = function () {
    var url = createObjectURL(this.$store.orignal)
    return Promise.resolve(url)
  }

  // load as a `HTMLImageElement`
  function loadImage (src) {
    var image = new Image()
    image.src = src
    return waitForImage(image)
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

  function drawImage (image) {
    var width = image.naturalWidth
    var height = image.naturalHeight

    var context = getContext(image)
    context.drawImage(image, 0, 0, width, height)
    return context
  }

  function getImageDataByCanvas (image, sx, sy, sw, sh) {
    sw = sw || image.naturalWidth
    sh = sh || image.naturalHeight

    var context = drawImage(image)

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
      return this.text(encoding || this.$options.encoding).then(parser)
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

  function parseXHRData (xhr) {
    var type = (xhr.responseType || 'text').toLowerCase()
    var data
    switch (type) {
      case 'text':
        data = xhr.responseText
        break
      case 'json':
        data = JSON.stringify(xhr.response)
        break
      case 'document':
        return xhr.responseXML
      default:
        data = xhr.response
    }

    return new Blob([data])
  }

  function isXHRLoaded (xhr) {
    return xhr.readyState === 4
  }

  function waitForXHRLoad (xhr) {
    if (isXHRLoaded(xhr)) {
      return Promise.resolve(parseXHRData(xhr))
    }

    return new Promise(function (resolve, reject) {
      on(xhr, 'load', function () {
        resolve(parseXHRData(xhr))
      })
      on(xhr, 'error', function () {
        reject(xmlhttpLoadError)
      })
      on(xhr, 'timeout', function () {
        reject(xmlhttpTimeoutError)
      })
    })
  }

  function parseFromData (data, options) {
    function parser (data) {
      return parseFromData(data, options)
    }

    // Promise
    if (isThenAble(data)) {
      return isThenAble.then(parser)
    }

    var type = getType(data)

    if (type === 'Blob' || type === 'File') {
      return data
    }

    if (type === 'XMLHttpRequest') {
      return waitForXHRLoad(data).then(parser)
    }

    if (type === 'HTMLImageElement') {
      return waitForImage(data).then(drawImage).then(parser)
    }

    if (type === 'FileReader') {
      return waitForFileReader(data).then(parser)
    }

    if (type === 'Response' || type === 'Request') {
      return data.blob()
    }

    if (type === 'HTMLDocument' || type === 'XMLDocument') {
      return parser(data.documentElement.outerHTML)
    }

    if (type === 'HTMLCanvasElement') {
      return new Promise(function (resolve) {
        data.toBlob(resolve, options.type, options.quality)
      })
    }

    if (type === 'OffscreenCanvas') {
      return data.convertToBlob(options)
    }

    if (isCanvasContext(data)) {
      return parser(data.canvas)
    }

    // if (type === 'ArrayBuffer' || ArrayBuffer.isView(data)) {
    //   return new Blob([data])
    // }

    return new Blob([data], options)
  }

  function getInstance (options) {
    return function (blob) {
      return new PromisifyFile(blob, options)
    }
  }

  PromisifyFile.from = function parseData (data, options) {
    options = options || {}
    var blob = parseFromData(data, options)
    var promise = isThenAble(blob) ? blob : Promise.resolve(blob)

    return promise.then(getInstance(options))
  }

  return umdExport('PromisifyFile', PromisifyFile)
})()