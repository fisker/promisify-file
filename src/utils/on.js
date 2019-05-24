function on(object, type, listener, options = false) {
  object.addEventListener(type, listener, options)
}

export default on
