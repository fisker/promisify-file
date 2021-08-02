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
  const parse = (data) => parseFromData(data, options)

  // Promise
  if (isThenAble(data)) {
    return data.then(parse)
  }

  const type = getType(data)

  if (type === 'Blob' || type === 'File') {
    return data
  }

  if (type === 'XMLHttpRequest') {
    return waitForXMLHttpRequest(data).then(parse)
  }

  if (type === 'HTMLImageElement') {
    return waitForImage(data).then(drawImage).then(parse)
  }

  if (type === 'ImageBitmap') {
    return parse(drawImage(data))
  }

  if (type === 'ImageData') {
    return parse(putImageData(data))
  }

  if (type === 'FileReader') {
    return waitForFileReader(data).then(parse)
  }

  if (isBody(data)) {
    return data.blob()
  }

  if (isDocument(data)) {
    return parse(documentToText(data))
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
    return parse(data.canvas)
  }

  if (isDataURL(data)) {
    try {
      const blob = dataURLToBlob(data)
      if (blob) {
        return blob
      }
    } catch {}
  }

  if (/^(?:blob|data):/.test(data)) {
    return download(data).then(parse)
  }

  if (!SUPPORTS_BLOB_CONSTRUCTOR_WITH_DATA_VIEW && isDataView(data)) {
    return parse(data.buffer)
  }

  // if (type === 'ArrayBuffer' || ArrayBuffer.isView(data)) {
  //   return new Blob([data])
  // }

  return new Blob([data], options)
}

function parseData(data, options = {}) {
  const blob = parseFromData(data, options)
  const promise = isThenAble(blob) ? blob : Promise.resolve(blob)
  return promise.then((blob) => new File(blob, options))
}

export default parseData
