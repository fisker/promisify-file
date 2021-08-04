import textToDocument from '../../utils/text-to-document.js'
import cacheResult from '../helper/cache-result.js'

import {DOMPARSER_TYPES} from '../../constants.js'

function cacheKey(type) {
  return `document[${type}]`
}

function parseDocumentWithType(type) {
  return cacheResult(cacheKey(type), async function document() {
    const text = await this.text()
    return textToDocument(text, type)
  })
}

function document(type) {
  type = type || this.$store.blob.type
  return parseDocumentWithType(type).call(this)
}

const xml = parseDocumentWithType(DOMPARSER_TYPES.xml)
const svg = parseDocumentWithType(DOMPARSER_TYPES.svg)
const html = parseDocumentWithType(DOMPARSER_TYPES.html)

export {document, xml, svg, html}
