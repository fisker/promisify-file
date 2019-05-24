import isObject from './is-object'
import isCanvas from './is-canvas'

function isRenderingContext(x) {
  return isObject(x) && isCanvas(x.canvas)
}

export default isRenderingContext
