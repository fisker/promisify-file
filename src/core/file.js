import {Blob} from '../utils/global-this'
import defineValues from '../utils/define-values'

import constructFile from '../utils/construct-file'
import isBlob from '../utils/is-blob'
import {CONSTRUCTOR_DATA_TYPE_ERROR} from '../constants'
import * as prototype from './prototype'

class File {
  constructor(data, options = {}) {
    if (!isBlob(data)) {
      throw new TypeError(`${CONSTRUCTOR_DATA_TYPE_ERROR}, got ${typeof data}`)
    }

    let blob = data
    const type = options.type || data.type
    const name = options.name || data.name
    const lastModified = options.lastModified || data.lastModified

    if (
      type !== data.type ||
      name !== data.name ||
      lastModified !== data.lastModified
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
