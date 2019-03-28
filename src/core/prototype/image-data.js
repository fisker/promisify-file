import append from '../../utils/append-arguments'
import getImageData from '../../utils/get-image-data'

function imageData(sx, sy, sw, sh) {
  const parser = append(getImageData, sx, sy, sw, sh)
  return this.image().then(parser)
}

export default {
  imageData,
}
