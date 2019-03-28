import getDOMParser from '../../utils/get-dom-parser'
import append from '../../utils/append-arguments'

import {MIME_TYPES} from '../../constants'

function toDocument(encoding, mimeType) {
  encoding = encoding || this.$options.encoding
  mimeType = mimeType || this.$store.blob.type
  const parser = getDOMParser(mimeType)
  return this.text(encoding).then(parser)
}

export default {
  document: toDocument,
  xml: append(toDocument, MIME_TYPES.xml),
  svg: append(toDocument, MIME_TYPES.svg),
  html: append(toDocument, MIME_TYPES.html),
}
