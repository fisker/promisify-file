import isNull from './is-null'

const {hasOwnProperty} = Object.prototype

function hasOwn(object, key) {
  return !isNull(object) && hasOwnProperty.call(object, key)
}

export default hasOwn
