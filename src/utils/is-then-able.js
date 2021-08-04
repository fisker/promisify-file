import isObject from './is-object.js'
import isFunction from './is-function.js'

function isThenAble(x) {
  return isObject(x) && isFunction(x.then)
}

export default isThenAble
