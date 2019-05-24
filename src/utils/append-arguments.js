import prepend from './prepend-arguments'
import curry from './curry'
import {CURRY_SIDE_END} from '../constants'

// export default  curry(CURRY_SIDE_START, curry, CURRY_SIDE_START)
export default prepend(curry, CURRY_SIDE_END)
