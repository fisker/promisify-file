import {SUPPORTS_FILE_CONSTRUCTOR} from '../supports.js'
import {File, Blob} from './global-this.js'

function toFile(parts, fileName, options) {
  return new File(parts, fileName, options)
}

// use Blob as as fake File
function toBlob(parts, fileName, options) {
  const blob = new Blob(parts, options)
  blob.name = fileName
  blob.lastModified = options.lastModified || Date.now()
  return blob
}

export default SUPPORTS_FILE_CONSTRUCTOR ? toFile : toBlob
