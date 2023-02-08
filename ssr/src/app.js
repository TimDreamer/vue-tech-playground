import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'

Vue.config.productionTip = false

export default function createApp(context) {
  const router = createRouter()
  const app = new Vue({
    render: (h) => h(App),
    router,
    context,
  })

  return { app, router }
}
