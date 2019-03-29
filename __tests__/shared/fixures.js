import {readFileSync} from 'fs'
import {join} from 'path'

const text = JSON.stringify({
  content: Math.random().toString(10) + '中文'
})

const textFile = {
  content: text,
  file: new window.File([text], 'test.txt', {
    type: 'text/plain',
    lastModified: Date.now(),
  })
}

const html = `<html>
<body>
<input id="test">
</body>
</html>`

const htmlFile = {
  content: html,
  file: new window.File([html], 'test.html', {
    type: 'text/html',
    lastModified: Date.now(),
  })
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><circle id="test" /></svg>`

const svgFile = {
  content: svg,
  file: new window.File([svg], 'test.svg', {
    type: 'image/xml+svg',
    lastModified: Date.now(),
  })
}

const pngFilename = 'test.png'
const pngContent = readFileSync(join(__dirname, pngFilename))
const pngFile = {
  content: pngContent,
  file: new window.File([pngContent.buffer], pngFilename, {
    type: 'image/png',
    lastModified: Date.now(),
  })
}


export {
  textFile,
  htmlFile,
  pngFile,
  svgFile,
}