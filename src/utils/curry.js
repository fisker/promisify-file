import {CURRY_SIDE_END} from '../constants'
/**
 * Simple curry
 * internal use only
 * returns a function accept argumentst
 *
 * @param  {String} side (start | end)
 * @param  {Function} func
 * @returns  {Function}
 */
function curry(side, function_, ...rest) {
  return function curried(...arguments_) {
    const arguments__ =
      side === CURRY_SIDE_END
        ? [...arguments_, ...rest]
        : [...rest, ...arguments_]
    return function_.apply(this, arguments__)
  }
}

export default curry
