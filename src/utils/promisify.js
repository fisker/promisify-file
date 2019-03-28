import apply from './apply'
import isUndefined from './is-undefined'

function promisify(func) {
  function promised(...arguments_) {
    return new Promise((resolve, reject) => {
      const result = apply(func, this, [resolve, reject, ...arguments_])
      if (!isUndefined(result)) {
        resolve(result)
      }
    })
  }

  return promised
}

export default promisify
