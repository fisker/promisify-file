import hasOwn from '../../utils/has-own'
import isFunction from '../../utils/is-function'

function cacheResult(key, fn) {
  return function(...arguments_) {
    const cacheKey = isFunction(key) ? key.call(this, ...arguments_) : key
    const {$store: store} = this
    if (hasOwn(store, cacheKey)) {
      return store[cacheKey]
    }
    const result = fn.call(this, ...arguments_)
    store[cacheKey] = result

    return result
  }
}

export default cacheResult
