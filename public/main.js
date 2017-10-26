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

const progress = () => {
  const $steps = carousel.slides.map((image, index) => {
    const $step = document.createElement('li')

    if (index === carousel.current) {
      $step.className = 'fa fa-circle'
    } else {
      $step.className = 'fa fa-circle-o'
    }

    return $step
  })

  return $steps.reduce((parent, child) => {
    parent.appendChild(child)
    return parent
  }, document.createElement('ul'))
}

const updateProgress = () => {
  const $progress = document.querySelector('.progress')
  $progress.innerHTML = ''
  $progress.appendChild(progress())
}

// updateProgress()

slides()
  .then(documents => (carousel.slides = documents))
  .then(switchSlide)
  .then(updateProgress)

setInterval(function() {
  if (carousel.current < carousel.slides.length - 1) {
    carousel.current++
  } else {
    carousel.current = 0
  }
  render()
  updateProgress()
}, 3000)
// setInterval(render, 3000)
