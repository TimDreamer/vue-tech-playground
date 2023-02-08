import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'

Vue.config.productionTip = false

export default function createApp() {
  const router = createRouter()
  return new Vue({
    render: (h) => h(App),
    router,
  }).$mount('#app')
}
