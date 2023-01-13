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
        // add a flag to identify router-view component
        this.$vnode.data.routerView = true
        let parent = this.$parent
        let depth = 0

        // find depth of this router-view
        while (parent) {
          if (parent?.$vnode?.data.routerView) {
            depth++
          }
          parent = parent.$parent
        }

        // get matched routes
        const route = this.$router._match()[depth]

        return h(route?.component)
      },
    })
  }

  constructor(options) {
    this.$options = options
    this.$current = window.location.pathname
    this._matchedRoutesCache = {}
    this._matchedRoutes = []

    // watch this.$current to trigger router-view render function
    _Vue.util.defineReactive(this, '$current')

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

  _match() {
    if (!(this.$current in this._matchedRoutesCache)) {
      this._matchHelper()
      this._matchedRoutesCache[this.$current] = this._matchedRoutes.slice()
      this._matchedRoutes = []
    }
    return this._matchedRoutesCache[this.$current]
  }

  _matchHelper(routes, target) {
    // edge case, if $current is home page, return immediately
    if (this?.$current === '/') {
      this._matchedRoutes.push(
        this.$options.routes.find((route) => route.path === '/')
      )
      return
    }

    routes = routes || this.$options.routes
    target = target || this.$current

    // ignore home page
    const route = routes.find(
      (route) => route.path !== '/' && target.startsWith(route.path)
    )

    if (route) {
      this._matchedRoutes.push(route)
      if (!route.children) return
      this._matchHelper(
        route.children,
        target.replace(new RegExp(`^${route.path}`), '')
      )
    }
    // no match found
    if (!this._matchedRoutes.length) {
      throw new Error("Can't find the route!")
    }
  }
}
