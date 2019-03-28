import constructFile from '../../utils/construct-file'

// get `File`
function file(name, options) {
  const file = constructFile(
    [this.$store.blob],
    name || this.$store.blob.name,
    options || this.$store.blob
  )
  return Promise.resolve(file)
}

export default {
  file,
}
