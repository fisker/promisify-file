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

require('./index.js')

var testText = 'hello promisify-file'
var imageArr = [
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
  130
]


var getFile = (function () {
  function testFileSupport () {
    try {
      new File([], 'test') // eslint-disable-line
    } catch (err)  {
      return false
    }

    return true
  }

  var getFile = function getFile (parts, fileName, options) {
    return new File(parts, fileName, options)
  }
  var supportNewFile = testFileSupport()

  if (!supportNewFile) {
    getFile = function getFile (parts, fileName, options) {
      var blob = new Blob(parts, options)
      blob.name = fileName
      blob.lastModified = options.lastModified || Date.now()
      return blob
    }
  }

  return getFile
})()

var ts = Date.now()
var imageBIN = imageArr
  .map(function(chr) {
    return String.fromCharCode(chr)
  })
  .join('')
var textFile = getFile([testText], 'pf.txt', {
  type: 'text/plain'
})
var textBlob = new Blob([testText])
var imageFile = getFile([new Int8Array(imageArr).buffer], 'pf.png', {
  type: 'image/png'
})
var xmlBlob = new Blob(['<xml><hello>promisify-file</hello></xml>'])
var xmlFile = getFile(['<xml><hello>promisify-file</hello></xml>'], 'pf.xml', {
  type: 'text/xml'
})
var htmlFile = getFile(
  ['<!DOCTYPE html><html lang="en"><head></head><body></body></html>'],
  'pf.html',
  {
    type: 'text/html'
  }
)
var svgFile = getFile(
  ['<svg xmlns="http://www.w3.org/2000/svg"></svg>'],
  'pf.svg',
  {
    type: 'image/svg+xml'
  }
)

var textFilePf = new PromisifyFile(textFile)
var textBlobPf = new PromisifyFile(textBlob)
var imagePf = new PromisifyFile(imageFile)

var container = document.getElementById('js-result')

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
  var tr = document.createElement('tr')
  var testTd = document.createElement('td')
  testTd.innerText = testDesc
  var resultTd = document.createElement('td')
  resultTd.innerText = 'running'

  var setResult = showResult(testDesc, resultTd, expect)
  try {
    var result = fn()
    if (result.then) {
      result.then(setResult, setResult)
    } else {
      setResult(result)
    }
  } catch (err) {
    setResult(err)
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
  'data:text/plain;base64,' + btoa(testText)
)

test(
  '`Blob` dataURL',
  async () => {
    var url = (await textBlobPf.dataURL())
    var text = btoa(testText)
    return url.slice(- text.length) === text
  }
)

test(
  'BinaryString',
  async () => {
    return await imagePf.binaryString()
  },
  imageBIN
)

test('blob', async () => {
  var blob = await imagePf.blob()
  return (
    !blob.name &&
    (await imagePf.dataURL()) === (await new PromisifyFile(blob).dataURL())
  )
})

test('file', async () => {
  var newFileName = Date.now() + '.png'
  var file = await imagePf.file(newFileName)
  return (
    file.name === newFileName &&
    (await imagePf.dataURL()) === (await new PromisifyFile(file).dataURL())
  )
})

test(
  'json',
  async () => {
    var data = {
      hello: ts
    }
    var str = JSON.stringify(data)
    var blob = new Blob([str])
    var pf = new PromisifyFile(blob)
    return (await pf.json()).hello
  },
  ts
)

test('url', async () => {
  var url = await imagePf.url()
  return url.slice(0, 5) === ('blob:')
})

test('image', async () => {
  var image = await imagePf.image()
  return (
    image.tagName === 'IMG' &&
    image.naturalHeight === 1 &&
    image.naturalWidth === 1
  )
})

test('imageData', async () => {
  var imageData = await imagePf.imageData()
  return imageData.data.length === 4
})

test(
  'document',
  async () => {
    var document = await new PromisifyFile(xmlFile).document()
    var type = Object.prototype.toString.call(document).slice(8, -1)
    return type === 'XMLDocument' || type === 'Document'
  }
)

test('document(unsupported type)', async () => {
  try {
    await new PromisifyFile(xmlBlob).document()
  } catch (err) {
    return err instanceof Error
  }

  return false
})

test(
  'document(overridemime)',
  async () => {
    var document = await new PromisifyFile(htmlFile).document(
      'UTF-8',
      'text/xml'
    )
    var type = Object.prototype.toString.call(document).slice(8, -1)
    return type === 'XMLDocument' || type === 'Document'
  }
)

