import globalThis from './global-this'

const {XMLSerializer} = globalThis

function documentToText(document) {
  return (
    document.documentElement.outerHTML ||
    new XMLSerializer().serializeToString(document)
  )
}

export default documentToText
