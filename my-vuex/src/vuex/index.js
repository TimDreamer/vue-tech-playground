let _Vue

class Store {
  constructor(options) {
    this.state = options.state
    this.getters = {}
    this._mutations = options.mutations
    this._actions = options.actions
    _Vue.util.defineReactive(this, 'state')

    for (const key of Object.keys(options.getters)) {
      Object.defineProperty(this.getters, key, {
        get() {
          return options.getters[key](options.state)
        },
      })
    }

    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  commit(type, payload) {
    const fn = this._mutations[type]
    if (!fn) {
      return
    }

    fn.call(this, this.state, payload)
  }

  dispatch(type, payload) {
    const fn = this._actions[type]
    if (!fn) {
      return
    }

    fn.call(this, this, payload)
  }
}

export default {
  install(Vue) {
    _Vue = Vue
    Object.defineProperty(Vue.prototype, '$store', {
      get() {
        return this.$root.$options.store
      },
    })
  },
  Store,
}
