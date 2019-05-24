import getType from './get-type'

function isBlob(x) {
  const type = getType(x)

  return type === 'Blob' || type === 'File'
}

export default isBlob
