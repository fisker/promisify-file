// DOMParser
function throwParserError(document) {
  const parserError = document.getElementsByTagName('parsererror')[0]

  if (parserError) {
    // eslint-disable-next-line unicorn/prefer-text-content
    throw new Error(parserError.innerText || parserError.textContent)
  }

  return document
}

export default throwParserError
