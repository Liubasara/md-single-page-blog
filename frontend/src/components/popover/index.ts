import { createApp } from 'vue'
import type { ComponentOptions, ComponentPublicInstance } from 'vue'

export type PopoverInstance = ComponentPublicInstance & {
  remove?: () => any
} | undefined

export default function createPopover(opt: ComponentOptions) {
  let $inst: PopoverInstance
  return function (...args: any[]) {
    if ($inst) return $inst
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    const app = createApp(opt, {
      ...args
    })
    $inst = app.mount(mountNode)
    $inst.remove = function() {
      app?.unmount?.()
      document.body.removeChild(mountNode)
      $inst = void 0
    }
    return $inst
  }
}