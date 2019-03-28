import drawImage from './draw-image'

function getImageData(image, sx, sy, sw, sh) {
  sx = sx || 0
  sy = sy || 0
  sw = sw || image.naturalWidth || image.width
  sh = sh || image.naturalHeight || image.height

  const context = drawImage(image)

  return context.getImageData(sx, sy, sw, sh)
}

export default getImageData
