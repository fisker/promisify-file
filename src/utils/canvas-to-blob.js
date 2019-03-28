import promisify from './promisify'
import parseBase64DataURL from './dataurl-to-blob'

function canvasToBlob(resolve, reject, canvas, type, quality) {
  if (canvas.toBlob) {
    return canvas.toBlob(resolve, type, quality)
  }

  if (canvas.convertToBlob) {
    return canvas.convertToBlob(type, quality).then(resolve)
  }

  const url = canvas.toDataURL(type, quality)
  const blob = parseBase64DataURL(url)
  return resolve(blob)
}

export default promisify(canvasToBlob)
