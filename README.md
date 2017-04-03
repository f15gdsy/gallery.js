# gallery.js
A small, high-performance, and minimal-dependence library for creating image infinite-scrolling animations.

Compared to [film.js](https://f15gdsy.github.io/film.js/), gallery.js:
  - is faster, as it creates the images combination once, and it uses native css animation, so no math calculation on every frame
  - is responsive by default, as it behaves like a background image
  - works horizonally and vertically
  - ONLY works with images

Check out the demo here: https://f15gdsy.github.io/gallery.js/

# How

## 1. Installation
If you are using npm:
```
npm install gallery-js --save
```

If you are using yarn:
```
yarn add gallery-js
```


## 2. Use
First, you need to setup the following DOM structure:
```html
<div class="gallery"></div>
```

Then create a new gallery object
```javascript
const images = [
  'images/pic_1.jpg',
  'images/pic_2.jpg',
  'images/pic_3.jpg',
  'images/pic_4.jpg'
]

const opts = {
  direction: 'vertical'
  // ... other options
}

const gallery = new Gallery('.gallery', images, opts)
// or
const gallery = new Gallery(el, images, opts)
```

That's it!

You just created a single column (or row, depending on the direction option) with 4 different images.

# API
## Constructor
### params
- **el** { String | HTMLElement } - The gallery DOM element or selector.
  - **direction** { String } - The direction the images are going to scroll in. Possible values are:
    - 'left', default value
    - 'right'
    - 'top'
    - 'down'
  - **imgWidth** { Number } - The width of the images.
  - **imgHeight** { Number } - The height of the images.
  - **imgAlignX** { Number } - If the image is clopped, how should the image to be aligned horizonally.
    - 0: align left
    - .5: default value, align center
    - 1: align right
  - **imgAlignY** { Number } - If the image is clopped, how should the image to be aligned vertically.
    - 0: align top
    - .5: default value, align center
    - 1: align bottom
  - **gapX** { Number } - The horizonal gap between each images. Default 0. Will be ignored if direction is set to 'top' or 'down'.
  - **gapY** { Number } - The vertical gap between each images. Default 0. Will be ignored if direction is set to 'left' or 'right'.
  - **duration** { Number } - How long should one rotation lasts. Default 10. Longer a gallery, it takes longer duration to achieve the same speed.

## .start()
Starts the animation.

## .stop()
Stops the animation.

## .refresh()
Re-initialize the gallery. Will do heavy image regeneration and style recalculation. Usually not needed.
