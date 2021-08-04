import constructFile from '../../utils/construct-file.js'
import toPromise from '../../utils/async.js'

// get `File`
function fileSync(name, options = '') {
  const {blob} = this.$store
  name = name || blob.name
  options = {
    ...blob,
    ...options,
  }

  return constructFile([blob], name, options)
}

const file = toPromise(fileSync)

export {fileSync, file}
