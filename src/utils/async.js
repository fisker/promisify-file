function toPromise(function_) {
  return async function (...arguments_) {
    return function_.call(this, ...arguments_)
  }
}

export default toPromise
