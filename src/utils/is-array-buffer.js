import isObject from './is-object'
import getType from './get-type'

function isArrayBuffer(x) {
  return isObject(x) && getType(x) === 'ArrayBuffer'
}

export default isArrayBuffer
