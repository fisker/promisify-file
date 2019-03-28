import globalThis from './global-this'
import throwParserError from './throw-dom-parser-error'

const {DOMParser} = globalThis
function textToDocument(text, mimeType) {
  const parser = new DOMParser()
  const document = parser.parseFromString(text, mimeType)
  throwParserError(document)
  return document
}

export default textToDocument
