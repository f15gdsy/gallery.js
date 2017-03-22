import assign from 'simple-assign'
import utils from './utils'

const DEFAULT_OPTS = {
  direction: 'left',
  imgWidth: 100,  // px
  imgHeight: 100, // px
  imgAlignX: 0.5,
  imgAlignY: 0.5,
  gapX: 0,
  gapY: 0,
  duration: 10
}

class Gallery {
  constructor(el, imgs, userOpts) {
    this.el = utils.getEl(el)
    this.imgs = utils.getImgs(imgs)
    this.opts = assign({}, DEFAULT_OPTS, userOpts)

    utils.checkOpts(this.opts)
    this.refresh()
  }

  start() {
    this.el.style.animationName = this.animName
  }

  stop() {
    this.el.style.animationName = ''
  }

  refresh() {
    if (this.styleEl) {
      document.head.removeChild(this.styleEl)
    }
    this._combineImgs()
    this._createRule()
  }

  destroy() {
    document.head.removeChild(this.styleEl)
  }

  _drawImg(ctx, img, i) {
    return new Promise((resolve, reject) => {
      const imgObj = new Image()
      imgObj.src = img
      imgObj.onload = () => {
        let sx, sy, sw, sh, dx, dy
        const dw = this.opts.imgWidth
        const dh = this.opts.imgHeight

        const realWHRatio = imgObj.width / imgObj.height
        const clipWHRatio = dw / dh

        if (realWHRatio < clipWHRatio) {
          sw = imgObj.width
          sh = imgObj.width / clipWHRatio
          sx = 0
          sy = (imgObj.height - sh) * this.opts.imgAlignY / 100
        } else{
          sw = imgObj.height * clipWHRatio
          sh = imgObj.height
          sx = (imgObj.width - sw) * this.opts.imgAlignX
          sy = 0
        }

        const direction = this.opts.direction

        if (this._isHorizonal) {
          dx = i * dw + (i + 1) * this.opts.gapX
          dy = 0
        } else {
          dx = 0
          dy = i * dh + (i + 1) * this.opts.gapY
        }

        ctx.drawImage(
          imgObj,
          sx,
          sy,
          sw,
          sh,
          dx,
          dy,
          dw,
          dh)
        resolve()
      }
      imgObj.onerror = reject
    })
  }

  _combineImgs() {
    const canvas = document.createElement('canvas')
    const direction = this.opts.direction

    if (this._isHorizonal) {
      canvas.width = this._dominantSize
      canvas.height = this.opts.imgHeight
    } else {
      canvas.width = this.opts.imgWidth
      canvas.height = this._dominantSize
    }

    const ctx = canvas.getContext('2d')

    Promise.all(this.imgs.map((img, i) => this._drawImg(ctx, img, i)))
      .then(() => {
        const jpgUrl = canvas.toDataURL('image/jpeg')
        this.el.style.backgroundImage = `url(${ jpgUrl })`
      })
  }

  _createRule() {
    const styleEl = document.createElement('style')
    document.head.appendChild(styleEl)
    this.styleEl = styleEl
    const sheet = styleEl.sheet

    const animName = `gallery-${this.opts.direction}-${this._dominantSize}`
    this.animName = animName;

    this.el.style.animationName = animName
    this.el.style.animationIterationCount = 'infinite'
    this.el.style.animationDuration = `${this.opts.duration}s`
    this.el.style.animationTimingFunction = 'linear'

    if (this._isHorizonal) {
      this.el.style.backgroundRepeatX = 'repeat'
      this.el.style.backgroundRepeatY = 'no-repeat'
    } else {
      this.el.style.backgroundRepeatX = 'no-repeat'
      this.el.style.backgroundRepeatY = 'repeat'
    }


    sheet.insertRule(`
      @keyframes ${animName} {
        from {
          background-position: 0 0;
        }
        to {
          background-position: ${this._getAnimToData()};
        }
      }
    `, 0)
  }

  _getAnimToData() {
    const size = this._dominantSize

    switch (this.opts.direction) {
      case 'left':
        return `-${size}px 0`
      case 'right':
        return `${size}px 0`
      case 'top':
        return `0 ${size}px`
      case 'down':
        return `0 -${size}px`
    }
  }

  get _isHorizonal() {
    return this.opts.direction === 'left' || this.opts.direction === 'right'
  }

  get _isVertical() {
    return this.opts.direction === 'top' || this.opts.direction === 'down'
  }

  get _dominantSize() {
    const direction = this.opts.direction
    if (this._isHorizonal) {
      return this.imgs.length * (this.opts.imgWidth + this.opts.gapX)
    } else {
      return this.imgs.length * (this.opts.imgHeight + this.opts.gapY)
    }
  }
}

export default Gallery
