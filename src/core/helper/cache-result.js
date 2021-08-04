import hasOwn from '../../utils/has-own.js'
import isFunction from '../../utils/is-function.js'

function cacheResult(key, function_) {
  return function (...arguments_) {
    const cacheKey = isFunction(key) ? key.call(this, ...arguments_) : key
    const {$store: store} = this
    if (hasOwn(store, cacheKey)) {
      return store[cacheKey]
    }
    const result = function_.call(this, ...arguments_)
    store[cacheKey] = result

    return result
  }
}

export default cacheResult
