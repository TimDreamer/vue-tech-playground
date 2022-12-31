import { VueOptions } from './type'
import Dep from './dep'
import Compile from './compile'

export default class Vue {
  $options: VueOptions

  constructor(options: VueOptions) {
    this.$options = options

    if (typeof options?.data === 'function') options.data = options.data()

    this.$options.beforeCreate?.call(this)
    if (options.data)
      for (const key of Object.keys(options.data)) {
        Object.defineProperty(this, key, {
          get() {
            return this.$options.data[key]
          },
          set(newVal) {
            this.$options.data[key] = newVal
          },
        })
      }
    // add dep for each prop of data
    this._observe(options.data)
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
        value = newVal
        dep && dep.notify(newVal)
      },
    })
  }
}
