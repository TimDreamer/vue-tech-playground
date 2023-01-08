<template>
  <form v-on="$listeners">
    <slot></slot>
  </form>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'VForm',
  provide() {
    return {
      form: this,
    }
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
    },
  },
  methods: {
    validate() {
      this.validateHelper(this.$children, 'VFormItem', () => {
        console.log('yep')
      })
    },
    validateHelper(children, targetComponent, validateCb) {
      if (!children) return
      children.forEach((child) => {
        if (child.$options?.name === targetComponent) {
          validateCb()
        } else {
          this.validateHelper(child.$children, targetComponent)
        }
      })
    },
  },
}
</script>

<style></style>
