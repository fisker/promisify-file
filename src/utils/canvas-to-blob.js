import promisify from './promisify.js'
import parseBase64DataURL from './data-url-to-blob.js'

function canvasToBlob(resolve, reject, canvas, type, quality) {
  if (canvas.toBlob) {
    return canvas.toBlob(resolve, type, quality)
  }

  if (canvas.convertToBlob) {
    return resolve(canvas.convertToBlob(type, quality))
  }

  const url = canvas.toDataURL(type, quality)
  const blob = parseBase64DataURL(url)
  return resolve(blob)
}

export default promisify(canvasToBlob)
