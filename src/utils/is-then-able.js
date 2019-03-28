import isObject from './is-object'
import isFunction from './is-function'

function isThenAble(x) {
  return isObject(x) && isFunction(x.then)
}

export default isThenAble
