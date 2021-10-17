import throttle from 'lodash/throttle'
import {
  isHtmlElement,
  isFunction,
  isUndefined,
  isDefined,
  getScrollContainer
} from '@/utils'
import type { Directive } from 'vue'

const getStyleComputedProperty = (
  element: HTMLElement | (Window & typeof globalThis),
  property: keyof CSSStyleDeclaration
) => {
  if (element === window) {
    element = document.documentElement
  }

  if (!isHtmlElement(element) || (element as HTMLElement).nodeType !== 1) {
    return []
  }
  // NOTE: 1 DOM access here
  const css = window.getComputedStyle(element, null)
  return property ? css[property] : css
}

const entries = <T>(obj: { [s: string]: T }): [string, T][] => {
  return Object.keys(obj || {}).map((key) => [key, obj[key]])
}

const getPositionSize = <
  T extends HTMLElement | (Window & typeof globalThis) | Document,
  K extends keyof HTMLElement
>(
  el: T,
  prop: K
) => {
  return el === window || el === document
    ? document.documentElement[prop]
    : (el as HTMLElement)[prop]
}

const getOffsetHeight = (el: HTMLElement) => {
  return getPositionSize(el, 'offsetHeight')
}

const getClientHeight = (el: HTMLElement) => {
  return getPositionSize(el, 'clientHeight')
}

const scope = 'ElInfiniteScroll'
const attributes = {
  delay: {
    type: Number,
    default: 200
  },
  distance: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  immediate: {
    type: Boolean,
    default: true
  }
}

const getScrollOptions = (el: HTMLElement, vm: any) => {
  if (!isHtmlElement(el)) return {}

  return entries(attributes).reduce(
    (map: { [key: string]: number | boolean }, [key, option]) => {
      const { type, default: defaultValue } = option
      let value: string | number | boolean | null | undefined =
        el.getAttribute(`infinite-scroll-${key}`) || undefined
      value = isUndefined(value) || isUndefined(vm[value]) ? value : vm[value]
      switch (type) {
        case Number:
          value = Number(value)
          value = Number.isNaN(value) ? defaultValue : value
          break
        case Boolean:
          value = isDefined(value)
            ? value === 'false'
              ? false
              : Boolean(value)
            : defaultValue
          break
        default:
          value = type(value)
      }
      map[key] = value
      return map
    },
    {}
  )
}

const getElementTop = (el: HTMLElement) => el.getBoundingClientRect().top

const handleScroll = function (this: any, cb: Function) {
  const { el, vm, container, observer } = this[scope] as {
    el: HTMLElement
    container: HTMLElement
    observer: MutationObserver
    vm: any
  }
  const { distance, disabled } = getScrollOptions(el, vm)

  if (disabled) return

  const containerInfo = container.getBoundingClientRect()
  if (!containerInfo.width && !containerInfo.height) return

  let shouldTrigger = false

  if (container === el) {
    // be aware of difference between clientHeight & offsetHeight & window.getComputedStyle().height
    const scrollBottom = container.scrollTop + getClientHeight(container)
    shouldTrigger = container.scrollHeight - scrollBottom <= distance
  } else {
    const heightBelowTop =
      getOffsetHeight(el) + getElementTop(el) - getElementTop(container)
    const offsetHeight = getOffsetHeight(container)
    const borderBottom = Number.parseFloat(
      getStyleComputedProperty(container, 'borderBottomWidth') as string
    )
    shouldTrigger = heightBelowTop - offsetHeight + borderBottom <= distance
  }

  if (shouldTrigger && isFunction(cb)) {
    cb.call(vm)
  } else if (observer) {
    observer.disconnect()
    this[scope].observer = null
  }
}

const directives: Directive = {
  // name: 'InfiniteScroll',
  mounted(el, binding, vnode) {
    const cb = binding.value
    // const vm = vnode.context
    const vm = binding.instance

    // only include vertical scroll
    const container = getScrollContainer(el, true)
    const { delay, immediate } = getScrollOptions(el, vm) as {
      delay: number;
      immediate: boolean;
    }
    const onScroll = throttle(handleScroll.bind(el, cb), delay)

    el[scope] = { el, vm, container, onScroll }

    if (container) {
      container.addEventListener('scroll', onScroll)

      if (immediate) {
        const observer = (el[scope].observer = new MutationObserver(onScroll))
        observer.observe(container as HTMLElement, { childList: true, subtree: true })
        onScroll()
      }
    }
  },
  unmounted(el) {
    const { container, onScroll } = el[scope]
    if (container) {
      container.removeEventListener('scroll', onScroll)
    }
  }
}

export default directives
