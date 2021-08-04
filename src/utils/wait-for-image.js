import {IMAGE_LOAD_ERROR} from '../constants.js'
import promisify from './promisify.js'
import on from './on.js'

function waitForImage(resolve, reject, image) {
  if (image.naturalWidth) {
    resolve(image)
    return
  }

  on(image, 'load', function () {
    resolve(image)
  })

  on(image, 'error', function () {
    reject(new Error(IMAGE_LOAD_ERROR))
  })
}

export default promisify(waitForImage)
