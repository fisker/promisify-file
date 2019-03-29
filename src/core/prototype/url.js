import {URL} from '../../utils/global-this'
import toPromise from '../../utils/async'

// get `URL`
function urlSync() {
  return URL.createObjectURL(this.$store.blob)
}

const url = toPromise(urlSync)

export {url, urlSync}
