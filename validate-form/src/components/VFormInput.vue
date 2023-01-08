<template>
  <div>
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  name: 'VFormInput',
  inheritAttrs: false,
  inject: ['formItem', 'form'],
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
      this.formItem.$emit('validate')
      this.form.$emit('clearStatus')
    },
  },
}
</script>

<style></style>
