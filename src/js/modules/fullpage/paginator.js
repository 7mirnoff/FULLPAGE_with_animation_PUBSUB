import PubSub from 'pubsub-js'

const paginationLink = document.querySelectorAll(`.pagination__link`)
const slides = document.querySelectorAll(`.fullpage__page`)

export default class Paginator {
  constructor () {
    this.scrollEvents()
    this.clickEvents()
    this.activeSlide = 1
    this.canGo = true
    this.maxLengthSlide = slides.length
  }

  scrollEvents () {
    const self = this

    window.addEventListener(`wheel`, (evt) => {
      if (!self.canGo) {
        return
      }
      self.canGo = false

      const direction = evt.deltaY > 0 ? 1 : -1

      const newSlide = self.activeSlide + direction

      if (newSlide > self.maxLengthSlide || newSlide < 1) {
        setTimeout(() => {
          self.canGo = true
        }, 1300)
        return
      }

      PubSub.publish(`goToSlide`, {from: self.activeSlide, to: newSlide})
      self.activeSlide = newSlide

      setTimeout(() => {
        self.canGo = true
      }, 1300)
    })
  }

  clickEvents () {
    const self = this
    paginationLink.forEach((linkItem, indexItem) => {
      linkItem.addEventListener(`click`, (evt) => {
        evt.preventDefault()

        let newSlide = indexItem + 1
        if (newSlide !== self.activeSlide) {
          PubSub.publish(`goToSlide`, {from: self.activeSlide, to: newSlide})
          self.activeSlide = newSlide
        }
      })
    })
  }
}
