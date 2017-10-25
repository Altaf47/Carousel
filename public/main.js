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

setInterval(render, 4000)
