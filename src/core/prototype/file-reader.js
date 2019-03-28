import {arrayBuffer, text, dataURL, binaryString} from 'promify-file-reader'

import {DEFAULT_TEXT_ENCODING} from '../../constants'

function wrap(method, dataType) {
  return function(...arguments_) {
    let cacheKey = dataType

    if (cacheKey === 'text') {
      const [
        encoding = this.$options.encoding || DEFAULT_TEXT_ENCODING,
      ] = arguments_
      cacheKey += `.${String(encoding).toUpperCase()}`
    }

    const {$store: store} = this

    if (!store[cacheKey]) {
      const {blob} = store
      store[cacheKey] = method(blob, ...arguments_)
    }

    return store[cacheKey]
  }
}

const methods = {
  arrayBuffer,
  text,
  dataURL,
  binaryString,
}

const wrapped = {}
const types = Object.keys(methods)

for (const type of types) {
  wrapped[type] = wrap(methods[type], type)
}

export default wrapped
