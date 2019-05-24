import isObject from './is-object'
import isFunction from './is-function'

function isDocument(x) {
  return (
    isObject(x) && isObject(x.documentElement) && isFunction(x.createElement)
  )
}

export default isDocument
