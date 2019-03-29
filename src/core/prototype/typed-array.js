import globalThis from '../../utils/global-this'
import cacheResult from '../helper/cache-result'

function getView(type) {
  const TypedArray = globalThis[type[0].toUpperCase() + type.slice(1)]
  async function arrayBufferView(byteOffset, length) {
    const buffer = await this.arrayBuffer()
    return new TypedArray(buffer, byteOffset, length)
  }

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

export {
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
}
