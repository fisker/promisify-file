# Promisify File

## API

### PromisifyFile#arrayBuffer

return Promise<ArrayBuffer> use `FileReader.readAsArrayBuffer`

### PromisifyFile#text

return Promise<String> use `FileReader.readAsText`

### PromisifyFile#dataURL

return Promise<String> use `FileReader.readAsDataURL`

### PromisifyFile#binaryString

return Promise<String> use `FileReader.readAsBinaryString`

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