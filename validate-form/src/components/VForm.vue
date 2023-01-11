<template>
  <div>
    <form v-on="$listeners">
      <slot></slot>
    </form>
    <p
      v-if="validateMessage"
      :class="{
        success: status === FORM_STATUS.SUCCESS,
        error: status === FORM_STATUS.ERROR,
      }"
    >
      {{ validateMessage }}
    </p>
  </div>
</template>

<script>
const FORM_STATUS = {
  NO_COMPLETE: 'NO_COMPLETE',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'VForm',
  provide() {
    return {
      form: this,
    }
  },
  data() {
    return {
      validateMessage: '',
      fields: [],
      status: FORM_STATUS.NO_COMPLETE,
      FORM_STATUS,
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
  created() {
    this.$on('addField', (child) => {
      this.fields.push(child)
    })
  },
  mounted() {
    this.$on('clearStatus', () => {
      this.status = FORM_STATUS.NO_COMPLETE
      this.validateMessage = ''
    })
  },
  methods: {
    validate() {
      if (this.fields.length) {
        Promise.all(this.fields.map((field) => field.validate()))
          .then(() => {
            this.validateMessage = 'Success'
            this.status = FORM_STATUS.SUCCESS
          })
          .catch(() => {
            this.validateMessage = 'please fill form correctly'
            this.status = FORM_STATUS.ERROR
          })
      } else {
        this.validateMessage = 'Success'
        this.status = FORM_STATUS.SUCCESS
      }
    },
    // validate() {
    //   const promises = []
    //   this.validateHelper(this.$children, 'VFormItem', (validator) => {
    //     promises.push(validator)
    //   })
    //   Promise.all(promises)
    //     .then(() => {
    //       this.validateMessage = 'Success'
    //       this.status = FORM_STATUS.SUCCESS
    //     })
    //     .catch(() => {
    //       this.validateMessage = 'please fill form correctly'
    //       this.status = FORM_STATUS.ERROR
    //     })
    // },
    // validateHelper(children, targetComponent, validateCb) {
    //   if (!children) return
    //   children.forEach((child) => {
    //     if (child.$options?.name === targetComponent) {
    //       validateCb(child.validate())
    //     } else {
    //       this.validateHelper(child.$children, targetComponent, validateCb)
    //     }
    //   })
    // },
  },
}
</script>

<style>
.error {
  color: red;
  font-weight: bold;
}
.success {
  color: green;
  font-weight: bold;
}
</style>
