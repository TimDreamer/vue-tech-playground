export default {
  methods: {
    dispatch(componentName, eventName, ...payload) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name
      while (parent && (!name || name != componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent && name === componentName) {
        parent.$emit.apply(parent, [eventName].concat(payload))
      }
    },
  },
}
