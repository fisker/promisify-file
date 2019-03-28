import loadImage from '../../utils/load-image'

function image() {
  return this.dataURL().then(loadImage)
}

export default {
  image,
}
