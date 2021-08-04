import {
  readAsArrayBuffer,
  readAsText,
  readAsDataURL,
  readAsBinaryString,
} from 'promisify-file-reader'

import cacheResult from '../helper/cache-result.js'

import {DEFAULT_TEXT_ENCODING} from '../../constants.js'

const methods = {
  arrayBuffer: readAsArrayBuffer,
  text: readAsText,
  dataURL: readAsDataURL,
  binaryString: readAsBinaryString,
}

function readAs(dataType) {
  const method = methods[dataType]

  function cacheKey(encoding) {
    if (dataType !== 'text') {
      return dataType
    }

    encoding = String(
      encoding || this.$options.encoding || DEFAULT_TEXT_ENCODING
    ).toUpperCase()

    return `${dataType}[${encoding}]`
  }

  function readAs(...arguments_) {
    return method(this.$store.blob, ...arguments_)
  }

  return cacheResult(cacheKey, readAs)
}

const arrayBuffer = readAs('arrayBuffer')
const text = readAs('text')
const dataURL = readAs('dataURL')
const binaryString = readAs('binaryString')

export {arrayBuffer, text, dataURL, binaryString}
