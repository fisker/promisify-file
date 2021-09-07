import {createImageBitmap} from '../../utils/global-this.js'
import cacheResult from '../helper/cache-result.js'

// get `ImageBitmap`
const imageBitmap = cacheResult(
  'imageBitmap',
  function imageBitmap(...arguments_) {
    return createImageBitmap(this.$store.blob, ...arguments_)
  },
)

export {imageBitmap}
