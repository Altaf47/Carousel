const render = () => {
  console.log(carousel)

  if (carousel.current < carousel.slides.length - 1) {
    carousel.current++
  } else {
    carousel.current = 0
  }
  document
    .querySelector('.image')
    .setAttribute('src', `${carousel.slides[carousel.current].url}`)
}

const carousel = {
  slides: null,
  current: 0
}

const imageFetch = () => {
  return fetch('/carousel/images')
    .then(res => res.json())
    .then(documents => (carousel.slides = documents))
    .then(render)
}

document.querySelector('.button.previous').addEventListener('click', () => {
  if (carousel.current === 0) return
  carousel.current--
  changeSlide()
  console.log('previous')
})

document.querySelector('.button.next').addEventListener('click', () => {
  if (carousel.current === carousel.slides.length - 1) return
  carousel.current++
  changeSlide()
  console.log('next')
})

const changeSlide = () => {
  document
    .querySelector('.image')
    .setAttribute('src', `${carousel.slides[carousel.current].url}`)
}

imageFetch()

setInterval(render, 4000)
