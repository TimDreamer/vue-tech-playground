import Dep from './Dep'
import Watcher from './Watcher'
import { isFunction, isObject, isArray } from './utils'

export default class Vue {
  constructor(options) {
    this.$options = options

    if (isFunction(this.$options.data)) {
      this.$options.$data = this.$options.data()
      this._observe(this.$options.$data)
      this._bindDateMethodsOnVue()
    }
    this.$options.el && this.$mount(this.$options.el)
  }

  _observe(data) {
    if (!isObject(data)) {
      return
    }
    for (const key of Object.keys(data)) {
      this._defineReactive(data, key, data[key])
      this._observe(data[key])
    }
  }

  _defineReactive(data, key, value) {
    const vm = this
    const dep = new Dep()
    Object.defineProperty(data, key, {
      get() {
        Dep.target && dep.addWatcher(Dep.target)
        return value
      },
      set(newVal) {
        if (newVal !== value) {
          vm._observe(newVal)
        }
        value = newVal
        dep.notify()
      },
    })
  }

  _bindDateMethodsOnVue() {
    if (isObject(this.$options.$data)) {
      for (const key of Object.keys(this.$options.$data)) {
        Object.defineProperty(this, key, {
          get() {
            return this.$options.$data[key]
          },
          set(val) {
            this.$options.$data[key] = val
          },
        })
      }
    }
  }

  _update(vnode) {
    const prevNode = this._root
    if (!prevNode) {
      // init
      this.__patch__(this.$el, vnode)
    } else {
      // update
      this.__patch__(prevNode, vnode)
    }

    this._root = vnode
  }

  _updateChildren(parent, oldCh, newCh) {
    const minLen = Math.min(oldCh.length, newCh.length)
    for (let i = 0; i < minLen; i++) {
      this.__patch__(oldCh[i], newCh[i])
    }

    if (oldCh.length === newCh.length) {
      return
    }
    if (oldCh.length > minLen) {
      for (let i = minLen; i < oldCh.length; i++) {
        parent.removeChild(oldCh[i].elm)
      }
    } else {
      for (let i = minLen; i < newCh.length; i++) {
        parent.appendChild(this._createElm(newCh[i]))
      }
    }
  }

  __patch__(oldNode, vnode) {
    if (oldNode.nodeType) {
      const parent = oldNode.parentElement
      const refElm = oldNode.nextSibling
      parent.insertBefore(this._createElm(vnode), refElm)
      parent.removeChild(oldNode)
    } else {
      let el = (vnode.elm = oldNode.elm)
      if (vnode.tag === oldNode.tag) {
        const oldCh = oldNode.children
        const newCh = vnode.children
        if (!isArray(oldCh) && !isArray(newCh)) {
          el.textContent = vnode.children
        } else if (!isArray(oldCh)) {
          el.innerHtml = ''
          newCh.forEach((v) => el.appendChild(this._createElm(v)))
        } else if (!isArray(newCh)) {
          el.textContent = newCh
        } else {
          this._updateChildren(el, oldCh, newCh)
        }
      } else {
        // el.parentNode.replaceChild(this._createElm(vnode), el)
        el.replaceWith(this._createElm(vnode))
      }
    }
  }

  _createElm(vnode) {
    const el = document.createElement(vnode.tag)
    if (!isArray(vnode.children)) {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach((v) => {
        el.appendChild(this._createElm(v))
      })
    }
    vnode.elm = el
    return el
  }

  $createElement(tag, data, children) {
    return { tag, data, children }
  }

  $mount(el) {
    if (!this.$el) {
      this.$el = document.querySelector(el)
    }
    const updateComponent = () => {
      this._update(this.$options.render.call(this, this.$createElement))
    }
    new Watcher(this, updateComponent)
  }
}
