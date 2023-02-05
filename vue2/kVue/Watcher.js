import Dep from './Dep'
import { isFunction } from './utils'

export default class Watcher {
  constructor(vm, updateFunc) {
    this.updating = false
    this.updateFunc = updateFunc
    this.$options = vm.$options
    this.hookWatcherOnRender()
    this.hookWatcher()
  }
  hookWatcher() {
    Dep.target = this
    this.updateFunc()
    Dep.target = null
  }
  hookWatcherOnRender() {
    const prop = 'render'
    const watcher = this

    let renderFunc = this.$options[prop]
    Object.defineProperty(this.$options, prop, {
      get() {
        return renderFunc
      },
      set(newFunc) {
        if (!isFunction(newFunc)) {
          console.warn('New render should be a function!')
          return
        }
        renderFunc = newFunc
        watcher.update()
      },
    })
  }
  update() {
    if (this.updating) {
      return
    }
    this.updating = true

    // use microtask to update component at most once in each tick
    Promise.resolve().then(() => {
      this.updateFunc()
      this.updating = false
    })
  }
}
