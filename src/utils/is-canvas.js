import isObject from './is-object.js'
import isFunction from './is-function.js'

function isCanvas(x) {
  return isObject(x) && isFunction(x.getContext)
}

export default isCanvas
