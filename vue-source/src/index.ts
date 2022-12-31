import Vue from './vue'

const options = {
  el: '#app',
  template: `
    <p>{{ name }}</p>
    <p v-text="name"></p>
    <p>{{ age }}</p>
    <p>
        {{ double }}
    </p>
    <input type="text" v-model="name">
    <button @click="changeName">HaHa</button>
    <div v-html="html"></div>
    <div>
      <h1>{{ deepValue.who }}</h1>
      <p>{{ deepValue.slogan }}</p>
    </div>
  `,
  data() {
    return {
      name: 'I am test.',
      age: 12,
      html: '<button  @click="changeName2">{{ buttonName }}</button>',
      buttonName: 'This is a button!',
      deepValue: {
        who: 'John Wick',
        slogan: 'You kill my dog. Now you are dead.',
      },
    }
  },
  beforeCreate() {
    // @ts-ignore
    console.log('beforeCreate', this.name)
  },
  created() {
    // @ts-ignore
    console.log('created', this.name)
    setTimeout(() => {
      // @ts-ignore
      this.name = 'I am created test'
    }, 1500)
  },
  beforeMount() {
    // @ts-ignore
    console.log('beforeMount', this.name)
  },
  mounted() {
    // @ts-ignore
    console.log('mounted', this.name)
  },
  methods: {
    changeName() {
      // @ts-ignore
      this.name = 'Hello, start~'
      // @ts-ignore
      this.age = 1
    },
    changeName2() {
      // @ts-ignore
      this.name = 'Hello, Name2'
      // @ts-ignore
      this.age = 20
      // @ts-ignore
      this.buttonName = 'Button has been clicked!'
    },
  },
}

const app = new Vue(options)
// If options has el, app will auto mount.
// app.$mount('#app')

// @ts-ignore
window && (window._vm = app)
