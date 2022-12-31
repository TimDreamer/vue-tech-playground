import Dep from './dep'
import Vue from './vue'
import Watcher from './watcher'

function isElement(node: Node) {
  return node.nodeType === Node.ELEMENT_NODE
}
function isInterpolation(node: Node) {
  return (
    node.nodeType === Node.TEXT_NODE &&
    /\{\{(.*)\}\}/.test(node.textContent || '')
  )
}

function isDirective(attrName: string) {
  return attrName.startsWith('v-')
}

function isEventHandler(attrName: string) {
  return attrName.startsWith('@')
}

function getDeepestValue(obj: { [key: string]: any }, accessChain: string) {
  accessChain = accessChain.trim()
  if (accessChain.indexOf('.') === -1) {
    return obj[accessChain]
  }

  for (const key of accessChain.split('.')) {
    obj = obj[key]
  }
  return obj
}

export default class Compile {
  constructor(private vm: Vue, frag: DocumentFragment) {
    this.vm.$options.beforeMount?.call(this.vm)
    // add watchers of view for each dep
    this.parse(frag)
    this.vm.$options.mounted?.call(this.vm)
  }

  parse(frag: Node) {
    frag.childNodes.forEach((node) => {
      if (isElement(node)) {
        Array.from((node as Element).attributes).forEach((attr) => {
          if (isDirective(attr.name)) {
            const vName = attr.name.slice(2)
            const vValue = getDeepestValue(this.vm, attr.value)
            Dep.target = new Watcher((newVal) => {
              this.bindView(node, newVal, vName)
            })
            // @ts-ignore
            this.bindView(node, vValue, vName, attr.value)
          } else if (isEventHandler(attr.name)) {
            node.addEventListener(
              attr.name.slice(1),
              // @ts-ignore
              this.vm.$options.methods[attr.value.trim()].bind(this.vm)
            )
          }
        })
      } else if (isInterpolation(node)) {
        Dep.target = new Watcher((newVal) => {
          this.bindView(node, newVal, 'text')
        })
        // @ts-ignore
        // trigger this.vm[RegExp.$1] get func, then trigger this.vm.$options.data[RegExp.$1] get func, will add Dep.target in dep
        this.bindView(node, getDeepestValue(this.vm, RegExp.$1), 'text')
      }

      // Even work for v-html, cause v-html add childNodes under the node,
      // then we dive in again to parse the value of v-html.
      if (node.childNodes && node.childNodes.length) this.parse(node)
    })
  }

  bindView(node: Node, val: any, operatorName: string, key?: string) {
    // @ts-ignore
    const updateFnc = this[operatorName + 'Update'].bind(this)
    if (updateFnc) updateFnc(node, val, key)
  }

  textUpdate(node: Node, value: Function | string) {
    node.textContent = typeof value === 'function' ? value() : value
  }

  htmlUpdate(node: Element, value: Function | string) {
    node.innerHTML = typeof value === 'function' ? value() : value
  }

  modelUpdate(node: HTMLInputElement, value: Function | string, key?: string) {
    node.value = typeof value === 'function' ? value() : value
    key &&
      node.addEventListener('input', (evt) => {
        // @ts-ignore
        this.vm[key] = evt.target.value
      })
  }
}
