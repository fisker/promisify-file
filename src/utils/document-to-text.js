import {XMLSerializer} from './global-this.js'

function documentToText(document) {
  return (
    document.documentElement.outerHTML ||
    new XMLSerializer().serializeToString(document)
  )
}

export default documentToText
