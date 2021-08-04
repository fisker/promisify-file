import {DOMParser} from './global-this.js'
import throwParserError from './throw-dom-parser-error.js'

function textToDocument(text, mimeType) {
  const parser = new DOMParser()
  const document = parser.parseFromString(text, mimeType)
  throwParserError(document)
  return document
}

export default textToDocument
