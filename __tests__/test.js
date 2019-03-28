window.regeneratorRuntime = require('regenerator-runtime')

if (!window.Promise) {
  require('core-js/es6/promise')
}

if (!window.fetch) {
  require('whatwg-fetch')
}
if (!window.Uint8ClampedArray) {
  require('core-js/fn/typed/uint8-clamped-array')
}

const PromisifyFile = require('.')

const testText = 'hello promisify-file'
const imageArr = [
  137,
  80,
  78,
  71,
  13,
  10,
  26,
  10,
  0,
  0,
  0,
  13,
  73,
  72,
  68,
  82,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  1,
  8,
  6,
  0,
  0,
  0,
  31,
  21,
  196,
  137,
  0,
  0,
  0,
  11,
  73,
  68,
  65,
  84,
  24,
  87,
  99,
  96,
  0,
  2,
  0,
  0,
  5,
  0,
  1,
  170,
  213,
  200,
  81,
  0,
  0,
  0,
  0,
  73,
  69,
  78,
  68,
  174,
  66,
  96,
  130,
]

const getFile = (function() {
  function testFileSupport() {
    try {
      new File([], 'test') // eslint-disable-line
    } catch (error) {
      return false
    }

    return true
  }

  let getFile = function getFile(parts, fileName, options) {
    return new File(parts, fileName, options)
  }
  const supportNewFile = testFileSupport()

  if (!supportNewFile) {
    getFile = function getFile(parts, fileName, options) {
      const blob = new Blob(parts, options)
      blob.name = fileName
      blob.lastModified = options.lastModified || Date.now()
      return blob
    }
  }

  return getFile
})()

