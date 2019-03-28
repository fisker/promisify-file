import globalThis from './utils/global-this'
import isObject from './utils/is-object'
import isFunction from './utils/is-function'

const {File, OffscreenCanvas, ArrayBuffer, DataView, Blob} = globalThis

// ie do't support File Constructor
export const SUPPORTS_FILE_CONSTRUCTOR = (function() {
  try {
    const file = new File([], '')
    return isObject(file)
  } catch (error) {
    return false
  }
})()

export const SUPPORTS_OFFSCREEN_CANVAS = isFunction(OffscreenCanvas)

export const SUPPORTS_BLOB_CONSTRUCTOR_WITH_DATAVIEW = (function() {
  try {
    const arrayBuffer = new ArrayBuffer()
    const dataView = new DataView(arrayBuffer)
    const blob = new Blob([dataView])
    return isObject(blob)
  } catch (error) {
    return false
  }
})()
