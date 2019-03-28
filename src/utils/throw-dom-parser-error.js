// DOMParser
function throwParserError(document) {
  const parserError = document.getElementsByTagName('parsererror')[0]

  if (parserError) {
    throw new Error(parserError.textContent || parserError.textContent)
  }

  return document
}

export default throwParserError
