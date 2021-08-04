import {SUPPORTS_OFFSCREEN_CANVAS} from '../supports.js'

import {document, OffscreenCanvas} from './global-this.js'

function getOffscreenCanvasRenderingContext2D(width, height) {
  const canvas = new OffscreenCanvas(width, height)
  return canvas.getContext('2d')
}
function getCanvasRenderingContext2D(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas.getContext('2d')
}

export default SUPPORTS_OFFSCREEN_CANVAS
  ? getOffscreenCanvasRenderingContext2D
  : getCanvasRenderingContext2D
