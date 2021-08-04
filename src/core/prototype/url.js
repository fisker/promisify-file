import {URL} from '../../utils/global-this.js'
import toPromise from '../../utils/async.js'
import cacheResult from '../helper/cache-result.js'

// get `URL`
const urlSync = cacheResult('url', function url() {
  return URL.createObjectURL(this.$store.blob)
})

const url = toPromise(urlSync)

export {url, urlSync}
