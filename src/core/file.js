import {Blob} from '../utils/global-this'
import defineValues from '../utils/define-values'

import constructFile from '../utils/construct-file'

import blob from './prototype/blob'
import domParser from './prototype/dom-parser'
import file from './prototype/file'
import fileReader from './prototype/file-reader'
import image from './prototype/image'
import imageBitmap from './prototype/image-bitmap'
import imageData from './prototype/image-data'
import json from './prototype/json'
import typedArray from './prototype/typed-array'
import url from './prototype/url'

const prototype = {
  ...blob,
  ...domParser,
  ...file,
  ...fileReader,
  ...image,
  ...imageBitmap,
  ...imageData,
  ...json,
  ...typedArray,
  ...url,
}

class File {
  constructor(data, options = {}) {
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
