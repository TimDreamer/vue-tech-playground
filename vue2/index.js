import Vue from './kVue'

const app = new Vue({
  el: '#app',
  data: () => {
    return {
      name: 'Tim',
      description: 'Hello!',
      age: 28,
    }
  },
  render(h) {
    return h('div', null, [
      h('h1', null, this.name),
      h('h2', null, this.description),
      h('p', null, this.age),
    ])
  },
})

window._vm = app

// test for updating viewModel
const NAMES = ['Tom', 'James', 'Steven']
const AGES = [21, 26, 31]
const DESCRIPTIONS = [
  'Nice to see you again.',
  "What's up!",
  'How do you going?',
]
let i = 0

const timer = setInterval(() => {
  if (i < NAMES.length) {
    app.name = NAMES[i]
    app.age = AGES[i]
    app.description = DESCRIPTIONS[i]
    i++
  } else {
    clearInterval(timer)
  }
}, 1500)

const anotherRenderFunc = (h) => {
  return h('div', null, [
    h('h1', null, 'Congratulation!'),
    h('p', null, 'Now viewModel is working!'),
    h('p', null, 'Author: Tim Lu'),
    h('p', null, 'Shout out to Vue2 team and Mr.Yang'),
  ])
}

setTimeout(() => {
  app.$options.render = anotherRenderFunc
  console.log('trigger another render')
}, 6000)
