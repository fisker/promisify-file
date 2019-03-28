import promisify from './promisify'
import on from './on'

function waitForImage(resolve, reject, image) {
  if (image.naturalWidth) {
    return resolve(image)
  }

  on(image, 'load', function() {
    resolve(image)
  })

  on(image, 'error', function() {
    reject(new Error('GET image failed.'))
  })
}

export default promisify(waitForImage)
