import { VueOptions } from './type'
import Dep from './dep'
import Compile from './compile'
import Watcher from './watcher'

export default class Vue {
  $options: VueOptions
  $refs: { [key: string]: HTMLElement } = {}
  $children: Vue[] = []

  constructor(options: VueOptions, public $parent?: Vue) {
    this.$options = options

    if (typeof options?.data === 'function') options.data = options.data()

    this.$options.beforeCreate?.call(this)
    this._bindDataMethodsOnVue()
    // add dep for each prop of data
    this._observe(options.data)
    this._handleWatchers()
    this.$options.created?.call(this)
    // If el exists, auto mount to the DOM.
    if (this.$options.el) this.$mount(this.$options.el)
  }

  $mount(el: string | HTMLElement) {
    if (typeof el === 'string') {
      el = document.querySelector(el) as HTMLElement
    }

    const fragment = document
      .createRange()
      .createContextualFragment(this.$options.template)
    new Compile(this, fragment)
    el.appendChild(fragment)
  }

  _observe(data: { [key: string]: any } | undefined) {
    if (!data || typeof data !== 'object') {
      return
    }
    for (const key of Object.keys(data)) {
      this._defineReactiveProp(data, key, data[key])
      this._observe(data[key])
    }
  }

  _defineReactiveProp(obj: Object, key: string, value: any) {
    let dep: Dep
    Object.defineProperty(obj, key, {
      get() {
        if (!dep) {
          dep = new Dep()
        }
        if (Dep.target) {
          dep.push(Dep.target)
          Dep.target = null
        }

        return value
      },
      set(newVal) {
        dep && dep.notify(newVal, value)
        value = newVal
      },
    })
  }

  _bindDataMethodsOnVue() {
    if (this.$options.data) {
      for (const key of Object.keys(this.$options.data)) {
        Object.defineProperty(this, key, {
          get() {
            return this.$options.data[key]
          },
          set(newVal) {
            this.$options.data[key] = newVal
          },
        })
      }
    }
    if (this.$options.methods) {
      for (const key of Object.keys(this.$options.methods)) {
        // @ts-ignore
        this.$options.methods[key] = this.$options.methods[key].bind(this)
        Object.defineProperty(this, key, {
          get() {
            return this.$options.methods[key]
          },
        })
      }
    }
  }

  _handleWatchers() {
    if (!this.$options.watch) return
    for (const [key, value] of Object.entries(this.$options.watch)) {
      if (typeof value === 'function') {
        // @ts-ignore
        Dep.target = new Watcher(value.bind(this))
        // @ts-ignore
        this[key]
      } else if (typeof value === 'object') {
        // @ts-ignore
        if (!value.handler) {
          return
        }
        // @ts-ignore
        Dep.target = new Watcher(value.handler.bind(this))
        // @ts-ignore
        if (value.immediate) {
          // @ts-ignore
          value.handler(this[key])
        } else {
          // @ts-ignore
          this[key]
        }
      }
    }
  }
}
