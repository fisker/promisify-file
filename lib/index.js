;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global = global || self), factory((global.PromisifyFile = {})))
})(this, function(exports) {
  'use strict'

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function')
    }
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      })
    } else {
      obj[key] = value
    }

    return obj
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {}
      var ownKeys = Object.keys(source)

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(
          Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable
          })
        )
      }

      ownKeys.forEach(function(key) {
        _defineProperty(target, key, source[key])
      })
    }

    return target
  }

  var defineProperties = Object.defineProperties

  function defineValues(object, values) {
    var options =
      arguments.length > 2 && arguments[2] !== undefined
        ? arguments[2]
        : {
            configurable: true,
            writable: true,
            enumerable: true,
          }
    var properties = {}
    var keys = Object.keys(values)
    var _arr = keys

    for (var _i = 0; _i < _arr.length; _i++) {
      var key = _arr[_i]
      properties[key] = _objectSpread(
        {
          value: values[key],
        },
        options
      )
    }

    return defineProperties(object, properties)
  }

  // eslint-disable-next-line no-new-func
  var globalThis = new Function('return this')()
  var URL = globalThis.URL || globalThis.webkitURL
  var ArrayBuffer = globalThis.ArrayBuffer,
    atob = globalThis.atob,
    Blob = globalThis.Blob,
    createImageBitmap = globalThis.createImageBitmap,
    DataView = globalThis.DataView,
    DOMParser = globalThis.DOMParser,
    document = globalThis.document,
    fetch = globalThis.fetch,
    File = globalThis.File,
    Image = globalThis.Image,
    OffscreenCanvas = globalThis.OffscreenCanvas,
    Promise$1 = globalThis.Promise,
    Int8Array = globalThis.Int8Array,
    Uint8Array = globalThis.Uint8Array,
    Uint8ClampedArray = globalThis.Uint8ClampedArray,
    Int16Array = globalThis.Int16Array,
    Uint16Array = globalThis.Uint16Array,
    Int32Array = globalThis.Int32Array,
    Uint32Array = globalThis.Uint32Array,
    Float32Array = globalThis.Float32Array,
    Float64Array = globalThis.Float64Array,
    XMLSerializer = globalThis.XMLSerializer

  function isFunction(x) {
    return typeof x === 'function'
  }

  function isObject(x) {
    return x !== null && (typeof x === 'object' || isFunction(x))
  }

  var SUPPORTS_FILE_CONSTRUCTOR = (function() {
    try {
      var file = new File([], '')
      return isObject(file)
    } catch (error) {
      return false
    }
  })()
  var SUPPORTS_OFFSCREEN_CANVAS = isFunction(OffscreenCanvas)
  var SUPPORTS_BLOB_CONSTRUCTOR_WITH_DATA_VIEW = (function() {
    try {
      var arrayBuffer = new ArrayBuffer()
      var dataView = new DataView(arrayBuffer)
      var blob = new Blob([dataView])
      return isObject(blob)
    } catch (error) {
      return false
    }
  })()

  function toFile(parts, fileName, options) {
    return new File(parts, fileName, options)
  } // use Blob as as fake File

  function toBlob(parts, fileName, options) {
    var blob = new Blob(parts, options)
    blob.name = fileName
    blob.lastModified = options.lastModified || Date.now()
    return blob
  }

  var constructFile = SUPPORTS_FILE_CONSTRUCTOR ? toFile : toBlob

  function _async(f) {
    return function() {
      for (var args = [], i = 0; i < arguments.length; i++) {
        args[i] = arguments[i]
      }

      try {
        return Promise.resolve(f.apply(this, args))
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }

  function toPromise(func) {
    return _async(function() {
      var _this = this

      for (
        var _len = arguments.length, arguments_ = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        arguments_[_key] = arguments[_key]
      }

      return func.call.apply(func, [_this].concat(arguments_))
    })
  }

  function blobSync() {
    var options =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    var blob = this.$store.blob
    options = _objectSpread({}, blob, options)
    return new Blob([blob], options)
  }

  var blob = toPromise(blobSync)

  var DOMPARSER_TYPES = {
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
  var CURRY_SIDE_START = 'start'
  var CURRY_SIDE_END = 'end'
  var DEFAULT_TEXT_ENCODING = 'UTF-8'
  var IMAGE_LOAD_ERROR = 'error occurred during loading image'
  var XMLHTTP_TIMEOUT_ERROR = 'XMLHttpRequest timeout'
  var XMLHTTP_LOAD_ERROR = 'error occurred during XMLHttpRequest'

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
    for (
      var _len = arguments.length,
        rest = new Array(_len > 2 ? _len - 2 : 0),
        _key = 2;
      _key < _len;
      _key++
    ) {
      rest[_key - 2] = arguments[_key]
    }

    return function curried() {
      for (
        var _len2 = arguments.length, arguments_ = new Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        arguments_[_key2] = arguments[_key2]
      }

      var arguments__ =
        side === CURRY_SIDE_END
          ? [].concat(arguments_, rest)
          : [].concat(rest, arguments_)
      return func.apply(this, arguments__)
    }
  }

  var prepend = curry.bind(null, CURRY_SIDE_START)

  var append = prepend(curry, CURRY_SIDE_END)

  // DOMParser
  function throwParserError(document) {
    var parserError = document.getElementsByTagName('parsererror')[0]

    if (parserError) {
      // eslint-disable-next-line unicorn/prefer-text-content
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

  function _async$1(f) {
    return function() {
      for (var args = [], i = 0; i < arguments.length; i++) {
        args[i] = arguments[i]
      }

      try {
        return Promise.resolve(f.apply(this, args))
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }

  function _await(value, then, direct) {
    if (direct) {
      return then ? then(value) : value
    }

    if (!value || !value.then) {
      value = Promise.resolve(value)
    }

    return then ? value.then(then) : value
  }

  var document$1 = _async$1(function(encoding, type) {
    var _this = this

    encoding = encoding || _this.$options.encoding
    type = type || _this.$store.blob.type
    return _await(_this.text(encoding), function(text) {
      return textToDocument(text, type)
    })
  })
  var xml = append(document$1, DOMPARSER_TYPES.xml)
  var svg = append(document$1, DOMPARSER_TYPES.svg)
  var html = append(document$1, DOMPARSER_TYPES.html)

  var r = new Function('return this')(),
    e = r.FileReader,
    a = r.Promise,
    t = Array.prototype.slice,
    n = ['ArrayBuffer', 'Text', 'DataURL', 'BinaryString']

  function o(r) {
    var n = t.call(arguments, 1)
    return new a(function(a, t) {
      var o = new e()
      o.addEventListener('load', function() {
        return a(o.result)
      }),
        o.addEventListener('error', function() {
          return t(o.error)
        }),
        r.apply(o, n)
    })
  }

  function i() {}

  for (var u = 0; u < n.length; u++) {
    var s = 'readAs'.concat(n[u]),
      d = o.bind(null, e.prototype[s])
    ;(i.prototype[s] = d), (i[s] = d)
  }

  var f = i.readAsArrayBuffer,
    l = i.readAsText,
    y = i.readAsDataURL,
    c = i.readAsBinaryString

  var methods = {
    arrayBuffer: f,
    text: l,
    dataURL: y,
    binaryString: c,
  }

  function readAs(dataType) {
    var method = methods[dataType]
    return function readAs(encoding) {
      encoding = String(
        encoding || this.$options.encoding || DEFAULT_TEXT_ENCODING
      ).toUpperCase()
      var storeKey =
        dataType === 'text'
          ? dataType
          : ''.concat(dataType, '.').concat(encoding)
      var store = this.$store

      if (!store[storeKey]) {
        store[storeKey] = method(store.blob, encoding)
      }

      return store[storeKey]
    }
  }

  var arrayBuffer = readAs('arrayBuffer')
  var text = readAs('text')
  var dataURL = readAs('dataURL')
  var binaryString = readAs('binaryString')

  function fileSync(name) {
    var options =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ''
    var blob = this.$store.blob
    name = name || blob.name
    options = _objectSpread({}, blob, options)
    return constructFile([blob], name, options)
  }

  var file = toPromise(fileSync)

  function imageBitmapSync() {
    for (
      var _len = arguments.length, arguments_ = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      arguments_[_key] = arguments[_key]
    }

    return createImageBitmap.apply(
      void 0,
      [this.$store.blob].concat(arguments_)
    )
  }

  var imageBitmap = toPromise(imageBitmapSync)

  function getOffscreenCanvasRenderingContext2D(width, height) {
    var canvas = new OffscreenCanvas(width, height)
    return canvas.getContext('2d')
  }

  function getCanvasRenderingContext2D(width, height) {
    var canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas.getContext('2d')
  }

  var getRenderingContext2D = SUPPORTS_OFFSCREEN_CANVAS
    ? getOffscreenCanvasRenderingContext2D
    : getCanvasRenderingContext2D

  function drawImage(image) {
    var context = getRenderingContext2D(
      image.naturalWidth || image.width,
      image.naturalHeight || image.height
    )
    context.drawImage(image, 0, 0)
    return context
  }

  function getImageData(image) {
    var sx =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    var sy =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
    var sw =
      arguments.length > 3 && arguments[3] !== undefined
        ? arguments[3]
        : image.naturalWidth || image.width
    var sh =
      arguments.length > 4 && arguments[4] !== undefined
        ? arguments[4]
        : image.naturalHeight || image.height
    var context = drawImage(image)
    return context.getImageData(sx, sy, sw, sh)
  }

  function _async$2(f) {
    return function() {
      for (var args = [], i = 0; i < arguments.length; i++) {
        args[i] = arguments[i]
      }

      try {
        return Promise.resolve(f.apply(this, args))
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }

  function _await$1(value, then, direct) {
    if (direct) {
      return then ? then(value) : value
    }

    if (!value || !value.then) {
      value = Promise.resolve(value)
    }

    return then ? value.then(then) : value
  }

  var imageData = _async$2(function(sx, sy, sw, sh) {
    var _this = this

    return _await$1(_this.image(), function(image) {
      return getImageData(image, sx, sy, sw, sh)
    })
  })

  function isUndefined(x) {
    return typeof x === 'undefined'
  }

  function promisify(func) {
    function promised() {
      var _this = this

      for (
        var _len = arguments.length, arguments_ = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        arguments_[_key] = arguments[_key]
      }

      return new Promise(function(resolve, reject) {
        var result = func.call.apply(
          func,
          [_this, resolve, reject].concat(arguments_)
        )

        if (!isUndefined(result)) {
          resolve(result)
        }
      })
    }

    return promised
  }

  function on(object, type, listener) {
    var options =
      arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false
    object.addEventListener(type, listener, options)
  }

  function waitForImage(resolve, reject, image) {
    if (image.naturalWidth) {
      return resolve(image)
    }

    on(image, 'load', function() {
      resolve(image)
    })
    on(image, 'error', function() {
      reject(new Error(IMAGE_LOAD_ERROR))
    })
  }

  var waitForImage$1 = promisify(waitForImage)

  function loadImage(url) {
    var image = new Image()
    image.src = url
    return waitForImage$1(image)
  }

  function _async$3(f) {
    return function() {
      for (var args = [], i = 0; i < arguments.length; i++) {
        args[i] = arguments[i]
      }

      try {
        return Promise.resolve(f.apply(this, args))
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }

  function _await$2(value, then, direct) {
    if (direct) {
      return then ? then(value) : value
    }

    if (!value || !value.then) {
      value = Promise.resolve(value)
    }

    return then ? value.then(then) : value
  }

  var image = _async$3(function() {
    var _this = this

    return _await$2(_this.url(), loadImage)
  })

  function _async$4(f) {
    return function() {
      for (var args = [], i = 0; i < arguments.length; i++) {
        args[i] = arguments[i]
      }

      try {
        return Promise.resolve(f.apply(this, args))
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }

  function _await$3(value, then, direct) {
    if (direct) {
      return then ? then(value) : value
    }

    if (!value || !value.then) {
      value = Promise.resolve(value)
    }

    return then ? value.then(then) : value
  }

  var json = _async$4(function(encoding, reviver) {
    var _this = this

    return _await$3(_this.text(encoding || _this.$options.encoding), function(
      text
    ) {
      return JSON.parse(text, reviver)
    })
  })

  function _async$5(f) {
    return function() {
      for (var args = [], i = 0; i < arguments.length; i++) {
        args[i] = arguments[i]
      }

      try {
        return Promise.resolve(f.apply(this, args))
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }

  function _await$4(value, then, direct) {
    if (direct) {
      return then ? then(value) : value
    }

    if (!value || !value.then) {
      value = Promise.resolve(value)
    }

    return then ? value.then(then) : value
  }

  function getView(TypedArray) {
    return _async$5(function(parser, byteOffset, length) {
      var _this = this

      return _await$4(_this.arrayBuffer(), function(buffer) {
        return new TypedArray(buffer, byteOffset, length)
      })
    })
  }

  var dataView = getView(DataView)
  var float32Array = getView(Float32Array)
  var float64Array = getView(Float64Array)
  var int16Array = getView(Int16Array)
  var int32Array = getView(Int32Array)
  var int8Array = getView(Int8Array)
  var uint16Array = getView(Uint16Array)
  var uint32Array = getView(Uint32Array)
  var uint8Array = getView(Uint8Array)
  var uint8ClampedArray = getView(Uint8ClampedArray)

  function urlSync() {
    return URL.createObjectURL(this.$store.blob)
  }

  var url = toPromise(urlSync)

  var prototype = /*#__PURE__*/ Object.freeze({
    blob: blob,
    blobSync: blobSync,
    document: document$1,
    xml: xml,
    svg: svg,
    html: html,
    arrayBuffer: arrayBuffer,
    text: text,
    dataURL: dataURL,
    binaryString: binaryString,
    fileSync: fileSync,
    file: file,
    imageBitmap: imageBitmap,
    imageBitmapSync: imageBitmapSync,
    imageData: imageData,
    image: image,
    json: json,
    dataView: dataView,
    float32Array: float32Array,
    float64Array: float64Array,
    int16Array: int16Array,
    int32Array: int32Array,
    int8Array: int8Array,
    uint16Array: uint16Array,
    uint32Array: uint32Array,
    uint8Array: uint8Array,
    uint8ClampedArray: uint8ClampedArray,
    url: url,
    urlSync: urlSync,
  })

  var File$1 = function File(data) {
    var options =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}

    _classCallCheck(this, File)

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
      original: data,
      blob: blob,
    }
    this.$options = options
  }

  defineValues(File$1.prototype, prototype)

  function isThenAble(x) {
    return isObject(x) && isFunction(x.then)
  }

  var toString = Object.prototype.toString

  function getType(x) {
    return toString.call(x).slice(8, -1)
  }

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

  function waitForXMLHttpRequest(resolve, reject, xhr) {
    if (xhr.readyState === 4) {
      resolve(parseXHRData(xhr))
      return
    }

    on(xhr, 'load', function() {
      resolve(parseXHRData(xhr))
    })
    on(xhr, 'error', function() {
      reject(new Error(XMLHTTP_LOAD_ERROR))
    })
    on(xhr, 'timeout', function() {
      reject(new Error(XMLHTTP_TIMEOUT_ERROR))
    })
  }

  var waitForXMLHttpRequest$1 = promisify(waitForXMLHttpRequest)

  function waitForFileReader(resolve, reject, fileReader) {
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
  }

  var waitForFileReader$1 = promisify(waitForFileReader)

  function putImageData(data) {
    var context = getRenderingContext2D(data.width, data.height)
    context.putImageData(data, 0, 0)
    return context
  }

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

  function isDocument(x) {
    return (
      isObject(x) && isObject(x.documentElement) && isFunction(x.createElement)
    )
  }

  function documentToText(document) {
    return (
      document.documentElement.outerHTML ||
      new XMLSerializer().serializeToString(document)
    )
  }

  function dataURLToBlob(data, type) {
    var binary = atob(data.split(',')[1])
    var array = Uint8Array.from(binary, function(byte) {
      return byte.charCodeAt(0)
    })
    return new Blob([array], {
      type: type,
    })
  }

  function canvasToBlob(resolve, reject, canvas, type, quality) {
    if (canvas.toBlob) {
      return canvas.toBlob(resolve, type, quality)
    }

    if (canvas.convertToBlob) {
      return resolve(canvas.convertToBlob(type, quality))
    }

    var url = canvas.toDataURL(type, quality)
    var blob = dataURLToBlob(url)
    return resolve(blob)
  }

  var canvasToBlob$1 = promisify(canvasToBlob)

  function isCanvas(x) {
    return isObject(x) && isFunction(x.getContext)
  }

  function isRenderingContext(x) {
    return isObject(x) && isCanvas(x.canvas)
  }

  var base64DataURLPattern = /^data:(.*?)?;base64,(.+)$/

  function isDataURL(url) {
    return base64DataURLPattern.test(url)
  }

  function isArrayBuffer(x) {
    return isObject(x) && getType(x) === 'ArrayBuffer'
  }

  function isDataView(x) {
    // can't do ArrayBuffer.isView check on ie 10
    return isObject(x) && isArrayBuffer(x.buffer)
  }

  function parseFromData(data, options) {
    var parser = function parser() {
      return parseFromData(options)
    } // Promise

    if (isThenAble(data)) {
      return data.then(parser)
    }

    var type = getType(data)

    if (type === 'Blob' || type === 'File') {
      return data
    }

    if (type === 'XMLHttpRequest') {
      return waitForXMLHttpRequest$1(data).then(parser)
    }

    if (type === 'HTMLImageElement') {
      return waitForImage$1(data)
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
      return waitForFileReader$1(data).then(parser)
    }

    if (isBody(data)) {
      return data.blob()
    }

    if (isDocument(data)) {
      return parser(documentToText(data))
    } // HTMLCanvasElement

    if (type === 'HTMLCanvasElement') {
      return canvasToBlob$1(data, options.type, options.quality)
    } // OffscreenCanvas

    if (type === 'OffscreenCanvas') {
      return data.convertToBlob(options)
    } // RenderingContext

    if (isRenderingContext(data)) {
      return parser(data.canvas)
    }

    if (isDataURL(data)) {
      try {
        var blob = dataURLToBlob(data)

        if (blob) {
          return blob
        }
      } catch (error) {}
    }

    if (/^(?:blob|data):/.test(data)) {
      return fetch(data).then(parser)
    }

    if (!SUPPORTS_BLOB_CONSTRUCTOR_WITH_DATA_VIEW && isDataView(data)) {
      return parser(data.buffer)
    } // if (type === 'ArrayBuffer' || ArrayBuffer.isView(data)) {
    //   return new Blob([data])
    // }

    return new Blob([data], options)
  }

  function parseData(data) {
    var options =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
    var blob = parseFromData(data, options)
    var promise = isThenAble(blob) ? blob : Promise.resolve(blob)
    return promise.then(function() {
      return new File$1(blob, options)
    })
  }

  defineValues(File$1, {
    from: parseData,
  })

  exports.default = File$1
  exports.from = parseData

  Object.defineProperty(exports, '__esModule', {value: true})
})
//# sourceMappingURL=index.js.map
