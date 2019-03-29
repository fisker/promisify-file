const base64DataURLPattern = /^data:(.*?)?;base64,(.+)$/

function isDataURL(url) {
  return base64DataURLPattern.test(url)
}

export default isDataURL
