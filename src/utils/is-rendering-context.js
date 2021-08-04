import isObject from './is-object.js'
import isCanvas from './is-canvas.js'

function isRenderingContext(x) {
  return isObject(x) && isCanvas(x.canvas)
}

export default isRenderingContext
