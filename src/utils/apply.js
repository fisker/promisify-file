/**
 * Faster apply
 * Call is faster than apply, optimize less than 4 args
 *
 * @param  {Function} func
 * @param  {any} context
 * @param  {Array} args
 */
function apply(func, context, args) {
  switch (args.length) {
    case 0:
      return func.call(context)
    case 1:
      return func.call(context, args[0])
    case 2:
      return func.call(context, args[0], args[1])
    case 3:
      return func.call(context, args[0], args[1], args[2])
    default:
      return func.apply(context, args)
  }
}

export default apply
