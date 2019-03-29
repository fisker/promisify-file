import {
  readAsArrayBuffer,
  readAsText,
  readAsDataURL,
  readAsBinaryString,
} from 'promisify-file-reader'

import {DEFAULT_TEXT_ENCODING} from '../../constants'

const methods = {
  arrayBuffer: readAsArrayBuffer,
  text: readAsText,
  dataURL: readAsDataURL,
  binaryString: readAsBinaryString,
}

function readAs(dataType) {
  const method = methods[dataType]

  return function readAs(encoding) {
    encoding = String(
      encoding || this.$options.encoding || DEFAULT_TEXT_ENCODING
    ).toUpperCase()

    const storeKey = dataType === 'text' ? dataType : `${dataType}.${encoding}`

    const {$store: store} = this

    if (!store[storeKey]) {
      store[storeKey] = method(store.blob, encoding)
    }

    return store[storeKey]
  }
}

const arrayBuffer = readAs('arrayBuffer')
const text = readAs('text')
const dataURL = readAs('dataURL')
const binaryString = readAs('binaryString')

export {arrayBuffer, text, dataURL, binaryString}