test('document(broken)', async () => {
  try {
    await new PromisifyFile(new Blob(['x'])).xml()
  } catch (err) {
    return (
      err instanceof Error ||
      Object.prototype.toString.call(err) === '[object DOMException]' // ie
    )
  }
})

test(
  'xml',
  async () => {
    var document = await new PromisifyFile(xmlFile).xml()
    var type = Object.prototype.toString.call(document).slice(8, -1)
    return type === 'XMLDocument' || type === 'Document'
  }
)

test('svg', async () => {
  var document = await new PromisifyFile(svgFile).svg()
  var type = Object.prototype.toString.call(document).slice(8, -1)
  return (
    type === 'XMLDocument' ||
    type === 'Document' ||
    type === 'SVGSVGElement'
  )
})

test(
  'html',
  async () => {
    var document = await new PromisifyFile(htmlFile).html()
    var type = Object.prototype.toString.call(document).slice(8, -1)
    return type === 'HTMLDocument' || type === 'Document'
  }
)

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
  'DataView'
].forEach(function(type) {
  var method = type[0].toLowerCase() + type.slice(1)
  test(
    method,
    async () => {
      var view = await imagePf[method]()
      var type2 = Object.prototype.toString.call(view).slice(8, -1)
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

  if ((await x.binaryString()).length < 1) {
    return false
  }

  if (type === 'img') {
    var file = await x.file('new.png', {
      type: 'image/png'
    })

    var img = await new PromisifyFile(file).image()
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
  var pf = await PromisifyFile.from(textBlob)
  return isPF(pf, 'text')
})

test('PromisifyFile.from(file)', async () => {
  var pf = await PromisifyFile.from(textFile)
  return isPF(pf, 'text')
})

test('PromisifyFile.from(XMLHttpRequest not loaded yet)', async () => {
  var testURL = './fixture/image.png'
  var xmlhttp = new XMLHttpRequest()
  xmlhttp.open('get', testURL)
  xmlhttp.send()
  xmlhttp.responseType = 'blob'
  var pf = await PromisifyFile.from(xmlhttp)
  return isPF(pf, 'img')
})

test('PromisifyFile.from(XMLHttpRequest loaded)', async () => {
  var testURL = './fixture/image.png'
  var xmlhttp = await new Promise(function(reslove) {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open('get', testURL)
    xmlhttp.send()
    xmlhttp.responseType = 'blob'
    xmlhttp.onload = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        reslove(xmlhttp)
      }
    }
  })
  var pf = await PromisifyFile.from(xmlhttp)
  return isPF(pf, 'img')
})

test('PromisifyFile.from(XMLHttpRequest none responseType)', async () => {
  var testURL = './fixture/text.txt'
  var xmlhttp = await new Promise(function(reslove) {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open('get', testURL)
    xmlhttp.send()
    xmlhttp.onload = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        reslove(xmlhttp)
      }
    }
  })
  var pf = await PromisifyFile.from(xmlhttp)
  return isPF(pf, 'text')
})

test('PromisifyFile.from(XMLHttpRequest responseType = text)', async () => {
  var testURL = './fixture/text.txt'
  var xmlhttp = await new Promise(function(reslove) {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open('get', testURL)
    xmlhttp.send()
    xmlhttp.responseType = 'text'
    xmlhttp.onload = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        reslove(xmlhttp)
      }
    }
  })
  var pf = await PromisifyFile.from(xmlhttp)
  return isPF(pf, 'text')
})

test('PromisifyFile.from(XMLHttpRequest responseType = arraybuffer)', async () => {
  var testURL = './fixture/image.png'
  var xmlhttp = await new Promise(function(reslove) {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open('get', testURL)
    xmlhttp.send()
    xmlhttp.responseType = 'arraybuffer'
    xmlhttp.onload = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        reslove(xmlhttp)
      }
    }
  })
  var pf = await PromisifyFile.from(xmlhttp)
  return isPF(pf, 'image')
})

test('PromisifyFile.from(XMLHttpRequest responseType = blob)', async () => {
  var testURL = './fixture/image.png'
  var xmlhttp = await new Promise(function(reslove) {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open('get', testURL)
    xmlhttp.send()
    xmlhttp.responseType = 'blob'
    xmlhttp.onload = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        reslove(xmlhttp)
      }
    }
  })
  var pf = await PromisifyFile.from(xmlhttp)
  return isPF(pf, 'image')
})

test('PromisifyFile.from(XMLHttpRequest responseType = document)', async () => {
  var testURL = './fixture/xml.xml'
  var xmlhttp = await new Promise(function(reslove) {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open('get', testURL)
    xmlhttp.send()
    xmlhttp.responseType = 'document'
    xmlhttp.onload = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        reslove(xmlhttp)
      }
    }
  })

  var pf = await PromisifyFile.from(xmlhttp)
  return isPF(pf, 'xml')
})

