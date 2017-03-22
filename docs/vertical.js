var wrapperEl = document.querySelector('.gallery-wrapper')
var cols = Math.ceil(window.innerWidth / 150)

console.log(cols)

for (var i = 0; i < cols; i++) {
  var el = document.createElement('div')
  el.className = 'gallery gallery--vertical'

  var imgs = []
  for (var j = 1; j <= 6; j++) {
    var img = 'images/pic_' + (i * 6 + j) + '.jpg'
    imgs.push(img)
  }

  new Gallery(el, imgs, {
    direction: i % 2 === 0 ? 'top': 'down',
    duration: 50,
    imgWidth: 150,
    imgHeight: 280,
    gapY: 5
  })

  wrapperEl.appendChild(el)
}
