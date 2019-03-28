import memoize from './memoize'
/**
 * camelCase
 * lowercase first letter
 *
 * @param  {String} s
 * @returns  {String}
 */

function camelCase(s) {
  return s[0].toLowerCase() + s.slice(1)
}

export default memoize(camelCase)
