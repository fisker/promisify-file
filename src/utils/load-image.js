import {Image} from './global-this'
import waitForImage from './wait-for-image'

// load as a `HTMLImageElement`
function loadImage(url) {
  const image = new Image()
  image.src = url
  return waitForImage(image)
}

export default loadImage
