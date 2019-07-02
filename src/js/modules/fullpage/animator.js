import PubSub from 'pubsub-js'
import { TimelineMax } from 'gsap'

const paginationLink = document.querySelectorAll(`.pagination__link`)

PubSub.subscribe(`goToSlide`, (massage, data) => {
  const slideFrom = document.querySelector(`.fullpage__page--${data.from}`)
  const slideTo = document.querySelector(`.fullpage__page--${data.to}`)

  const paragraphsFrom = slideFrom.querySelectorAll(`.fullpage__item`)
  const paragraphsTo = slideTo.querySelectorAll(`.fullpage__item`)

  slideFrom.classList.remove(`fullpage__page--isActive`)
  slideTo.classList.add(`fullpage__page--isActive`)

  let tl = new TimelineMax()

  tl
    .staggerFromTo(paragraphsFrom, 0.3, {y: 0, opacity: 1}, {y: -20, opacity: 0}, 0.1)
    .to(slideFrom, 1, {y: `-100%`, opacity: 0})

    .fromTo(slideTo, 1, {y: `100%`}, {y: `0%`, opacity: 1}, 0.3)
    .staggerFromTo(paragraphsTo, 0.3, {y: 20, opacity: 0}, {y: 0, opacity: 1}, 0.1, '-=0.6')

  paginationLink[data.from - 1].classList.remove(`pagination__link--isActive`)
  paginationLink[data.to - 1].classList.add(`pagination__link--isActive`)
})
