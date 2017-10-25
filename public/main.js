const imageFetch = () => {
  return fetch('/carousel/images').then(res => res.json())
}

const carousel = {
  slides: null,
  current: 0
}

imageFetch().then(documents => (carousel.slides = documents))

const render = () => {
  document
    .querySelector('.image')
    .setAttribute('src', `${carousel.slides[carousel.current].url}`)
  if (carousel.current < carousel.slides.length - 1) {
    carousel.current++
  } else {
    carousel.current = 0
  }
}

const changeSlide = () => {
  document
    .querySelector('.slide')
    .setAttribute('src', `images/${carousel.slides[carousel.current].image}`)

  document.querySelector('.button.previous').addEventListener('click', () => {
    if (carousel.current === 0) return
    carousel.current--
    changeSlide()
  })
}
document.querySelector('.button.next').addEventListener('click', () => {
  if (carousel.current === carousel.slides.length - 1) return
  carousel.current++
  changeSlide()
})

setInterval(render, 4000)
