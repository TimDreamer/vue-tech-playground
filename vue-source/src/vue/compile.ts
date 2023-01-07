import { VueOptions } from './type'
import Dep from './dep'
import Vue from '.'
import Watcher from './watcher'
import {
  isChildComponent,
  isElement,
  isInterpolation,
  isDirective,
  isEventHandler,
  getEventName,
  getFunctionNameWithArgs,
  isRef,
  getDeepestValue,
} from './utils'

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
        if (isChildComponent(this.vm.$options.components, node.nodeName)) {
          for (const [key, options] of Object.entries(
            this.vm.$options.components
          )) {
            if (key.toLowerCase() === node.nodeName.toLowerCase()) {
              const div = document.createElement('div')
              const child = new Vue(options as VueOptions, this.vm)
              this.vm.$children.push(child)
              child.$mount(div)
              node.replaceWith(div)
              break
            }
          }
          return
        }

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
            const eventName = getEventName(attr.name)
            const [handlerName, handlerArgs] = getFunctionNameWithArgs(
              attr.value
            )
            node.addEventListener(
              eventName,
              // @ts-ignore
              this.vm.$options.methods[handlerName].bind(
                this.vm,
                ...handlerArgs
              )
            )
          } else if (isRef(attr.name)) {
            this.vm.$refs[attr.value.trim()] = node as HTMLElement
          }
        })
      } else if (isInterpolation(node)) {
        const oriTextContent = node.textContent as string
        Dep.target = new Watcher((newVal) => {
          this.bindView(node, newVal, 'text', oriTextContent)
        })
        // @ts-ignore
        // trigger this.vm[RegExp.$1] get func, then trigger this.vm.$options.data[RegExp.$1] get func, will add Dep.target in dep
        this.bindView(
          node,
          getDeepestValue(this.vm, RegExp.$1),
          'text',
          oriTextContent
        )
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

  textUpdate(node: Node, value: Function | string, oriTextContent: string) {
    node.textContent = oriTextContent.replace(
      /\{\{.*\}\}/,
      typeof value === 'function' ? value() : value
    )
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
