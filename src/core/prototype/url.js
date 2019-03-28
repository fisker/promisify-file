import {URL} from '../../utils/global-this'

// get `URL`
function url() {
  const url = URL.createObjectURL(this.$store.blob)
  return Promise.resolve(url)
}

export default {
  url,
}
