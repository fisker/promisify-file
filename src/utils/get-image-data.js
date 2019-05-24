import drawImage from './draw-image'

function getImageData(
  image,
  sx = 0,
  sy = 0,
  sw = image.naturalWidth || image.width,
  sh = image.naturalHeight || image.height
) {
  const context = drawImage(image)

  return context.getImageData(sx, sy, sw, sh)
}

export default getImageData
