export default {
  template: `
            <p> I'm child {{name}} </p>
            <p> age: {{age}}</p>
            <button @click="growUp">grow up</button>
            <button @click="getParent">console parent</button>
    `,
  data() {
    return {
      name: 'Tina',
      age: 10,
    }
  },
  methods: {
    growUp() {
      // @ts-ignore
      this.age++
    },
    getParent() {
      // @ts-ignore
      console.log(this.$parent)
    },
  },
}
