import promisify from './promisify.js'
import on from './on.js'

function waitForFileReader(resolve, reject, fileReader) {
  if (fileReader.result) {
    resolve(fileReader.result)
    return
  }

  if (fileReader.error) {
    reject(fileReader.error)
    return
  }

  on(fileReader, 'load', function () {
    resolve(fileReader.result)
  })

  on(fileReader, 'error', function () {
    reject(fileReader.error)
  })
}

export default promisify(waitForFileReader)
