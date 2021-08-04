import isUndefined from './is-undefined.js'

function promisify(function_) {
  function promised(...arguments_) {
    return new Promise((resolve, reject) => {
      const result = function_.call(this, resolve, reject, ...arguments_)

      if (!isUndefined(result)) {
        resolve(result)
      }
    })
  }

  return promised
}

export default promisify
