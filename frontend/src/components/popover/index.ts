import { createApp } from 'vue'
import type { ComponentOptions, ComponentPublicInstance } from 'vue'
import PopoverConstructor from '@/components/popover/Index.vue'

export type PopoverInstance =
  | (ComponentPublicInstance & {
      remove?: () => any
    })
  | undefined

export default function createPopover(opt: ComponentOptions) {
  let $inst: PopoverInstance
  return function (...args: any[]) {
    if ($inst) return $inst
    const mountNode = document.createElement('div')
    mountNode.classList.add('popover')
    document.body.appendChild(mountNode)
    function remove() {
      app?.unmount?.()
      document.body.removeChild(mountNode)
      $inst = void 0
    }
    const app = createApp(PopoverConstructor, {
      dialogOpts: opt,
      dialogExtractBind: {
        onClose: remove
      },
      ...args
    })
    $inst = app.mount(mountNode)
    $inst.remove = remove
    return $inst
  }
}
