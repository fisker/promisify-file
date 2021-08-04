import append from './append-arguments.js'
import textToDocument from './text-to-document.js'
import memoize from './memoize.js'

function getDOMParser(mimeType) {
  return append(textToDocument, mimeType)
}

export default memoize(getDOMParser)
