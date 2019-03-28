import isObject from './is-object'
import isFunction from './is-function'

// whatwg-fetch polyfilled fetch Symbol.toString is not current
function isBody(x) {
  return (
    isObject(x) &&
    isFunction(x.arrayBuffer) &&
    isFunction(x.blob) &&
    isFunction(x.formData) &&
    isFunction(x.json) &&
    isFunction(x.text)
  )
}

export default isBody
