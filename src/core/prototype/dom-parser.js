import append from '../../utils/append-arguments'
import textToDocument from '../../utils/text-to-document'

import {DOMPARSER_TYPES} from '../../constants'

async function document(type) {
  type = type || this.$store.blob.type
  const text = await this.text()

  return textToDocument(text, type)
}

const xml = append(document, DOMPARSER_TYPES.xml)
const svg = append(document, DOMPARSER_TYPES.svg)
const html = append(document, DOMPARSER_TYPES.html)

export {document, xml, svg, html}
