# Promisify File

## API

### constructor

takes a `Blob` as argument

### PromisifyFile.prototype.arrayBuffer

return Promise&lt;ArrayBuffer&gt; use `FileReader.readAsArrayBuffer`

### PromisifyFile.prototype.text

return Promise&lt;String&gt; use `FileReader.readAsText`

### PromisifyFile.prototype.dataURL

return Promise&lt;String&gt; use `FileReader.readAsDataURL`

### PromisifyFile.prototype.binaryString

return Promise&lt;String&gt; use `FileReader.readAsBinaryString`

## Usage

### Basic syntax

```js
import PromisifyFile from 'promisify-file'

;(async file => {
  try {
    console.log(await new PromisifyFile(file).text())
  } catch (err) {
    console.error(err)
  }

})(new File(['hello from pf.txt'], 'pf.txt', {type: 'text/plain'}))
```

## relative

  https://github.com/fisker/promisify-file-reader