import {from} from '../src/index.js'
import {textFile, htmlFile, pngFile, svgFile} from './shared/fixures.js'

describe('from', () => {
  test('File', async () => {
    const file = await from(textFile.file)
    const json = await file.json()
    expect(json).toEqual(JSON.parse(textFile.content))
  })

  test('Blob', async () => {
    const file = await from(new window.Blob([textFile.file]))
    const json = await file.json()
    expect(json).toEqual(JSON.parse(textFile.content))
  })

  test.skip('XMLHttpRequest', async () => {})

  test.skip('HTMLImageElement', async () => {
    const image = new window.Image()
    image.src = `data:image/png;base64,${pngFile.content.toString('base64')}`
    console.log(Object.prototype.toString.call(image))
    const file = await from(image)

    const url = file.dataURL()

    expect(url).toBe(
      `data:image/png;base64,${pngFile.content.toString('base64')}`
    )
  })

  test.skip('ImageBitmap', async () => {})

  test.skip('ImageData', async () => {
    const canvas = window.document.createElement('canvas')
    const context = canvas.getContext('2d')
    const imageData = context.getImageData(0, 0, 1, 1)
  })
})
