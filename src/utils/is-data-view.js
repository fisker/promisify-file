import isArrayBuffer from './is-array-buffer'
import isObject from './is-object'

// ie DataView.toString is [object Object]
function isDataView(x) {
  // can't do ArrayBuffer.isView check on ie 10
  return isObject(x) && isArrayBuffer(x.buffer)
}

export default isDataView
