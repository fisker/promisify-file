import append from '../../utils/append-arguments'

function json(encoding, reviver) {
  const parser = append(JSON.parse, reviver)
  return this.text(encoding || this.$options.encoding).then(parser)
}

export default {
  json,
}
