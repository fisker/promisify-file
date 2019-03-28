import {TYPED_ARRAYS} from '../../constants'

import globalThis from '../../utils/global-this'
import cameCase from '../../utils/camel-case'
import memoize from '../../utils/memoize'
import prepend from '../../utils/prepend'
import append from '../../utils/append'

const getArrayBufferParser = memoize(function getDOMParser(viewType) {
  const TypedArray = globalThis[viewType]
  return prepend(arrayBufferToView, TypedArray)
})

const methods = {}

for (const type of TYPED_ARRAYS) {
  const parser = getArrayBufferParser(type)
  methods[cameCase(type)] = prepend(toArrayBufferView, parser)
}
function arrayBufferToView(TypedArray, buffer, byteOffset, length) {
  return new TypedArray(buffer, byteOffset, length)
}

function toArrayBufferView(parser, byteOffset, length) {
  parser = append(parser, byteOffset, length)
  return this.arrayBuffer().then(parser)
}

export default methods
