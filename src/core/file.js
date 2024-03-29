import {Blob} from '../utils/global-this.js'
import defineValues from '../utils/define-values.js'
import constructFile from '../utils/construct-file.js'
import isBlob from '../utils/is-blob.js'
import {CONSTRUCTOR_DATA_TYPE_ERROR} from '../constants.js'
import * as prototype from './prototype/index.js'

class File {
  constructor(data, options = {}) {
    if (!isBlob(data)) {
      throw new TypeError(`${CONSTRUCTOR_DATA_TYPE_ERROR}, got ${typeof data}`)
    }

    let blob = data
    const {
      type = blob.type,
      name = blob.name,
      lastModified = blob.lastModified,
    } = options

    if (
      type !== blob.type ||
      name !== blob.name ||
      lastModified !== blob.lastModified
    ) {
      if (name) {
        blob = constructFile([data], name, {
          type,
          lastModified,
        })
      } else {
        blob = new Blob([data], {
          type,
        })
      }
    }

    this.$store = {
      original: data,
      blob,
    }
    this.$options = options
  }
}

defineValues(File.prototype, prototype)

export default File
