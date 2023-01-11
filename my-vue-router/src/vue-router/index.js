let _Vue

export default class Router {
  static install(Vue) {
    _Vue = Vue
    Object.defineProperty(Vue.prototype, '$router', {
      get() {
        return this.$root.$options.router
      },
    })

    Vue.component('router-link', {
      props: {
        to: {
          type: String,
          default: '',
        },
      },
      render(h) {
        return h('a', { attrs: { href: this.to } }, this.$slots.default)
      },
    })

    Vue.component('router-view', {
      render(h) {
        const { $current: path, $routeMap: routeMap } = this.$router
        return h(routeMap[path])
      },
    })
  }

  constructor(options) {
    this.$options = options
    this.$current = window.location.pathname
    // watch this.$current to trigger router-view render function
    _Vue.util.defineReactive(this, '$current')
    this.$routeMap = this.$options.routes.reduce((res, route) => {
      res[route.path] = route.component
      return res
    }, {})

    window.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'a') {
        e.preventDefault()
        const path = e.target.attributes.href.value
        this._doPushState(path)
      }
    })

    // support browser backward/forward
    window.addEventListener('popstate', () => {
      this.$current = window.location.pathname
    })
    window.addEventListener('replaceState', () => {
      this.$current = window.location.pathname
    })
  }

  _doPushState(path) {
    history.pushState(null, null, path)
    this.$current = path
  }

  push(location) {
    if (typeof location === 'string') {
      this._doPushState(location)
    } else if (typeof location === 'object' && 'path' in location) {
      this._doPushState(location.path)
    } else {
      throw new Error('Location error')
    }
  }
}
