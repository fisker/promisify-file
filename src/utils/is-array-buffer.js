import isObject from './is-object.js'
import getType from './get-type.js'

function isArrayBuffer(x) {
  return isObject(x) && getType(x) === 'ArrayBuffer'
}

export default isArrayBuffer
