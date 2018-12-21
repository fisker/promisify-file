# Promisify File

## Usage

### Basic syntax

```js
import PromisifyFile from 'promisify-file'

;(async () => {
  const testFile = new File(
    ['hello from promisify-file.txt'],
    'promisify-file.txt',
    {
      type: 'text/plain',
      lastModified: Date.now()
    }
  )

  const promisifyFile = new PromisifyFile(file)

  try {
    console.log(await promisifyFile.text()) // print `hello from promisify-file.txt`
  } catch (err) {
    console.error(err)
  }
})()
```

## options

```js
{
  name: fileName,
  type: fileMimeType,
  encoding: textFileEncoding,
  quality: imageFileQuality,
  lastModified: fileLastModified
}
```

## constructor

syntax:

```js
let pf = new PromisifyFile(data, options)
```

data must be a `Blob`(include `File`), for more data type support see [PromisifyFile.from](#PromisifyFile.from)

## static methods

### PromisifyFile.from

returns a `Promise` that resolves with a `PromisifyFile` Object

syntax:

```js
let pf = await PromisifyFile.from(data, options)
```

supported data types:

- [x] [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [x] [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob)
- [x] [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- [x] [Body](https://developer.mozilla.org/en-US/docs/Web/API/Body)
- [x] [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document/Document)
- [x] [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
- [x] [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
- [x] [HTMLImageElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
- [x] [RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/RenderingContext)
- [x] [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
- [x] [DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
- [x] [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/FileReader)
- [x] [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)
- [x] [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap)

## methods

### PromisifyFile.prototype.{arrayBuffer, text, dataURL, binaryString}

returns a `Promise` that resolves with the result `FileReader.readAs{ArrayBuffer, Text, DataURL, BinaryString}`

syntax:

```js
file.arrayBuffer()

// optional `encoding` use in `FileReader.readAsText`
file.text([encoding])

file.dataURL()

file.binaryString()
```

Notice: **result of arrayBuffer / text / dataURL / binaryString is cached**

- [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/FileReader)

### PromisifyFile.prototype.{int8Array, uint8Array, uint8ClampedArray, int16Array, uint16Array, int32Array, uint32Array, float32Array, float64Array}

returns a `Promise` that resolves with a `TypedArray` created with blob arrayBuffer

optional arguments `byteOffset` and `length` same as `TypedArray` syntax

syntax:

```js
file.int8Array([byteOffset [, length]])

file.uint8Array([byteOffset [, length]])

file.uint8ClampedArray([byteOffset [, length]])

file.int16Array([byteOffset [, length]])

file.uint16Array([byteOffset [, length]])

file.uint32Array([byteOffset [, length]])

file.float32Array([byteOffset [, length]])

file.float64Array([byteOffset [, length]])
```

links:

- [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

### PromisifyFile.prototype.dataView

returns a `Promise` that resolves with a `DataView` created with blob arrayBuffer

optional arguments `byteOffset` and `length` same as `DataView` syntax

syntax:

```js
file.dataView([byteOffset [, length]])
```

links:

- [DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

### PromisifyFile.prototype.blob

returns a `Promise` that resolves with a new `Blob` created with orignal blob

optional argument `options` same as `Blob` syntax

syntax:

```js
file.blob([options]])
```

links:

- [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob)

### PromisifyFile.prototype.file

returns a `Promise` that resolves with a new `File` created with orignal blob

optional arguments `name` and `options` same as `File` syntax

syntax:

```js
file.file([name [, options]])
```

Notice: **if name is omitted, and the orignal `Blob` don't has a name. a `TypeError` throws**

links:

- [File](https://developer.mozilla.org/en-US/docs/Web/API/File/File)

### PromisifyFile.prototype.json

returns a `Promise` that resolves with the result of parsing blob text as JSON

syntax:

```js
file.json([encoding [, reviver]])
```

links:

- [JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

### PromisifyFile.prototype.url

returns a `Promise` that resolves with the result of `URL.createObjectURL` create with blob

syntax:

```js
file.url()
```

links:

- [URL.createObjectURL](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)

### PromisifyFile.prototype.image

returns a `Promise` that resolves with loaded `HTMLImageElement` create with blob

syntax:

```js
file.image()
```

links:

- [HTMLImageElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)

### PromisifyFile.prototype.imageBitmap

returns a `Promise` that resolves with `ImageBitmap` that `createImageBitmap` returns

syntax:

```js
file.imageBitmap([options])

file.imageBitmap(sx, sy, sw, sh[, options])
```

links:

- [createImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/createImageBitmap)
- [ImageBitmap](https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap)

### PromisifyFile.prototype.imageData

returns a `Promise` that resolves with `ImageData` containing the image data of orignal image blob

syntax:

```js
file.imageData([sx = 0[, sy = 0[, sw = image.width [, sh = image.height]]]])
```

links:

- [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData/ImageData)
- [OffscreenCanvas](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/OffscreenCanvas)
- [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
- [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
- [CanvasRenderingContext2D.getImageData](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData)

### PromisifyFile.prototype.{document, xml, svg, html}

returns a `Promise` that resolves with `DOMParser.parseFromString` parsing blob text

syntax:

```js
file.document([encoding [, overrideMimeType]])
file.xml([encoding]) // shortcut for file.document(encoding, 'application/xml')
file.svg([encoding]) // shortcut for file.document(encoding, 'image/svg+xml')
file.html([encoding]) // shortcut for file.document(encoding, 'text/html')
```

Notice:
  **Note that if the parsing process fails, the `DOMParser` does not throw an exception, but `PromisifyFile.document` throws an `Error`**

links:

- [DomParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser)

## relative projects

- [promisify-file-reader](https://github.com/fisker/promisify-file-reader)