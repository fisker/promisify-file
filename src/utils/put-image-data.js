import getRenderingContext2D from './get-rendering-context'

function putImageData(data) {
  const context = getRenderingContext2D(data.width, data.height)
  context.putImageData(data, 0, 0)
  return context
}

export default putImageData
