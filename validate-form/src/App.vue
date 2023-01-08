<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <v-form
      :model="userInfo"
      :rules="rules"
      @submit.prevent="login"
      ref="vForm"
    >
      <v-form-item label="username" prop="username">
        <v-form-input type="text" v-model="userInfo.name" />
      </v-form-item>
      <v-form-item label="password" prop="password">
        <v-form-input type="password" v-model="userInfo.password" />
      </v-form-item>
      <v-form-item>
        <button>Submit</button>
      </v-form-item>
    </v-form>
  </div>
</template>

<script>
import VForm from './components/VForm.vue'
import VFormItem from './components/VFormItem.vue'
import VFormInput from './components/VFormInput.vue'

export default {
  name: 'App',
  components: { VForm, VFormItem, VFormInput },
  data() {
    return {
      userInfo: {
        username: 'Tim',
        password: '',
      },
      rules: {
        username: [{ required: true, message: 'please enter user name' }],
        password: [{ required: true, message: 'please enter password' }],
      },
    }
  },
  methods: {
    login() {
      this.$refs.vForm.validate()
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
