/**
 * @jest-environment jsdom-thirteen
 */

import PromisifyFile from '../src'

describe('constructor', () => {
  test('should accept blob', () => {
    expect(() => new PromisifyFile(new Blob([]))).toBeInstanceOf(PromisifyFile)
  })

  test('should accept file as well', () => {
    expect(() => new PromisifyFile(new File([], 'unnamed'))).toBeInstanceOf(PromisifyFile)
  })

  test('should not accept other types', () => {
    const list = [
      '',
      0,
      true,
      {},
      [],
      new Uint8Array(),
      Buffer.from('')
    ]

    for (const data of list) {
      expect(() => new PromisifyFile(data).toThrow(window.TypeError)
    }
  })

})
