import isFunction from './is-function.js'

function isObject(x) {
  return x !== null && (typeof x === 'object' || isFunction(x))
}

export default isObject
