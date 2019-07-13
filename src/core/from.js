import {Blob} from '../utils/global-this'
import isThenAble from '../utils/is-then-able'
import File from './file'
import getType from '../utils/get-type'
import waitForXMLHttpRequest from '../utils/wait-for-xmlhttp-request'
import waitForImage from '../utils/wait-for-image'
import waitForFileReader from '../utils/wait-for-file-reader'
import drawImage from '../utils/draw-image'
import putImageData from '../utils/put-image-data'
import isBody from '../utils/is-body'
import isDocument from '../utils/is-document'
import documentToText from '../utils/document-to-text'
import canvasToBlob from '../utils/canvas-to-blob'
import isRenderingContext from '../utils/is-rendering-context'
import isDataURL from '../utils/is-data-url'
import dataURLToBlob from '../utils/data-url-to-blob'
import download from '../utils/download'
import {SUPPORTS_BLOB_CONSTRUCTOR_WITH_DATA_VIEW} from '../supports'
import isDataView from '../utils/is-data-view'

function parseFromData(data, options) {
  const parser = () => parseFromData(options)

  // Promise
  if (isThenAble(data)) {
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

  if (isDataURL(data)) {
    try {
      const blob = dataURLToBlob(data)
      if (blob) {
        return blob
      }
    } catch (error) {}
  }

  if (/^(?:blob|data):/.test(data)) {
    return download(data).then(parser)
  }

  if (!SUPPORTS_BLOB_CONSTRUCTOR_WITH_DATA_VIEW && isDataView(data)) {
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
  return promise.then(blob => new File(blob, options))
}

export default parseData
