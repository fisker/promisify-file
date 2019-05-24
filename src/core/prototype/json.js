async function json(encoding, reviver) {
  const text = await this.text(encoding || this.$options.encoding)
  return JSON.parse(text, reviver)
}

export {json}
