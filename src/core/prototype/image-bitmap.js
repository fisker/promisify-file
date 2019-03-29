import {createImageBitmap} from '../../utils/global-this'

// get `ImageBitmap`
function imageBitmap(...arguments_) {
  return createImageBitmap(this.$store.blob, ...arguments_)
}

export {imageBitmap}
