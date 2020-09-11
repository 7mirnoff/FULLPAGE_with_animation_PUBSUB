import PubSub from 'pubsub-js'

export default class Paginator {
  constructor () {
    this.scrollEvents()
    this.moveEvents()
    this.activeSlide = 1
    this.canGo = true
    this.maxLengthSlide = 5
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

  moveEvents () {
    const self = this

    let lastY;
    let directionCurrent = 0
    let currentY = 0

    const getdirection = (evt) => {
      lastY = evt.changedTouches[0].clientY
      if(currentY - 2 > lastY){
        return -1
      } else if(currentY + 2 < lastY){
        return 1
      }
      currentY = lastY;
    }

    window.addEventListener(`touchstart`, (evt) => {
      currentY = evt.touches[0].clientY;
    })


    window.addEventListener(`touchend`, (evt) => {
      if (!self.canGo) {
        return
      }
      directionCurrent = getdirection(evt)
      self.canGo = false

      const direction = directionCurrent > 0 ? 1 : -1

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
}
