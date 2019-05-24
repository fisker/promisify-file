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
  const properties = {}
  const keys = Object.keys(values)

  for (const key of keys) {
    properties[key] = {
      value: values[key],
      ...options,
    }
  }

  return defineProperties(object, properties)
}

export default defineValues
