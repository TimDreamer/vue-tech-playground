export function isChildComponent(components: Object, nodeName: string) {
  if (!components || typeof components !== 'object' || !nodeName) return false

  return Object.keys(components).some(
    (key) => key.toLowerCase() === nodeName.toLowerCase()
  )
}

export function isElement(node: Node) {
  return node.nodeType === Node.ELEMENT_NODE
}
export function isInterpolation(node: Node) {
  return (
    node.nodeType === Node.TEXT_NODE &&
    /\{\{(.*)\}\}/.test(node.textContent || '')
  )
}

export function isDirective(attrName: string) {
  return attrName.startsWith('v-')
}

export function isEventHandler(attrName: string) {
  return attrName.startsWith('@') || attrName.startsWith('v-on:')
}

export function getEventName(attrName: string): string {
  const pattern = 'v-on:'
  return attrName.startsWith(pattern)
    ? attrName.slice(pattern.length + 1)
    : attrName.slice(1)
}

function parseArgs(argString: string) {
  return argString.split(',').map((arg) => {
    if (arg.indexOf("'") >= 0 || arg.indexOf('"') >= 0)
      return arg.slice(1, arg.length - 1)
    return arg
  })
}

// args only support string right now
export function getFunctionNameWithArgs(attrValue: string): [string, string[]] {
  if (attrValue.indexOf('(') === -1) {
    return [attrValue, []]
  }
  // @ts-ignore
  return (
    attrValue
      .match(/(.*)\((.*)\)/)
      ?.slice(1, 3)
      .map((str, idx) => {
        if (idx !== 0) {
          return parseArgs(str.trim())
        }
        return str.trim()
      }) || [attrValue, []]
  )
}

export function isRef(attrName: string) {
  return attrName === 'ref'
}

export function getDeepestValue(
  obj: { [key: string]: any },
  accessChain: string
) {
  accessChain = accessChain.trim()
  if (accessChain.indexOf('.') === -1) {
    return obj[accessChain]
  }

  for (const key of accessChain.split('.')) {
    obj = obj[key]
  }
  return obj
}
