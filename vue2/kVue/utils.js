export const isFunction = (f) => typeof f === 'function'
export const isObject = (o) => o && typeof o === 'object' && !Array.isArray(o)
export const isArray = (a) => Array.isArray(a)
