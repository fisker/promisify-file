// eslint-disable-next-line no-new-func
const globalThis = new Function('return this')()

const URL = globalThis.URL || globalThis.webkitURL
const {
  ArrayBuffer,
  atob,
  Blob,
  createImageBitmap,
  DataView,
  DOMParser,
  document,
  fetch,
  File,
  Image,
  OffscreenCanvas,
  Promise,
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  XMLSerializer,
} = globalThis

export default globalThis

export {
  ArrayBuffer,
  atob,
  Blob,
  createImageBitmap,
  DataView,
  DOMParser,
  document,
  fetch,
  File,
  Image,
  OffscreenCanvas,
  Promise,
  URL,
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  XMLSerializer,
}
