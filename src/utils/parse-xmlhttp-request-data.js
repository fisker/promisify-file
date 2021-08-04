import {XHR_RESPONSE_TYPES} from '../constants.js'

function parseXHRData(xhr) {
  switch (xhr.responseType) {
    case XHR_RESPONSE_TYPES.none:
    case XHR_RESPONSE_TYPES.text:
      return xhr.responseText
    case XHR_RESPONSE_TYPES.json:
      return JSON.stringify(xhr.response)
    case XHR_RESPONSE_TYPES.document:
      return xhr.responseXML
    default:
      return xhr.response
  }
}

export default parseXHRData
