import { createApp } from 'vue'
import PopoverConstructor from '@/components/popover/Index.vue'
import type { ComponentOptions, ComponentPublicInstance } from 'vue'
import type { DialogProps } from '@/components/popover/props'

export type PopoverInstance =
  | (ComponentPublicInstance & {
      remove?: () => any
    })
  | undefined

export default function createPopover(
  opt: ComponentOptions,
  dialogProps: DialogProps = {
    width: 540,
    height: 380
  }
) {
  const _dialogProps: DialogProps = {
    width: 540,
    height: 380,
    ...dialogProps,
  }
  let $inst: PopoverInstance
  return function <K extends object>(componentProps: K = {} as K) {
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
      componentOpts: opt,
      componentBind: {
        onClose: remove,
        ...componentProps
      },
      ..._dialogProps
    })
    $inst = app.mount(mountNode)
    $inst.remove = remove
    return $inst
  }
}
