import PubSub from 'pubsub-js'

const fullpageContainer = document.querySelector('.fullpage')

PubSub.subscribe(`goToSlide`, (massage, data) => {
  fullpageContainer.classList.remove(`fullpage--${data.from}`)
  fullpageContainer.classList.add(`fullpage--${data.to}`)
})
