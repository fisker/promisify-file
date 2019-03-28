import globalThis from '../../utils/global-this'

const {Blob} = globalThis

// get `Blob`
function toBlob(options) {
  const blob = new Blob([this.$store.blob], options || this.$store.blob)
  return Promise.resolve(blob)
}

export default {
  blob: toBlob,
}
