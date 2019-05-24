import isObject from './is-object'
import isFunction from './is-function'

function isCanvas(x) {
  return isObject(x) && isFunction(x.getContext)
}

export default isCanvas
