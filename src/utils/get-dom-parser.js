import append from './append-arguments'
import textToDocument from './text-to-document'
import memoize from './memoize'

function getDOMParser(mimeType) {
  return append(textToDocument, mimeType)
}

export default memoize(getDOMParser)
