;(function() {
  'use strict'

  var root = Function('return this')() // eslint-disable-line

  var FileReader = root.FileReader
  var Promise = root.Promise
  var Symbol = root.Symbol
  var toStringTag = Symbol && Symbol.toStringTag
  var Blob = root.Blob
  var File = root.File
  var Image = root.Image
  var createImageBitmap = root.createImageBitmap
  var atob = root.atob
  var URL = root.URL || root.webkitURL

  var fetch = window.fetch

  var OffscreenCanvas = root.OffscreenCanvas
  var DOMParser = root.DOMParser
  var XMLSerializer = root.XMLSerializer

  var push = Array.prototype.push
  var toString = Object.prototype.toString
  var fromCharCode = String.fromCharCode

  var base64DataURLPattern = /^data:(.*?)?;base64,(.+)$/
  var moduleName = 'PromisifyFile'

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

  var supports = {
    // ie don't support DataView As Blob parts
    blobConstructorWithDataView: (function() {
      try {
        var arrayBuffer = new ArrayBuffer()
        var dataView = new DataView(arrayBuffer)
        var blob = new Blob([blob])
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
    offscreenCanvas: isFunction(OffscreenCanvas)
  }

  function isObject(x) {
    return x !== null && typeof x === 'object'
  }

  function isFunction(x) {
    return typeof x === 'function'
  }

  function isThenAble(x) {
    return isObject(x) && isFunction(x.then)
  }

  function isCanvas(x) {
    return isObject(x) && isFunction(x.getContext)
  }

  function isRenderingContext(x) {
    return isObject(x) && isCanvas(x.canvas)
  }

  function isArrayBuffer(x) {
    return isObject(x) && getType(x) === 'ArrayBuffer'
  }

  function isDocument(x) {
    return (
      isObject(x) && isObject(x.documentElement) && isFunction(x.createElement)
    )
  }

  // ie DataView.toString is [object Object]
  function isDataView(x) {
    // can't do ArrayBuffer.isView check on ie 10
    return isObject(x) && isArrayBuffer(x.buffer)
  }

  // whatwg-fetch polyfilled fetch Symbol.toString is not current
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
          curryRight(func, context)(resolve, reject),
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
   * Simple curryRight
   * internal use only
   * returns a function accept argumentst
   *
   * @param  {Function} func
   * @param  {any} context
   * @returns  {Function}
   */
  function curryRight(func, context) {
    var rest

    function curried() {
      return apply(func, context || this, concat(arguments, rest))
    }

    function setRest() {
      rest = arguments
      return curried
    }

    return setRest
  }

  /**
   * concat two ArrayLike
   *
   * @param  {ArrayLike} first
   * @param  {ArrayLike} first
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
    var define = root.define
    var module = root.module

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
      }
    : // use Blob as as fake File
      function(parts, fileName, options) {
        var blob = new Blob(parts, options)
        blob.name = fileName
        blob.lastModified = options.lastModified || Date.now()
        return blob
      }

  var waitForImage = promisify(function waitForImage(image, resolve, reject) {
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
    fileReader,
    resolve,
    reject
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
    xhr,
    resolve,
    reject
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
      type: mimeType
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
          lastModified: lastModified
        })
      } else {
        blob = new Blob([data], {
          type: type
        })
      }
    }

    this.$store = {
      orignal: data,
      blob: blob
    }
    this.$options = options
  }

  // use FileReader `readAs...` method
  function readFile(method, blob, args) {
    var fileReader = new FileReader()
    apply(method, fileReader, concat([blob], args || []))
    return waitForFileReader(fileReader)
  }

  function arrayBufferToBinaryString(buffer) {
    var bytes = new Uint8Array(buffer)
    return apply(fromCharCode, String, bytes)
  }

  function readFileAs(dataType) {
    var method = FileReader.prototype['readAs' + dataType]
    var storeKey = camelcase(dataType)

    function fileReader() {
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
        // ie don't support readAsBinaryString
        if (dataType === 'BinaryString' && !method) {
          store[key] = this.arrayBuffer().then(arrayBufferToBinaryString)
        } else {
          store[key] = readFile(method, this.$store.blob, args)
        }
      }

      return store[key]
    }

    return fileReader
  }

  fileReaderSupportedDataTypes.forEach(function(dataType) {
    PromisifyFile.prototype[camelcase(dataType)] = readFileAs(dataType)
  })

  function getArrayBufferView(viewType) {
    var TypedArray = root[viewType]

    return function getArrayBufferView(byteOffset, length) {
      function arrayBufferParser(buffer) {
        return new TypedArray(buffer, byteOffset, length)
      }
      return this.arrayBuffer().then(arrayBufferParser)
    }
  }

  // get getArrayBufferView
  arrayBufferViews.forEach(function(viewType) {
    PromisifyFile.prototype[camelcase(viewType)] = getArrayBufferView(viewType)
  })

  // get `Blob`
  PromisifyFile.prototype.blob = function(options) {
    var blob = new Blob([this.$store.blob], options || this.$store.blob)
    return Promise.resolve(blob)
  }

  // get `File`
  PromisifyFile.prototype.file = function(name, options) {
    var file = constructFile(
      [this.$store.blob],
      name || this.$store.blob.name,
      options || this.$store.blob
    )
    return Promise.resolve(file)
  }

  PromisifyFile.prototype.json = function(encoding, reviver) {
    var parser = curryRight(JSON.parse, JSON)(reviver)
    return this.text(encoding || this.$options.encoding).then(parser)
  }

  // get `URL`
  PromisifyFile.prototype.url = function() {
    var url = URL.createObjectURL(this.$store.blob)
    return Promise.resolve(url)
  }

  // load as a `HTMLImageElement`
  function loadImage(src) {
    var image = new Image()
    image.src = src
    return waitForImage(image)
  }

  PromisifyFile.prototype.image = function() {
    return this.dataURL().then(loadImage)
  }

  // get `ImageBitmap`
  PromisifyFile.prototype.imageBitmap = function() {
    return apply(createImageBitmap, root, concat([this.$store.blob], arguments))
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

  PromisifyFile.prototype.imageData = function(sx, sy, sw, sh) {
    var parser = curryRight(getImageData)(sx, sy, sw, sh)
    return this.image().then(parser)
  }

  // DOMParser
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
    return curryRight(textToDocument)(mimeType)
  })

  function toDocument(encoding, mimeType) {
    encoding = encoding || this.$options.encoding
    mimeType = mimeType || this.$store.blob.type
    var parser = getDOMParser(mimeType)
    return this.text(encoding).then(parser)
  }

  PromisifyFile.prototype.document = toDocument
  PromisifyFile.prototype.xml = curryRight(toDocument)('application/xml')
  PromisifyFile.prototype.svg = curryRight(toDocument)('image/svg+xml')
  PromisifyFile.prototype.html = curryRight(toDocument)('text/html')

  function parseXHRData(xhr) {
    switch (xhr.responseType) {
      case '':
      case 'text':
        return xhr.responseText
      case 'json':
        return JSON.stringify(xhr.response)
      case 'document':
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

  var canvasToBlob = promisify(function(canvas, options, resolve, reject) {
    if (canvas.convertToBlob) {
      return canvas.convertToBlob(options)
    }

    if (canvas.toBlob) {
      canvas.toBlob(resolve, options.type, options.quality)
      return
    }

    var url = canvas.toDataURL(options.type, options.qualit)
    var blob = parseBase64DataURL(url)
    return resolve(blob)
  })

  function parseFromData(data, options) {
    var parser = curryRight(parseFromData)(options)

    // Promise
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
    }

    // HTMLCanvasElement and OffscreenCanvas
    if (isCanvas(data)) {
      return canvasToBlob(data, options)
    }

    // RenderingContext
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
    }

    // if (type === 'ArrayBuffer' || ArrayBuffer.isView(data)) {
    //   return new Blob([data])
    // }

    return new Blob([data], options)
  }

  function getInstance(blob, options) {
    return new PromisifyFile(blob, options)
  }

  if (toStringTag) {
    PromisifyFile.prototype[toStringTag] = moduleName
  }

  PromisifyFile.from = function parseData(data, options) {
    options = options || {}
    var blob = parseFromData(data, options)
    var promise = isThenAble(blob) ? blob : Promise.resolve(blob)

    return promise.then(curryRight(getInstance)(options))
  }

  return umdExport(PromisifyFile)
})()
