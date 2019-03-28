function on(obj, type, listener, options = false) {
  obj.addEventListener(type, listener, options)
}

export default on
