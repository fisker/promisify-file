function ownKeys(object, enumerableOnly) {
  const keys = Object.keys(object)

  if (Object.getOwnPropertySymbols) {
    let symbols = Object.getOwnPropertySymbols(object)

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable
      })
    }

    keys.push.apply(keys, symbols)
  }

  return keys
}

function _objectSpread2(target) {
  for (let index = 1; index < arguments.length; index++) {
    const source = arguments[index] != null ? arguments[index] : {}

    if (index % 2) {
      for (const key of ownKeys(new Object(source), true)) {
        _defineProperty(target, key, source[key])
      }
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
    } else {
      for (const key of ownKeys(new Object(source))) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        )
      }
    }
  }

  return target
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperty(object, key, value) {
  if (key in object) {
    Object.defineProperty(object, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    object[key] = value
  }

  return object
}

const {defineProperties} = Object

function defineValues(object, values, options) {
  const _configurable$writabl = _objectSpread2(
    {
      configurable: true,
      writable: true,
      enumerable: true,
    },
    options,
  )
  const {configurable} = _configurable$writabl
  const {writable} = _configurable$writabl
  const {enumerable} = _configurable$writabl

  const properties = {}
  const keys = Object.keys(values)

  for (let _index = 0, _keys = keys; _index < _keys.length; _index++) {
    const key = _keys[_index]
    properties[key] = {
      value: values[key],
      configurable,
      writable,
      enumerable,
    }
  }

  return defineProperties(object, properties)
}

// eslint-disable-next-line no-new-func
const globalThis = new Function('return this')()
const URL = globalThis.URL || globalThis.webkitURL
const {ArrayBuffer} = globalThis
const {atob} = globalThis
const {Blob} = globalThis
const {createImageBitmap} = globalThis
const {DataView} = globalThis
const {DOMParser} = globalThis
const document$1 = globalThis.document
const {fetch} = globalThis
const File$2 = globalThis.File
const {Image} = globalThis
const {OffscreenCanvas} = globalThis
globalThis.Promise
globalThis.Int8Array
const Uint8Array$1 = globalThis.Uint8Array
globalThis.Uint8ClampedArray
globalThis.Int16Array
globalThis.Uint16Array
globalThis.Int32Array
globalThis.Uint32Array
globalThis.Float32Array
globalThis.Float64Array
const {XMLSerializer} = globalThis

function isFunction(x) {
  return typeof x === 'function'
}

function isObject(x) {
  return x !== null && (typeof x === 'object' || isFunction(x))
}

const SUPPORTS_FILE_CONSTRUCTOR = (function () {
  try {
    const file = new File$2([], '')
    return isObject(file)
  } catch {
    return false
  }
})()
const SUPPORTS_OFFSCREEN_CANVAS = isFunction(OffscreenCanvas)
const SUPPORTS_BLOB_CONSTRUCTOR_WITH_DATA_VIEW = (function () {
  try {
    const arrayBuffer = new ArrayBuffer()
    const dataView = new DataView(arrayBuffer)
    const blob = new Blob([dataView])
    return isObject(blob)
  } catch {
    return false
  }
})()
const SUPPORTS_URL_CREATE_OBJECT_URL =
  isObject(URL) && isFunction(URL.createObjectURL)

function toFile(parts, fileName, options) {
  return new File$2(parts, fileName, options)
} // use Blob as as fake File

function toBlob(parts, fileName, options) {
  const blob = new Blob(parts, options)
  blob.name = fileName
  blob.lastModified = options.lastModified || Date.now()
  return blob
}

const constructFile = SUPPORTS_FILE_CONSTRUCTOR ? toFile : toBlob

const {toString} = Object.prototype

function getType(x) {
  return toString.call(x).slice(8, -1)
}

function isBlob(x) {
  const type = getType(x)
  return type === 'Blob' || type === 'File'
}

const DOMPARSER_TYPES = {
  xml: 'application/xml',
  svg: 'image/svg+xml',
  html: 'text/html',
}
const XHR_RESPONSE_TYPES = {
  none: '',
  text: 'text',
  json: 'json',
  document: 'document',
}
const DEFAULT_TEXT_ENCODING = 'UTF-8'
const IMAGE_LOAD_ERROR = 'error occurred during loading image'
const XMLHTTP_TIMEOUT_ERROR = 'XMLHttpRequest timeout'
const XMLHTTP_LOAD_ERROR = 'error occurred during XMLHttpRequest'
const CONSTRUCTOR_DATA_TYPE_ERROR = '`data` except a `Blob`'

function _async$2(f) {
  return function () {
    for (var arguments_ = [], index = 0; index < arguments.length; index++) {
      arguments_[index] = arguments[index]
    }

    try {
      return Promise.resolve(f.apply(this, arguments_))
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

function toPromise(function_) {
  return _async$2(function () {
    const _this = this

    for (
      var _length = arguments.length, arguments_ = new Array(_length), _key = 0;
      _key < _length;
      _key++
    ) {
      arguments_[_key] = arguments[_key]
    }

    return function_.call.apply(function_, [_this].concat(arguments_))
  })
}

function blobSync() {
  let options =
    arguments.length !== 0 && arguments[0] !== undefined ? arguments[0] : {}
  const {blob} = this.$store
  options = _objectSpread2(_objectSpread2({}, blob), options)
  return new Blob([blob], options)
}

const blob = toPromise(blobSync)

// DOMParser
function throwParserError(document) {
  const parserError = document.getElementsByTagName('parsererror')[0]

  if (parserError) {
    throw new Error(parserError.innerText || parserError.textContent)
  }

  return document
}

function textToDocument(text, mimeType) {
  const parser = new DOMParser()
  const document = parser.parseFromString(text, mimeType)
  throwParserError(document)
  return document
}

function isNull(x) {
  return x === null
}

const {hasOwnProperty} = Object.prototype

function hasOwn(object, key) {
  return !isNull(object) && hasOwnProperty.call(object, key)
}

function cacheResult(key, function_) {
  return function () {
    for (
      var _length = arguments.length, arguments_ = new Array(_length), _key = 0;
      _key < _length;
      _key++
    ) {
      arguments_[_key] = arguments[_key]
    }

    const cacheKey = isFunction(key)
      ? key.call.apply(key, [this].concat(arguments_))
      : key
    const store = this.$store

    if (hasOwn(store, cacheKey)) {
      return store[cacheKey]
    }

    const result = function_.call.apply(function_, [this].concat(arguments_))
    store[cacheKey] = result
    return result
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

function cacheKey(type) {
  return 'document['.concat(type, ']')
}

function parseDocumentWithType(type) {
  return cacheResult(cacheKey(type), function document() {
    try {
      const _this2 = this

      return _await$4(_this2.text(), function (text) {
        return textToDocument(text, type)
      })
    } catch (error) {
      return Promise.reject(error)
    }
  })
}

function document(type) {
  type = type || this.$store.blob.type
  return parseDocumentWithType(type).call(this)
}

const xml = parseDocumentWithType(DOMPARSER_TYPES.xml)
const svg = parseDocumentWithType(DOMPARSER_TYPES.svg)
const html = parseDocumentWithType(DOMPARSER_TYPES.html)

const r = new Function('return this')()
const e = r.FileReader
const t = r.Promise
const a = r.Blob

function n(r) {
  return function (a, n) {
    return new t(function (t, o) {
      const index = new e()
      ;(index.onload = function () {
        return t(index.result)
      }),
        (index.onerror = function () {
          return o(index.error)
        }),
        r.call(index, a, n)
    })
  }
}

let o
const index = a.prototype.arrayBuffer
  ? ((o = a.prototype.arrayBuffer),
    function (r, e) {
      return o.call(r, e)
    })
  : n(e.prototype.readAsArrayBuffer)
const u = String.fromCharCode

function f(r) {
  for (
    var e = new Uint8Array(r), t = e.byteLength, a = '', n = 0;
    n < t;
    n += 1
  ) {
    a += u(e[n])
  }

  return a
}

const s = e.prototype.readAsBinaryString
  ? n(e.prototype.readAsBinaryString)
  : function (r) {
      return index(r).then(f)
    }
const y = n(e.prototype.readAsDataURL)
const p = n(e.prototype.readAsText)
const d = Object.freeze({
  __proto__: null,
  readAsArrayBuffer: index,
  readAsBinaryString: s,
  readAsDataURL: y,
  readAsText: p,
})
const A = Object.freeze({
  __proto__: null,
  readAsArrayBuffer: index,
  readAsBinaryString: s,
  readAsDataURL: y,
  readAsText: p,
  arrayBuffer: index,
  binaryString: s,
  dataURL: y,
  text: p,
})
const c = function c() {}

Object.assign(c.prototype, d), Object.assign(c, A)

const methods = {
  arrayBuffer: index,
  text: p,
  dataURL: y,
  binaryString: s,
}

function readAs(dataType) {
  const method = methods[dataType]

  function cacheKey(encoding) {
    if (dataType !== 'text') {
      return dataType
    }

    encoding = String(
      encoding || this.$options.encoding || DEFAULT_TEXT_ENCODING,
    ).toUpperCase()
    return ''.concat(dataType, '[').concat(encoding, ']')
  }

  function readAs() {
    for (
      var _length = arguments.length, arguments_ = new Array(_length), _key = 0;
      _key < _length;
      _key++
    ) {
      arguments_[_key] = arguments[_key]
    }

    return method.apply(void 0, [this.$store.blob].concat(arguments_))
  }

  return cacheResult(cacheKey, readAs)
}

const arrayBuffer = readAs('arrayBuffer')
const text = readAs('text')
const dataURL = readAs('dataURL')
const binaryString = readAs('binaryString')

function fileSync(name) {
  let options =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ''
  const {blob} = this.$store
  name = name || blob.name
  options = _objectSpread2(_objectSpread2({}, blob), options)
  return constructFile([blob], name, options)
}

const file = toPromise(fileSync)

const imageBitmap = cacheResult('imageBitmap', function imageBitmap() {
  for (
    var _length = arguments.length, arguments_ = new Array(_length), _key = 0;
    _key < _length;
    _key++
  ) {
    arguments_[_key] = arguments[_key]
  }

  return createImageBitmap.apply(void 0, [this.$store.blob].concat(arguments_))
})

function getOffscreenCanvasRenderingContext2D(width, height) {
  const canvas = new OffscreenCanvas(width, height)
  return canvas.getContext('2d')
}

function getCanvasRenderingContext2D(width, height) {
  const canvas = document$1.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas.getContext('2d')
}

const getRenderingContext2D = SUPPORTS_OFFSCREEN_CANVAS
  ? getOffscreenCanvasRenderingContext2D
  : getCanvasRenderingContext2D

function drawImage(image) {
  const context = getRenderingContext2D(
    image.naturalWidth || image.width,
    image.naturalHeight || image.height,
  )
  context.drawImage(image, 0, 0)
  return context
}

function getImageData(image) {
  const sx =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
  const sy =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0
  const sw =
    arguments.length > 3 && arguments[3] !== undefined
      ? arguments[3]
      : image.naturalWidth || image.width
  const sh =
    arguments.length > 4 && arguments[4] !== undefined
      ? arguments[4]
      : image.naturalHeight || image.height
  const context = drawImage(image)
  return context.getImageData(sx, sy, sw, sh)
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

const imageData = cacheResult('imageData', function imageData() {
  for (
    var _length = arguments.length, arguments_ = new Array(_length), _key = 0;
    _key < _length;
    _key++
  ) {
    arguments_[_key] = arguments[_key]
  }

  try {
    const _this2 = this

    return _await$3(_this2.image(), function (image) {
      return getImageData.apply(void 0, [image].concat(arguments_))
    })
  } catch (error) {
    return Promise.reject(error)
  }
})

function isUndefined(x) {
  return typeof x === 'undefined'
}

function promisify(function_) {
  function promised() {
    const _this = this

    for (
      var _length = arguments.length, arguments_ = new Array(_length), _key = 0;
      _key < _length;
      _key++
    ) {
      arguments_[_key] = arguments[_key]
    }

    return new Promise(function (resolve, reject) {
      const result = function_.call.apply(
        function_,
        [_this, resolve, reject].concat(arguments_),
      )

      if (!isUndefined(result)) {
        resolve(result)
      }
    })
  }

  return promised
}

function on(object, type, listener) {
  const options =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false
  object.addEventListener(type, listener, options)
}

function waitForImage(resolve, reject, image) {
  if (image.naturalWidth) {
    resolve(image)
    return
  }

  on(image, 'load', function () {
    resolve(image)
  })
  on(image, 'error', function () {
    reject(new Error(IMAGE_LOAD_ERROR))
  })
}

const waitForImage$1 = promisify(waitForImage)

function loadImage(url) {
  const image = new Image()
  image.src = url
  return waitForImage$1(image)
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

const image = cacheResult('image', function image() {
  try {
    const _this2 = this

    return _await$2(
      _this2[SUPPORTS_URL_CREATE_OBJECT_URL ? 'url' : 'dataURL'](),
      loadImage,
    )
  } catch (error) {
    return Promise.reject(error)
  }
})

function _await$1(value, then, direct) {
  if (direct) {
    return then ? then(value) : value
  }

  if (!value || !value.then) {
    value = Promise.resolve(value)
  }

  return then ? value.then(then) : value
}

const json = _async$1(function (encoding, reviver) {
  const _this = this

  return _await$1(
    _this.text(encoding || _this.$options.encoding),
    function (text) {
      return JSON.parse(text, reviver)
    },
  )
})

function _async$1(f) {
  return function () {
    for (var arguments_ = [], index = 0; index < arguments.length; index++) {
      arguments_[index] = arguments[index]
    }

    try {
      return Promise.resolve(f.apply(this, arguments_))
    } catch (error) {
      return Promise.reject(error)
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

function _async(f) {
  return function () {
    for (var arguments_ = [], index = 0; index < arguments.length; index++) {
      arguments_[index] = arguments[index]
    }

    try {
      return Promise.resolve(f.apply(this, arguments_))
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

function getView(type) {
  const arrayBufferView = _async(function (byteOffset, length) {
    const _this = this

    return _await(_this.arrayBuffer(), function (buffer) {
      return new TypedArray(buffer, byteOffset, length)
    })
  })

  var TypedArray = globalThis[type[0].toUpperCase() + type.slice(1)]
  return cacheResult(type, arrayBufferView)
}

const dataView = getView('dataView')
const float32Array = getView('float32Array')
const float64Array = getView('float64Array')
const int16Array = getView('int16Array')
const int32Array = getView('int32Array')
const int8Array = getView('int8Array')
const uint16Array = getView('uint16Array')
const uint32Array = getView('uint32Array')
const uint8Array = getView('uint8Array')
const uint8ClampedArray = getView('uint8ClampedArray')

const urlSync = cacheResult('url', function url() {
  return URL.createObjectURL(this.$store.blob)
})
const url = toPromise(urlSync)

const prototype = /* #__PURE__ */ Object.freeze({
  __proto__: null,
  blob,
  blobSync,
  document,
  xml,
  svg,
  html,
  arrayBuffer,
  text,
  dataURL,
  binaryString,
  fileSync,
  file,
  imageBitmap,
  imageData,
  image,
  json,
  dataView,
  float32Array,
  float64Array,
  int16Array,
  int32Array,
  int8Array,
  uint16Array,
  uint32Array,
  uint8Array,
  uint8ClampedArray,
  url,
  urlSync,
})

const File = function File(data) {
  const options =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}

  _classCallCheck(this, File)

  if (!isBlob(data)) {
    throw new TypeError(
      ''.concat(CONSTRUCTOR_DATA_TYPE_ERROR, ', got ').concat(typeof data),
    )
  }

  let blob = data
  const _options$type = options.type
  const type = _options$type === void 0 ? blob.type : _options$type
  const _options$name = options.name
  const name = _options$name === void 0 ? blob.name : _options$name
  const _options$lastModified = options.lastModified
  const lastModified =
    _options$lastModified === void 0 ? blob.lastModified : _options$lastModified

  if (
    type !== blob.type ||
    name !== blob.name ||
    lastModified !== blob.lastModified
  ) {
    if (name) {
      blob = constructFile([data], name, {
        type,
        lastModified,
      })
    } else {
      blob = new Blob([data], {
        type,
      })
    }
  }

  this.$store = {
    original: data,
    blob,
  }
  this.$options = options
}

defineValues(File.prototype, prototype)
const File$1 = File

function isThenAble(x) {
  return isObject(x) && isFunction(x.then)
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

  on(xhr, 'load', function () {
    resolve(parseXHRData(xhr))
  })
  on(xhr, 'error', function () {
    reject(new Error(XMLHTTP_LOAD_ERROR))
  })
  on(xhr, 'timeout', function () {
    reject(new Error(XMLHTTP_TIMEOUT_ERROR))
  })
}

const waitForXMLHttpRequest$1 = promisify(waitForXMLHttpRequest)

function waitForFileReader(resolve, reject, fileReader) {
  if (fileReader.result) {
    resolve(fileReader.result)
    return
  }

  if (fileReader.error) {
    reject(fileReader.error)
    return
  }

  on(fileReader, 'load', function () {
    resolve(fileReader.result)
  })
  on(fileReader, 'error', function () {
    reject(fileReader.error)
  })
}

const waitForFileReader$1 = promisify(waitForFileReader)

function putImageData(data) {
  const context = getRenderingContext2D(data.width, data.height)
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
  const binary = atob(data.split(',')[1])
  const array = Uint8Array$1.from(binary, function (_byte) {
    return _byte.charCodeAt(0)
  })
  return new Blob([array], {
    type,
  })
}

function canvasToBlob(resolve, reject, canvas, type, quality) {
  if (canvas.toBlob) {
    return canvas.toBlob(resolve, type, quality)
  }

  if (canvas.convertToBlob) {
    return resolve(canvas.convertToBlob(type, quality))
  }

  const url = canvas.toDataURL(type, quality)
  const blob = dataURLToBlob(url)
  return resolve(blob)
}

const canvasToBlob$1 = promisify(canvasToBlob)

function isCanvas(x) {
  return isObject(x) && isFunction(x.getContext)
}

function isRenderingContext(x) {
  return isObject(x) && isCanvas(x.canvas)
}

const base64DataURLPattern = /^data:.*?;base64,/

function isDataURL(url) {
  return base64DataURLPattern.test(url)
}

const download = fetch

function isArrayBuffer(x) {
  return isObject(x) && getType(x) === 'ArrayBuffer'
}

function isDataView(x) {
  // can't do ArrayBuffer.isView check on ie 10
  return isObject(x) && isArrayBuffer(x.buffer)
}

function parseFromData(data, options) {
  const parse = function parse(data) {
    return parseFromData(data, options)
  } // Promise

  if (isThenAble(data)) {
    return data.then(parse)
  }

  const type = getType(data)

  if (type === 'Blob' || type === 'File') {
    return data
  }

  if (type === 'XMLHttpRequest') {
    return waitForXMLHttpRequest$1(data).then(parse)
  }

  if (type === 'HTMLImageElement') {
    return waitForImage$1(data).then(drawImage).then(parse)
  }

  if (type === 'ImageBitmap') {
    return parse(drawImage(data))
  }

  if (type === 'ImageData') {
    return parse(putImageData(data))
  }

  if (type === 'FileReader') {
    return waitForFileReader$1(data).then(parse)
  }

  if (isBody(data)) {
    return data.blob()
  }

  if (isDocument(data)) {
    return parse(documentToText(data))
  } // HTMLCanvasElement

  if (type === 'HTMLCanvasElement') {
    return canvasToBlob$1(data, options.type, options.quality)
  } // OffscreenCanvas

  if (type === 'OffscreenCanvas') {
    return data.convertToBlob(options)
  } // RenderingContext

  if (isRenderingContext(data)) {
    return parse(data.canvas)
  }

  if (isDataURL(data)) {
    try {
      const blob = dataURLToBlob(data)

      if (blob) {
        return blob
      }
    } catch {}
  }

  if (/^(?:blob|data):/.test(data)) {
    return download(data).then(parse)
  }

  if (!SUPPORTS_BLOB_CONSTRUCTOR_WITH_DATA_VIEW && isDataView(data)) {
    return parse(data.buffer)
  } // if (type === 'ArrayBuffer' || ArrayBuffer.isView(data)) {
  //   return new Blob([data])
  // }

  return new Blob([data], options)
}

function parseData(data) {
  const options =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}
  const blob = parseFromData(data, options)
  const promise = isThenAble(blob) ? blob : Promise.resolve(blob)
  return promise.then(function (blob) {
    return new File$1(blob, options)
  })
}

defineValues(File$1, {
  from: parseData,
})

export {File$1 as default, parseData as from}
// # sourceMappingURL=index.mjs.map
