import promisify from './promisify'
import on from './on'
import {IMAGE_LOAD_ERROR} from '../constants'

function waitForImage(resolve, reject, image) {
  if (image.naturalWidth) {
    resolve(image)
    return
  }

  on(image, 'load', function() {
    resolve(image)
  })

  on(image, 'error', function() {
    reject(new Error(IMAGE_LOAD_ERROR))
  })
}

export default promisify(waitForImage)
