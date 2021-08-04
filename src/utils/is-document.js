import isObject from './is-object.js'
import isFunction from './is-function.js'

function isDocument(x) {
  return (
    isObject(x) && isObject(x.documentElement) && isFunction(x.createElement)
  )
}

export default isDocument
