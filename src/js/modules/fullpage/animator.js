import PubSub from 'pubsub-js'

const fullpageContainer = document.querySelector('.fullpage')

PubSub.subscribe('goToSlide', (massage, data) => {
  const { from, to } = data
  fullpageContainer.classList.remove(`fullpage--${from}`)
  fullpageContainer.classList.add(`fullpage--${to}`)
})
