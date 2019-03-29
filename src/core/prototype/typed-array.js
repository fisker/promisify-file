import {
  DataView,
  Float32Array,
  Float64Array,
  Int16Array,
  Int32Array,
  Int8Array,
  Uint16Array,
  Uint32Array,
  Uint8Array,
  Uint8ClampedArray,
} from '../../utils/global-this'

function getView(TypedArray) {
  return async function arrayBufferView(parser, byteOffset, length) {
    const buffer = await this.arrayBuffer()
    return new TypedArray(buffer, byteOffset, length)
  }
}

const dataView = getView(DataView)
const float32Array = getView(Float32Array)
const float64Array = getView(Float64Array)
const int16Array = getView(Int16Array)
const int32Array = getView(Int32Array)
const int8Array = getView(Int8Array)
const uint16Array = getView(Uint16Array)
const uint32Array = getView(Uint32Array)
const uint8Array = getView(Uint8Array)
const uint8ClampedArray = getView(Uint8ClampedArray)

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
