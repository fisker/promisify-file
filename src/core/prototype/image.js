import loadImage from '../../utils/load-image'
import {SUPPORTS_URL_CREATE_OBJECT_URL} from '../../supports'
import cacheResult from '../helper/cache-result'

const image = cacheResult('image', async function image() {
  const url = await this[SUPPORTS_URL_CREATE_OBJECT_URL ? 'url' : 'dataURL']()

  return loadImage(url)
})

export {image}
