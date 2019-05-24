import getImageData from '../../utils/get-image-data'
import cacheResult from '../helper/cache-result'

// get `ImageBitmap`
const imageData = cacheResult('imageData', async function imageData(
  ...arguments_
) {
  const image = await this.image()
  return getImageData(image, ...arguments_)
})

export {imageData}
