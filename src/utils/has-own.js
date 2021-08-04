import isNull from './is-null.js'

const {hasOwnProperty} = Object.prototype

function hasOwn(object, key) {
  return !isNull(object) && hasOwnProperty.call(object, key)
}

export default hasOwn
