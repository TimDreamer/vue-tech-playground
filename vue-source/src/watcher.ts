export default class Watcher {
  constructor(private cb: (newVal: any, oldVal?: any) => void) {}

  update(newVal: any, oldVal?: any) {
    this.cb(newVal, oldVal)
  }
}
