/**
 * @jest-environment jsdom-thirteen
 */

import PromisifyFile from '../src'
import {textFile, htmlFile, pngFile, svgFile} from './shared/fixures'

const testTextFile = new PromisifyFile(textFile.file)
const testHTMLFile = new PromisifyFile(htmlFile.file)
const testPNGFile = new PromisifyFile(pngFile.file)
const testSVGFile = new PromisifyFile(svgFile.file)

describe('prototype', () => {
  test('arrayBuffer', async () => {
    const buffer = await testTextFile.arrayBuffer()

    expect(buffer).toBeInstanceOf(window.ArrayBuffer)
  })

  test('text', async () => {
    const text = await testTextFile.text()

    expect(text).toBe(textFile.content)
  })

  test('text with encoding', async () => {
    const text = await testTextFile.text('utf8')

    expect(text).toBe(textFile.content)
  })

  test('text should store in different location', async () => {
    const text1 = testTextFile.text('utf8')
    const text2 = testTextFile.text('ascii')

    expect(text1).toBe(testTextFile.$store['text[UTF8]'])
    expect(text2).toBe(testTextFile.$store['text[ASCII]'])
    expect(await text1).not.toBe(await text2)
  })

  test('dataURL(text)', async () => {
    const url = await testTextFile.dataURL()
    const [, content] = url.split(',')
    const encoded = encodeURIComponent(textFile.content)
    expect(content).toBe(encoded)
  })

  test('dataURL(png)', async () => {
    const url = await testPNGFile.dataURL()

    expect(url).toBe(
      `data:image/png;base64,${pngFile.content.toString('base64')}`
    )
  })

  test('binaryString', async () => {
    const binaryString = await testTextFile.binaryString()

    expect(binaryString).toBe(Buffer.from(textFile.content).toString('binary'))
  })

  test('blob', async () => {
    const newBlob = await testTextFile.blob({
      type: 'text/html',
    })

    expect(newBlob).toBeInstanceOf(window.Blob)

    expect(newBlob.type).toBe('text/html')
  })

  test('blobSync', () => {
    const newBlob = testTextFile.blobSync({
      type: 'text/html',
    })

    expect(newBlob).toBeInstanceOf(window.Blob)

    expect(newBlob.type).toBe('text/html')
  })

  test('file', async () => {
    const filename = `${Math.random()}.html`
    const type = 'text/html'
    const file = await testTextFile.file(filename, {
      type,
    })

    expect(file).toBeInstanceOf(window.File)
    expect(file.name).toBe(filename)
    expect(file.type).toBe(type)
  })

  test('fileSync', () => {
    const filename = `${Math.random()}.html`
    const type = 'text/html'
    const file = testTextFile.fileSync(filename, {
      type,
    })

    expect(file).toBeInstanceOf(window.File)
    expect(file.name).toBe(filename)
    expect(file.type).toBe(type)
  })

  test('document', async () => {
    const document = await testHTMLFile.document()
    expect(document).toBeInstanceOf(window.Document)
  })

  test('html', async () => {
    const htmlDocument = await testHTMLFile.html()
    expect(htmlDocument).toBeInstanceOf(window.HTMLDocument)
    expect(htmlDocument.documentElement).toBeInstanceOf(window.HTMLHtmlElement)
    expect(htmlDocument.body).toBeInstanceOf(window.HTMLBodyElement)
    expect(htmlDocument.getElementById('test')).toBeInstanceOf(
      window.HTMLInputElement
    )
  })

  // can't test with jsdom
  test.skip('xml', async () => {
    const xmlDocument = await testSVGFile.xml()
    expect(xmlDocument).toBeInstanceOf(window.XMLDocument)
  })

  // can't test with jsdom
  test.skip('svg', async () => {
    const svgDocument = await testSVGFile.svg()
    expect(svgDocument).toBeInstanceOf(window.SVGDocument)
    expect(svgDocument.getElementById('test')).toBeInstanceOf(
      window.SVGCircleElement
    )
  })

  test('broken xml', async () => {
    await expect(testHTMLFile.xml()).rejects.toThrow()
  })

  test('image', async () => {
    const image = await testPNGFile.image()
    expect(image).toBeInstanceOf(window.HTMLImageElement)
    expect(image.naturalWidth).toBe(500)
  })

  // jsdom don't support `createImageBitmap` yet
  test.skip('imageBitmap', async () => {
    const imageBitmap = await testPNGFile.imageBitmap()
    expect(imageBitmap).toBeInstanceOf(window.ImageBitmap)
    expect(imageBitmap.width).toBe(500)
  })

  test('json', async () => {
    const json = await testTextFile.json()
    expect(json).toEqual(JSON.parse(textFile.content))
  })

  const types = [
    'dataView',
    'float32Array',
    'float64Array',
    'int16Array',
    'int32Array',
    'int8Array',
    'uint16Array',
    'uint32Array',
    'uint8Array',
    'uint8ClampedArray',
  ]

  for (const type of types) {
    test(type, async () => {
      const string = String(Math.random() * Date.now())
        .toString(36)
        .repeat(64)
      const pf = new PromisifyFile(new window.Blob([string]))
      const view = await pf[type]()
      const TypedArray = window[type[0].toUpperCase() + type.slice(1)]
      expect(view).toBeInstanceOf(TypedArray)
    })
  }

  // jsdom use dataURL as url
  test.skip('url', async () => {
    const url = await testPNGFile.url()
    const dataURL = await testPNGFile.dataURL()
    expect(url).toBe(dataURL)
  })

  // jsdom use dataURL as url
  test.skip('urlSync', async () => {
    const url = testPNGFile.urlSync()
    const dataURL = await testPNGFile.dataURL()
    expect(url).toBe(dataURL)
  })
})
