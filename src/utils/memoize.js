/**
 * Simple memoize
 * internal use only
 * func should accept 0 / 1 argument and argument only primitive
 * func should return primitive value or function
 *
 * @param  {Function} func
 * @returns {Function}
 */
function memoize(function_) {
  const cache = {}

  function memoized(...arguments_) {
    const [key] = arguments_

    if (!cache[key]) {
      cache[key] = function_(...arguments_)
    }
    return cache[key]
  }

  return memoized
}

export default memoize
