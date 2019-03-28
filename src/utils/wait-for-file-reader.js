import promisify from './promisify'
import on from './on'

function waitForFileReader(resolve, reject, fileReader) {
  if (fileReader.result) {
    return resolve(fileReader.result)
  }

  if (fileReader.error) {
    return reject(fileReader.error)
  }

  on(fileReader, 'load', function() {
    resolve(fileReader.result)
  })

  on(fileReader, 'error', function() {
    reject(fileReader.error)
  })
}

export default promisify(waitForFileReader)
