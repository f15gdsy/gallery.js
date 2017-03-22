var els = document.querySelectorAll('.gallery')

for (var i = 0; i < 8; i++) {
  var el = els[i]

  var imgs = []
  for (var j = 1; j <= 6; j++) {
    var img = 'images/pic_' + (i * 6 + j) + '.jpg'
    imgs.push(img)
  }

  new Gallery(el, imgs, {
    direction: i % 2 === 0 ? 'left': 'right',
    duration: 30,
    imgWidth: 120,
    imgHeight: 220,
    gapX: 10
  })
}
