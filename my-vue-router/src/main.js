import Vue from 'vue'
import MyRouter from './vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Profile from './components/Profile.vue'
import Preferences from './components/Preferences.vue'

Vue.config.productionTip = false
Vue.use(MyRouter)

const routes = [
  { path: '/', component: Home },
  {
    path: '/about',
    component: About,
    children: [
      {
        path: '/profile',
        component: Profile,
      },
      {
        path: '/preferences',
        component: Preferences,
      },
    ],
  },
]

const router = new MyRouter({
  routes,
})

const app = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')

// for debug
window._vm = app
