<template>
  <div>
    <label v-if="label">{{ label }}:</label>
    <br />
    <slot></slot>
    <br />
    <p v-if="error" class="red">{{ error }}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'

export default {
  name: 'VFormItem',
  inject: ['form'],
  provide() {
    return {
      formItem: this,
    }
  },
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
    this.$on('validate', () => {
      const value = this.form.model[this.prop]
      const rule = this.form.rules[this.prop]
      const schema = new Schema({ rule })
      schema.validate(value)
    })
  },
}
</script>

<style>
.error {
  color: red;
}
</style>
