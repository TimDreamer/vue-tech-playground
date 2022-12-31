export default class Watcher {
  constructor(private cb: (newVal: any) => void) {}

  update(newVal: any) {
    this.cb(newVal)
  }
}
