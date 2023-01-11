<template>
  <div>
    <label v-if="label">{{ label }}:</label>
    <br />
    <slot></slot>
    <br />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'

export default {
  name: 'VFormItem',
  inject: ['form'],
  data() {
    return {
      error: '',
    }
  },
  props: {
    label: {
      type: String,
    },
    prop: {
      type: String,
    },
  },
  mounted() {
    this.$on('validate', () => this.validate())
  },
  methods: {
    validate() {
      if (!this.prop) {
        return Promise.resolve()
      }
      const value = this.form.model[this.prop]
      const rules = this.form.rules[this.prop]
      const description = {
        [this.prop]: rules,
      }

      const validator = new Schema(description)
      return validator
        .validate({ [this.prop]: value })
        .then(() => {
          this.error = ''
        })
        .catch(({ errors }) => {
          this.error = errors[0].message
          throw new Error(errors)
        })
    },
  },
}
</script>

<style>
.error {
  color: red;
}
</style>
