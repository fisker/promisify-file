import getRenderingContext2D from './get-rendering-context.js'

function drawImage(image) {
  const context = getRenderingContext2D(
    image.naturalWidth || image.width,
    image.naturalHeight || image.height
  )
  context.drawImage(image, 0, 0)
  return context
}

export default drawImage
