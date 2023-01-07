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
      <h1 ref="protagonist">{{ deepValue.who }}</h1>
      <p>{{ deepValue.slogan }}</p>
    </div>
    <button @click="changeColor('red')">Change protagonist's name</button>
    <p> {{ functionWatchTest }} </p>
    <p> {{ objectWatchTest }} </p>
    <button @click="triggerWatchers">trigger Watchers</button>
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
      functionWatchTest: 0,
      objectWatchTest: 0,
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
    // @ts-ignore
    this.methodNotInView()
  },
  watch: {
    // @ts-ignore
    functionWatchTest(newVal, oldVal) {
      console.log('function watch', newVal, oldVal)
    },
    objectWatchTest: {
      // @ts-ignore
      handler(newVal, oldVal) {
        console.log('object watch', newVal, oldVal)
      },
      immediate: true,
    },
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
    changeColor(color: string) {
      // @ts-ignore
      if (this.$refs.protagonist) {
        // @ts-ignore
        this.$refs.protagonist.style.color = color
      }
    },
    triggerWatchers() {
      // @ts-ignore
      this.functionWatchTest++
      // @ts-ignore
      this.objectWatchTest++
    },
    methodNotInView() {
      console.log('Not in view', this)
    },
  },
}

const app = new Vue(options)
// If options has el, app will auto mount.
// app.$mount('#app')

// @ts-ignore
window && (window._vm = app)
