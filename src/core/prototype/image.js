import loadImage from '../../utils/load-image'

async function image() {
  const url = await this.url()

  return loadImage(url)
}

export {image}
