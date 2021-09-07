import getImageData from '../../utils/get-image-data.js'
import cacheResult from '../helper/cache-result.js'

// get `ImageBitmap`
const imageData = cacheResult(
  'imageData',
  async function imageData(...arguments_) {
    const image = await this.image()
    return getImageData(image, ...arguments_)
  },
)

export {imageData}
