import Watcher from './watcher'

export default class Dep {
  static target: Watcher | null
  deps: Array<Watcher> = []
  constructor() {}

  push(watcher: Watcher) {
    this.deps.push(watcher)
  }

  notify(newVal: any) {
    this.deps.forEach((dep) => dep.update(newVal))
  }
}
