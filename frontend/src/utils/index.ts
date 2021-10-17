/**
 *  - Inspired:
 *    https://github.com/jashkenas/underscore/blob/master/modules/isFunction.js
 */
let isFunction = (functionToCheck: any): functionToCheck is Function => {
  var getType = {}
  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === '[object Function]'
  )
}

if (
  typeof /./ !== 'function' &&
  typeof Int8Array !== 'object' &&
  typeof document.childNodes !== 'function'
) {
  isFunction = function (obj: any): obj is Function {
    return typeof obj === 'function' || false
  }
}

export { isFunction }

export const isUndefined = (val: any): val is undefined => {
  return val === void 0
}

export const isDefined = (val: any): Boolean => {
  return val !== undefined && val !== null
}

export function isHtmlElement(node: any): node is HTMLElement {
  return node && node.nodeType === Node.ELEMENT_NODE
}

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/

const camelCase = (name: string) => {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

export const getStyle = (
  element: HTMLElement,
  styleName: keyof CSSStyleDeclaration
) => {
  if (!element || !styleName) return null
  styleName = camelCase(styleName as string) as keyof CSSStyleDeclaration
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    const computed = document.defaultView?.getComputedStyle?.(element, '')
    return element.style[styleName] || computed?.[styleName] || null
  } catch (e) {
    return element.style[styleName]
  }
}

export const isScroll = (el: HTMLElement, vertical: boolean) => {
  const determinedDirection = vertical !== null && vertical !== undefined
  const overflow = determinedDirection
    ? vertical
      ? getStyle(el, 'overflowY')
      : getStyle(el, 'overflowX')
    : getStyle(el, 'overflow')
  if (typeof overflow === 'string') {
    return overflow.match(/(scroll|auto|overlay)/)
  }
  return false
}

export const getScrollContainer = (el: HTMLElement | null, vertical: boolean) => {
  let parent = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window
    }
    if (isScroll(parent, vertical)) {
      return parent
    }
    parent = parent.parentElement || null
  }

  return parent
}
