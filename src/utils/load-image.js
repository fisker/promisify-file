import globalThis from './global-this'
import waitForImage from './wait-for-image'

const {Image} = globalThis

// load as a `HTMLImageElement`
function loadImage(src) {
  const image = new Image()
  image.src = src
  return waitForImage(image)
}

export default loadImage
