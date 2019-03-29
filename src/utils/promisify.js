import isUndefined from './is-undefined'

function promisify(func) {
  function promised(...arguments_) {
    return new Promise((resolve, reject) => {
      const result = func.call(this, resolve, reject, ...arguments_)

      if (!isUndefined(result)) {
        resolve(result)
      }
    })
  }

  return promised
}

export default promisify
