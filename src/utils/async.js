function toPromise(func) {
  return async function(...arguments_) {
    return func.call(this, ...arguments_)
  }
}

export default toPromise
