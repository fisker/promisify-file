import getType from './get-type'
import isObject from './is-object';

function isBlob(x) {
  const type = getType(x)

  return type === 'Blob' || type === 'File'
}

export default isBlob