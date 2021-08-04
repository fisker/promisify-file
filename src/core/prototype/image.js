import loadImage from '../../utils/load-image.js'
import {SUPPORTS_URL_CREATE_OBJECT_URL} from '../../supports.js'
import cacheResult from '../helper/cache-result.js'

const image = cacheResult('image', async function image() {
  const url = await this[SUPPORTS_URL_CREATE_OBJECT_URL ? 'url' : 'dataURL']()

  return loadImage(url)
})

export {image}
