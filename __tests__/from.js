/**
 * @jest-environment jsdom-thirteen
 */

import PromisifyFile from '../src'
import {textFile, htmlFile, pngFile, svgFile} from './shared/fixures'

describe('from', () => {
  test('File', async () => {
    const file = await PromisifyFile.from(textFile)

    const json = await file.json()
    expect(json).toEqual(JSON.parse(textFile.content))
  })

  test('Blob', async () => {
    const file = await PromisifyFile.from(new window.Blob([textFile]))
    const json = await file.json()
    expect(json).toEqual(JSON.parse(textFile.content))
  })

  test.skip('XMLHttpRequest', async () => {})

  test('HTMLImageElement', async () => {
    const image = new window.Image()
    image.src = `data:image/png;base64,${pngFile.content.toString('base64')}`
    const file = await PromisifyFile.from(image)

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
