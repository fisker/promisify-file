import {CURRY_SIDE_END} from '../constants.js'
import prepend from './prepend-arguments.js'
import curry from './curry.js'

// export default  curry(CURRY_SIDE_START, curry, CURRY_SIDE_START)
export default prepend(curry, CURRY_SIDE_END)
