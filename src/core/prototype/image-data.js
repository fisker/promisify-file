
import getImageData from '../../utils/get-image-data'

async function imageData(sx, sy, sw, sh) {
  const image = await this.image()
  return getImageData(image, sx, sy, sw, sh)
}

export {imageData}
