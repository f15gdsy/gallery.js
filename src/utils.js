export default {
  getEl(elOrSelector) {
    if (typeof elOrSelector === 'string') {
      return document.querySelector(elOrSelector)
    } else if (elOrSelector.tagName) {
      return elOrSelector
    } else {
      throw new TypeError('Gallery.js: Invalid elOrSelector')
    }
  },

  getImgs(imgs) {
    if (!Array.isArray(imgs)) {
      throw new TypeError('Gallery.js: Invalid imgs')
    }
    return imgs
  }
}