;(async () => {
  const ts = Date.now()
  const imageBIN = imageArr
    .map(function(chr) {
      return String.fromCharCode(chr)
    })
    .join('')
  const textFile = getFile([testText], 'pf.txt', {
    type: 'text/plain',
  })
  const textBlob = new Blob([testText])
  const imageFile = getFile([new Int8Array(imageArr).buffer], 'pf.png', {
    type: 'image/png',
  })
  const xmlBlob = new Blob(['<xml><hello>promisify-file</hello></xml>'])
  const xmlFile = getFile(
    ['<xml><hello>promisify-file</hello></xml>'],
    'pf.xml',
    {
      type: 'text/xml',
    }
  )
  const htmlFile = getFile(
    ['<!DOCTYPE html><html lang="en"><head></head><body></body></html>'],
    'pf.html',
    {
      type: 'text/html',
    }
  )
  const svgFile = getFile(
    ['<svg xmlns="http://www.w3.org/2000/svg"></svg>'],
    'pf.svg',
    {
      type: 'image/svg+xml',
    }
  )

  const textFilePf = await PromisifyFile.from(fetch('./fixture/text.txt'))
  const textBlobPf = await PromisifyFile.from(fetch('./fixture/text.txt'), {
    name: 'text.txt',
  })
  const imagePf = await PromisifyFile.from(fetch('./fixture/image.png'), {
    name: 'image.png',
  })

  const container = document.getElementById('js-result')

  function showResult(testDesc, td, expect) {
    if (typeof expect === 'undefined') {
      expect = true
    }
    return result => {
      console.assert(result === expect, testDesc, result, expect)
      if (result === expect) {
        td.innerHTML = '<span class="pass">pass ✓</span>'
      } else {
        console.log(result, expect)
        td.innerHTML = '<span class="fail">fail ✖</span>'
      }
    }
  }

  function test(testDesc, fn, expect) {
    const tr = document.createElement('tr')
    const testTd = document.createElement('td')
    testTd.textContent = testDesc
    const resultTd = document.createElement('td')
    resultTd.textContent = 'running'

    const setResult = showResult(testDesc, resultTd, expect)
    try {
      const result = fn()
      if (result.then) {
        result.then(setResult, setResult)
      } else {
        setResult(result)
      }
    } catch (error) {
      setResult(error)
    }

    tr.appendChild(testTd)
    tr.appendChild(resultTd)
    container.appendChild(tr)
  }

  test(
    'arrayBuffer',
    async () => {
      return (await textFilePf.arrayBuffer()).byteLength
    },
    testText.length
  )

  test(
    'text',
    async () => {
      return await textFilePf.text()
    },
    testText
  )

  test(
    'dataURL',
    async () => {
      return await textFilePf.dataURL()
    },
    `data:text/plain;base64,${btoa(testText)}`
  )

  test('`Blob` dataURL', async () => {
    const url = await textBlobPf.dataURL()
    const text = btoa(testText)
    return url.slice(-text.length) === text
  })

  test(
    'BinaryString',
    async () => {
      return await imagePf.binaryString()
    },
    imageBIN
  )

  test('blob', async () => {
    const blob = await imagePf.blob()
    return (
      !blob.name &&
      (await imagePf.dataURL()) === (await new PromisifyFile(blob).dataURL())
    )
  })

  test('file', async () => {
    const newFileName = `${Date.now()}.png`
    const file = await imagePf.file(newFileName)
    return (
      file.name === newFileName &&
      (await imagePf.dataURL()) === (await new PromisifyFile(file).dataURL())
    )
  })

  test(
    'json',
    async () => {
      const data = {
        hello: ts,
      }
      const str = JSON.stringify(data)
      const blob = new Blob([str])
      const pf = new PromisifyFile(blob)
      return (await pf.json()).hello
    },
    ts
  )

  test('url', async () => {
    const url = await imagePf.url()
    return url.slice(0, 5) === 'blob:'
  })

  test('image', async () => {
    const image = await imagePf.image()
    return (
      image.tagName === 'IMG' &&
      image.naturalHeight === 1 &&
      image.naturalWidth === 1
    )
  })

  test('imageData', async () => {
    const imageData = await imagePf.imageData()
    return imageData.data.length === 4
  })

  test('document', async () => {
    const pf = await PromisifyFile.from(fetch('./fixture/xml.xml'))
    const document = await pf.document()
    const type = Object.prototype.toString.call(document).slice(8, -1)
    return type === 'XMLDocument' || type === 'Document'
  })

  test('document(unsupported type)', async () => {
    try {
      await new PromisifyFile(xmlBlob).document()
    } catch (error) {
      return error instanceof Error
    }

    return false
  })

  test('document(overridemime)', async () => {
    const document = await new PromisifyFile(htmlFile).document(
      'UTF-8',
      'text/xml'
    )
    const type = Object.prototype.toString.call(document).slice(8, -1)
    return type === 'XMLDocument' || type === 'Document'
  })

  test('document(broken)', async () => {
    try {
      await new PromisifyFile(new Blob(['x'])).xml()
    } catch (error) {
      return (
        error instanceof Error ||
        Object.prototype.toString.call(error) === '[object DOMException]' // ie
      )
    }
  })

  test('xml', async () => {
    const document = await new PromisifyFile(xmlFile).xml()
    const type = Object.prototype.toString.call(document).slice(8, -1)
    return type === 'XMLDocument' || type === 'Document'
  })

  test('svg', async () => {
    const document = await new PromisifyFile(svgFile).svg()
    const type = Object.prototype.toString.call(document).slice(8, -1)
    return (
      type === 'XMLDocument' || type === 'Document' || type === 'SVGSVGElement'
    )
  })

  test('html', async () => {
    const document = await new PromisifyFile(htmlFile).html()
    const type = Object.prototype.toString.call(document).slice(8, -1)
    return type === 'HTMLDocument' || type === 'Document'
  })
  ;[
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    // 'Float64Array',
    'DataView',
  ].forEach(function(type) {
    const method = type[0].toLowerCase() + type.slice(1)
    test(
      method,
      async () => {
        const view = await imagePf[method]()
        let type2 = Object.prototype.toString.call(view).slice(8, -1)
        // ie
        if (type === 'DataView' && type2 === 'Object' && view.buffer) {
          type2 = type
        }
        return type2
      },
      type
    )
  })

  async function isPF(x, type) {
    if (!(x instanceof PromisifyFile)) {
      return false
    }

    if ((await x.binaryString()).length === 0) {
      return false
    }

    if (type === 'img') {
      const file = await x.file('new.png', {
        type: 'image/png',
      })

      const img = await new PromisifyFile(file).image()
      return img.width === 1
    }

    if (type === 'text') {
      var text = await x.text()
      return text === testText
    }

    if (type === 'xml') {
      var text = await x.text()
      return text[0] === '<' && text[text.length - 1] === '>'
    }

    return true
  }

  test('PromisifyFile.from(blob)', async () => {
    const pf = await PromisifyFile.from(textBlob)
    return isPF(pf, 'text')
  })

  test('PromisifyFile.from(file)', async () => {
    const pf = await PromisifyFile.from(textFile)
    return isPF(pf, 'text')
  })

  test('PromisifyFile.from(XMLHttpRequest not loaded yet)', async () => {
    const testURL = './fixture/image.png'
    const xmlhttp = new XMLHttpRequest()
    xmlhttp.open('get', testURL)
    xmlhttp.send()
    xmlhttp.responseType = 'blob'
    const pf = await PromisifyFile.from(xmlhttp)
    return isPF(pf, 'img')
  })

  test('PromisifyFile.from(XMLHttpRequest loaded)', async () => {
    const testURL = './fixture/image.png'
    const xmlhttp = await new Promise(function(reslove) {
      const xmlhttp = new XMLHttpRequest()
      xmlhttp.open('get', testURL)
      xmlhttp.send()
      xmlhttp.responseType = 'blob'
      xmlhttp.onload = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          reslove(xmlhttp)
        }
      }
    })
    const pf = await PromisifyFile.from(xmlhttp)
    return isPF(pf, 'img')
  })

  test('PromisifyFile.from(XMLHttpRequest none responseType)', async () => {
    const testURL = './fixture/text.txt'
    const xmlhttp = await new Promise(function(reslove) {
      const xmlhttp = new XMLHttpRequest()
      xmlhttp.open('get', testURL)
      xmlhttp.send()
      xmlhttp.onload = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          reslove(xmlhttp)
        }
      }
    })
    const pf = await PromisifyFile.from(xmlhttp)
    return isPF(pf, 'text')
  })

  test('PromisifyFile.from(XMLHttpRequest responseType = text)', async () => {
    const testURL = './fixture/text.txt'
    const xmlhttp = await new Promise(function(reslove) {
      const xmlhttp = new XMLHttpRequest()
      xmlhttp.open('get', testURL)
      xmlhttp.send()
      xmlhttp.responseType = 'text'
      xmlhttp.onload = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          reslove(xmlhttp)
        }
      }
    })
    const pf = await PromisifyFile.from(xmlhttp)
    return isPF(pf, 'text')
  })

  test('PromisifyFile.from(XMLHttpRequest responseType = arraybuffer)', async () => {
    const testURL = './fixture/image.png'
    const xmlhttp = await new Promise(function(reslove) {
      const xmlhttp = new XMLHttpRequest()
      xmlhttp.open('get', testURL)
      xmlhttp.send()
      xmlhttp.responseType = 'arraybuffer'
      xmlhttp.onload = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          reslove(xmlhttp)
        }
      }
    })
    const pf = await PromisifyFile.from(xmlhttp)
    return isPF(pf, 'image')
  })

  test('PromisifyFile.from(XMLHttpRequest responseType = blob)', async () => {
    const testURL = './fixture/image.png'
    const xmlhttp = await new Promise(function(reslove) {
      const xmlhttp = new XMLHttpRequest()
      xmlhttp.open('get', testURL)
      xmlhttp.send()
      xmlhttp.responseType = 'blob'
      xmlhttp.onload = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          reslove(xmlhttp)
        }
      }
    })
    const pf = await PromisifyFile.from(xmlhttp)
    return isPF(pf, 'image')
  })

  test('PromisifyFile.from(XMLHttpRequest responseType = document)', async () => {
    const testURL = './fixture/xml.xml'
    const xmlhttp = await new Promise(function(reslove) {
      const xmlhttp = new XMLHttpRequest()
      xmlhttp.open('get', testURL)
      xmlhttp.send()
      xmlhttp.responseType = 'document'
      xmlhttp.onload = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          reslove(xmlhttp)
        }
      }
    })

    const pf = await PromisifyFile.from(xmlhttp)
    return isPF(pf, 'xml')
  })

  test('PromisifyFile.from(XMLHttpRequest responseType = json)', async () => {
    const test = 'world'
    const testURL = './fixture/json.json'
    const xmlhttp = await new Promise(function(reslove) {
      const xmlhttp = new XMLHttpRequest()
      xmlhttp.open('get', testURL)
      xmlhttp.send()
      xmlhttp.responseType = 'json'
      xmlhttp.onload = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          reslove(xmlhttp)
        }
      }
    })
    const pf = await PromisifyFile.from(xmlhttp)
    return isPF(pf) && (await pf.json()).hello === test
  })

  test('PromisifyFile.from(canvas)', async () => {
    const pf = await PromisifyFile.from(document.createElement('canvas'))
    return isPF(pf) && (await pf.image()).width === 300
  })

  test('PromisifyFile.from(CanvasRenderingContext2D)', async () => {
    const pf = await PromisifyFile.from(
      document.createElement('canvas').getContext('2d')
    )
    return isPF(pf) && (await pf.image()).width === 300
  })

  test('PromisifyFile.from(canvas as jpeg)', async () => {
    const pf = await PromisifyFile.from(document.createElement('canvas'), {
      type: 'image/jpeg',
    })
    return (
      isPF(pf) &&
      (await pf.image()).width === 300 &&
      (await pf.dataURL().includes('jpeg'))
    )
  })

  test('PromisifyFile.from(ArrayBuffer)', async () => {
    const buffer = await imagePf.arrayBuffer()
    const pf = await PromisifyFile.from(buffer)
    console.log(pf)
    return isPF(pf, 'img')
  })

  test('PromisifyFile.from(DataView)', async () => {
    const view = await imagePf.dataView()

    const pf = await PromisifyFile.from(view)
    return isPF(pf, 'img')
  })

  test('PromisifyFile.from(TypedArray)', async () => {
    const view = await imagePf.uint8Array()

    const pf = await PromisifyFile.from(view)
    return isPF(pf, 'img')
  })

  test('PromisifyFile.from(Response)', async () => {
    const pf = await PromisifyFile.from(new Response(imageFile))
    return isPF(pf, 'img')
  })

  test('PromisifyFile.from(Image)', async () => {
    const img = new Image()
    img.src = await imagePf.url()
    const pf = await PromisifyFile.from(img)
    return isPF(pf, 'img')
  })

  test('PromisifyFile.from(ImageData)', async () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    context.fillRect(0, 0, 100, 100)
    const imageData = context.getImageData(0, 0, 1, 1)
    const pf = await PromisifyFile.from(imageData)
    const img = new Image()
    img.src = await pf.url()
    return isPF(pf, 'img') && (await pf.imageData()).data[3] === 255
  })

  test('PromisifyFile.from(FileReader.readAsDataURL)', async () => {
    const fr = new FileReader()
    fr.readAsDataURL(imageFile)
    const pf = await PromisifyFile.from(fr)
    return isPF(pf, 'img')
  })

  if (window.OffscreenCanvas) {
    test('PromisifyFile.from(OffscreenCanvas)', async () => {
      const canvas = new OffscreenCanvas(1, 1)
      const context = canvas.getContext('2d')
      context.fillRect(0, 0, 1, 1)
      const pf = await PromisifyFile.from(canvas)
      return isPF(pf, 'img')
    })

    test('PromisifyFile.from(OffscreenCanvas as jpeg)', async () => {
      const canvas = new OffscreenCanvas(1, 1)
      const context = canvas.getContext('2d')
      context.fillRect(0, 0, 1, 1)
      const pf = await PromisifyFile.from(canvas, {
        type: 'image/jpeg',
      })
      return isPF(pf, 'img') && (await pf.dataURL()).includes('jpeg')
    })
  }

  const ibrc = document.createElement('canvas').getContext('bitmaprenderer')
  if (ibrc && ibrc.canvas) {
    test('PromisifyFile.from(ImageBitmapRenderingContext)', async () => {
      const pf = await PromisifyFile.from(ibrc)
      return isPF(pf) && (await pf.image()).width === 300
    })
  }

  if (window.createImageBitmap) {
    test('imageBitmap', async () => {
      const imageBitmap = await imagePf.imageBitmap()
      return imageBitmap.height === 1 && imageBitmap.width === 1
    })

    test('PromisifyFile.from(imageBitmap)', async () => {
      const imageBitmap = await createImageBitmap(imageFile)
      const pf = await PromisifyFile.from(imageBitmap)

      const img = new Image()
      img.src = await pf.url()
      return isPF(pf, 'img')
    })
  }
})()
