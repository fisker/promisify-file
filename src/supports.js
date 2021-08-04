import {
  File,
  OffscreenCanvas,
  ArrayBuffer,
  DataView,
  Blob,
  URL,
} from './utils/global-this.js'
import isObject from './utils/is-object.js'
import isFunction from './utils/is-function.js'

// IE don't support File Constructor
export const SUPPORTS_FILE_CONSTRUCTOR = (function () {
  try {
    const file = new File([], '')
    return isObject(file)
  } catch {
    return false
  }
})()

export const SUPPORTS_OFFSCREEN_CANVAS = isFunction(OffscreenCanvas)

export const SUPPORTS_BLOB_CONSTRUCTOR_WITH_DATA_VIEW = (function () {
  try {
    const arrayBuffer = new ArrayBuffer()
    const dataView = new DataView(arrayBuffer)
    const blob = new Blob([dataView])
    return isObject(blob)
  } catch {
    return false
  }
})()

export const SUPPORTS_URL_CREATE_OBJECT_URL =
  isObject(URL) && isFunction(URL.createObjectURL)
