import apply from './apply'
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
function curry(side, func, ...rest) {
  function curried(...arguments_) {
    const args =
      side === CURRY_SIDE_END
        ? [...arguments_, ...rest]
        : [...rest, ...arguments_]
    return apply(func, this, args)
  }

  return curried
}

export default curry
