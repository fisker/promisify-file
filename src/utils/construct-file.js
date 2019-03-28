import {SUPPORTS_FILE_CONSTRUCTOR} from '../supports'

import globalThis from './global-this'

const {File, Blob} = globalThis

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

export default (SUPPORTS_FILE_CONSTRUCTOR ? toFile : toBlob)
