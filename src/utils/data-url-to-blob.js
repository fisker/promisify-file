import {atob, Uint8Array, Blob} from './global-this'

function dataURLToBlob(data, type) {
  const binary = atob(data.split(',')[1])
  const array = Uint8Array.from(binary, byte => byte.charCodeAt(0))

  return new Blob([array], {
    type,
  })
}

export default dataURLToBlob
