import promisify from './promisify'
import on from './on'
import parseXHRData from './parse-xmlhttp-request-data'

function waitForXMLHttpRequest(resolve, reject, xhr) {
  if (xhr.readyState === 4) {
    resolve(parseXHRData(xhr))
    return
  }

  on(xhr, 'load', function() {
    resolve(parseXHRData(xhr))
  })
  on(xhr, 'error', function() {
    reject(new Error('XMLHttpRequest load failed.'))
  })
  on(xhr, 'timeout', function() {
    reject(new Error('XMLHttpRequest timeout.'))
  })
}

export default promisify(waitForXMLHttpRequest)
