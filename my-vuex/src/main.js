import Vue from 'vue'
import Vuex from './vuex'
import storeConfig from './store'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vuex)
const store = new Vuex.Store(storeConfig)

const app = new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')

// debug
window._vm = app
