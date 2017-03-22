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
  },

  checkOpts(opts) {
    if (opts.direction !== 'left' &&
      opts.direction !== 'right' &&
      opts.direction !== 'top' &&
      opts.direction !== 'down') {
      throw new Error('Gallery.js: Invalid direction', this.opts.direction)
    }
  }
}
