// eslint-disable-next-line no-new-func
const globalThis = new Function('return this')()

const URL = globalThis.URL || globalThis.webkitURL
const {
  createImageBitmap,
  document,
  OffscreenCanvas,
  atob,
  Uint8Array,
  Blob,
} = globalThis

export default globalThis
export {
  URL,
  createImageBitmap,
  document,
  OffscreenCanvas,
  atob,
  Uint8Array,
  Blob,
}
