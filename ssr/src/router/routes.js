import Home from '../components/Home.vue'
import About from '../components/About.vue'
import NotFound from '../components/NotFound.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '*',
    name: 'error',
    component: NotFound,
  },
]
