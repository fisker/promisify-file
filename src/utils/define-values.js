const {defineProperties} = Object

function defineValues(object, values, options) {
  const {configurable, writable, enumerable} = {
    configurable: true,
    writable: true,
    enumerable: true,
    ...options,
  }

  const properties = {}
  const keys = Object.keys(values)

  for (const key of keys) {
    properties[key] = {
      value: values[key],
      configurable,
      writable,
      enumerable,
    }
  }

  return defineProperties(object, properties)
}

export default defineValues