test('PromisifyFile.from(XMLHttpRequest responseType = json)', async () => {
  var test = 'world'
  var testURL = './fixture/json.json'
  var xmlhttp = await new Promise(function(reslove) {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open('get', testURL)
    xmlhttp.send()
    xmlhttp.responseType = 'json'
    xmlhttp.onload = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        reslove(xmlhttp)
      }
    }
  })
  var pf = await PromisifyFile.from(xmlhttp)
  return isPF(pf) && (await pf.json()).hello === test
})

test('PromisifyFile.from(canvas)', async () => {
  var pf = await PromisifyFile.from(document.createElement('canvas'))
  return isPF(pf) && (await pf.image()).width === 300
})

test('PromisifyFile.from(CanvasRenderingContext2D)', async () => {
  var pf = await PromisifyFile.from(
    document.createElement('canvas').getContext('2d')
  )
  return isPF(pf) && (await pf.image()).width === 300
})

test('PromisifyFile.from(canvas as jpeg)', async () => {
  var pf = await PromisifyFile.from(document.createElement('canvas'), {
    type: 'image/jpeg'
  })
  return (
    isPF(pf) &&
    (await pf.image()).width === 300 &&
    (await pf.dataURL()).indexOf('jpeg') !== -1
  )
})


test('PromisifyFile.from(ArrayBuffer)', async () => {
  var buffer = await imagePf.arrayBuffer()
  var pf = await PromisifyFile.from(buffer)
  console.log(pf)
  return isPF(pf, 'img')
})

test('PromisifyFile.from(DataView)', async () => {
  var view = await imagePf.dataView()

  var pf = await PromisifyFile.from(view)
  return isPF(pf, 'img')
})

test('PromisifyFile.from(TypedArray)', async () => {
  var view = await imagePf.uint8Array()

  var pf = await PromisifyFile.from(view)
  return isPF(pf, 'img')
})

test('PromisifyFile.from(Response)', async () => {
  var pf = await PromisifyFile.from(new Response(imageFile))
  return isPF(pf, 'img')
})

test('PromisifyFile.from(Image)', async () => {
  var img = new Image()
  img.src = await imagePf.url()
  var pf = await PromisifyFile.from(img)
  return isPF(pf, 'img')
})

test('PromisifyFile.from(ImageData)', async () => {
  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')
  context.fillRect(0, 0, 100, 100)
  var imageData = context.getImageData(0, 0, 1, 1)
  var pf = await PromisifyFile.from(imageData)
  var img = new Image()
  img.src = await pf.url()
  return isPF(pf, 'img') && (await pf.imageData()).data[3] === 255
})



test('PromisifyFile.from(FileReader.readAsDataURL)', async () => {
  var fr = new FileReader()
  fr.readAsDataURL(imageFile)
  var pf = await PromisifyFile.from(fr)
  return isPF(pf, 'img')
})

if (window.OffscreenCanvas) {
  test('PromisifyFile.from(OffscreenCanvas)', async () => {
    var canvas = new OffscreenCanvas(1, 1)
    var context = canvas.getContext('2d')
    context.fillRect(0, 0, 1, 1)
    var pf = await PromisifyFile.from(canvas)
    return isPF(pf, 'img')
  })

  test('PromisifyFile.from(OffscreenCanvas as jpeg)', async () => {
    var canvas = new OffscreenCanvas(1, 1)
    var context = canvas.getContext('2d')
    context.fillRect(0, 0, 1, 1)
    var pf = await PromisifyFile.from(canvas, {
      type: 'image/jpeg'
    })
    return isPF(pf, 'img') && (await pf.dataURL()).includes('jpeg')
  })
}
if (document.createElement('canvas').getContext('bitmaprenderer')) {
  test('PromisifyFile.from(ImageBitmapRenderingContext)', async () => {
    var pf = await PromisifyFile.from(
      document.createElement('canvas').getContext('bitmaprenderer')
    )
    return isPF(pf) && (await pf.image()).width === 300
  })
}

if (window.createImageBitmap) {

  test('imageBitmap', async () => {
    var imageBitmap = await imagePf.imageBitmap()
    return imageBitmap.height === 1 && imageBitmap.width === 1
  })

  test('PromisifyFile.from(imageBitmap)', async () => {
    var imageBitmap = await createImageBitmap(imageFile)
    var pf = await PromisifyFile.from(imageBitmap)

    var img = new Image()
    img.src = await pf.url()
    return isPF(pf, 'img')
  })
}
