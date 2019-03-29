/**
 * @jest-environment jsdom-thirteen
 */

import PromisifyFile from '../src'

describe('constructor', () => {
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
