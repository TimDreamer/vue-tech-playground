export default class Dep {
  constructor() {
    this.watchers = new Set()
  }

  addWatcher(watcher) {
    this.watchers.add(watcher)
  }

  notify() {
    for (const watcher of this.watchers) {
      watcher.update()
    }
  }
}
