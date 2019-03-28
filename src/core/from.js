import isThenAble from '../utils/it-then-able'
import append from '../utils/append'
import File from './file'
import isThenAble from './../utils/is-then-able';
import getType from './../utils/get-type';
import waitForXMLHttpRequest from '../utils/wait-for-xmlhttp-request'

function parseFromData(data, options) {
  const parser = () => parseFromData(options)

  // Promise
  if (isThenbable(data)) {
    return data.then(parser)
  }

  const type = getType(data)

  if (type === 'Blob' || type === 'File') {
    return data
  }

  if (type === 'XMLHttpRequest') {
    return waitForXMLHttpRequest(data).then(parser)
  }

  if (type === 'HTMLImageElement') {
    return waitForImage(data)
      .then(drawImage)
      .then(parser)
  }

  if (type === 'ImageBitmap') {
    return parser(drawImage(data))
  }

  if (type === 'ImageData') {
    return parser(putImageData(data))
  }

  if (type === 'FileReader') {
    return waitForFileReader(data).then(parser)
  }

  if (isBody(data)) {
    return data.blob()
  }

  if (isDocument(data)) {
    return parser(documentToText(data))
  }

  // HTMLCanvasElement
  if (type === 'HTMLCanvasElement') {
    return canvasToBlob(data, options.type, options.quality)
  }

  // OffscreenCanvas
  if (type === 'OffscreenCanvas') {
    return data.convertToBlob(options)
  }

  // RenderingContext
  if (isRenderingContext(data)) {
    return parser(data.canvas)
  }

  if (base64DataURLPattern.test(data)) {
    try {
      const blob = parseBase64DataURL(data)
      if (blob) {
        return blob
      }
    } catch (error) {}
  }

  if (/^(?:blob|data):/.test(data)) {
    return fetch(data).then(parser)
  }

  if (!supports.blobConstructorWithDataView && isDataView(data)) {
    return parser(data.buffer)
  }

  // if (type === 'ArrayBuffer' || ArrayBuffer.isView(data)) {
  //   return new Blob([data])
  // }

  return new Blob([data], options)
}

function parseData(data, options = {}) {
  const blob = parseFromData(data, options)
  const promise = isThenAble(blob) ? blob : Promise.resolve(blob)

  return promise.then(() => new File(blob, options))
}

export default parseData
