import {Buffer} from 'buffer'
import PromisifyFile from '../src/index.js'

describe('constructor.data', () => {
  test('should accept blob', () => {
    const file = new PromisifyFile(new window.Blob([]))
    expect(file).toBeInstanceOf(PromisifyFile)
  })

  test('should accept file as well', () => {
    const file = new PromisifyFile(new window.File([], 'unnamed'))
    expect(file).toBeInstanceOf(PromisifyFile)
  })

  test('should not accept other types', () => {
    const list = ['', 0, true, {}, [], new Uint8Array(), Buffer.from('')]

    for (const data of list) {
      expect(() => new PromisifyFile(data)).toThrow(window.TypeError)
    }
  })
})

describe('constructor.options', () => {
  test('default options', () => {
    const blob = new window.Blob([], {
      type: 'text/plain',
    })
    const file = new PromisifyFile(blob)
    expect(file.$store.blob).toBe(blob)
  })

  test('options.type', () => {
    const type = 'text/html'
    const blob = new window.Blob([], {
      type: 'text/plain',
    })
    const file = new PromisifyFile(blob, {
      type,
    })
    expect(file.$store.original).toBe(blob)
    expect(file.$store.blob).not.toBe(blob)
    expect(file.$store.blob.type).toBe(type)
  })

  test('options.name', () => {
    const name = 'new-name'
    const blob = new window.File([], 'unnamed', {
      type: 'text/plain',
    })
    const file = new PromisifyFile(blob, {
      name,
    })
    expect(file.$store.original).toBe(blob)
    expect(file.$store.blob).not.toBe(blob)
    expect(file.$store.blob.name).toBe(name)
    expect(file.$store.blob).toBeInstanceOf(window.File)
  })

  test('options.lastModified', () => {
    const now = new Date()
    const lastModified = new Date(now.getTime() + 1000)
    const blob = new window.File([], 'unnamed', {
      type: 'text/plain',
      lastModified: now,
    })

    const file = new PromisifyFile(blob, {
      lastModified,
    })

    expect(file.$store.original).toBe(blob)
    expect(file.$store.blob).not.toBe(blob)
    expect(file.$store.blob.lastModified).toBe(lastModified.getTime())
    expect(
      file.$store.blob.lastModified - file.$store.original.lastModified,
    ).toBe(1000)
  })
})
