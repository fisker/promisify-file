const {defineProperties} = Object

function defineValues(
  object,
  values,
  options = {
    configurable: true,
    writable: true,
    enumerable: true,
  }
) {
  const props = {}
  const keys = Object.keys(values)

  for (const key of keys) {
    props[key] = {
      value: values[key],
      ...options,
    }
  }

  return defineProperties(object, props)
}

export default defineValues
