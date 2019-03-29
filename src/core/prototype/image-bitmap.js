import {createImageBitmap} from '../../utils/global-this'
import cacheResult from '../helper/cache-result'

// get `ImageBitmap`
const imageBitmap = cacheResult('imageBitmap', function imageBitmap(
  ...arguments_
) {
  return createImageBitmap(this.$store.blob, ...arguments_)
})

export {imageBitmap}
