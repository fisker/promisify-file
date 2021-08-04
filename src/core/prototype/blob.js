import {Blob} from '../../utils/global-this.js'
import toPromise from '../../utils/async.js'

// get `Blob`
function blobSync(options = {}) {
  const {blob} = this.$store
  options = {
    ...blob,
    ...options,
  }

  return new Blob([blob], options)
}

const blob = toPromise(blobSync)

export {blob, blobSync}
