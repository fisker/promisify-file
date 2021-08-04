import {XMLHTTP_TIMEOUT_ERROR, XMLHTTP_LOAD_ERROR} from '../constants.js'
import promisify from './promisify.js'
import on from './on.js'
import parseXHRData from './parse-xmlhttp-request-data.js'

function waitForXMLHttpRequest(resolve, reject, xhr) {
  if (xhr.readyState === 4) {
    resolve(parseXHRData(xhr))
    return
  }

  on(xhr, 'load', function () {
    resolve(parseXHRData(xhr))
  })
  on(xhr, 'error', function () {
    reject(new Error(XMLHTTP_LOAD_ERROR))
  })
  on(xhr, 'timeout', function () {
    reject(new Error(XMLHTTP_TIMEOUT_ERROR))
  })
}

export default promisify(waitForXMLHttpRequest)
