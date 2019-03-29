import {URL} from '../../utils/global-this'
import toPromise from '../../utils/async'
import cacheResult from '../helper/cache-result'

// get `URL`
const urlSync = cacheResult('url', function url() {
  return URL.createObjectURL(this.$store.blob)
})

const url = toPromise(urlSync)

export {url, urlSync}
