<template>
  <div>
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
import Emitter from '../mixins/emitter'

export default {
  name: 'VFormInput',
  inheritAttrs: false,
  mixins: [Emitter],
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
      this.dispatch('VFormItem', 'validate')
      this.dispatch('VForm', 'clearStatus')
    },
  },
}
</script>

<style></style>
