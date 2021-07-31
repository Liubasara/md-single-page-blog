import { createApp } from 'vue'
import PopoverConstructor from '@/components/popover/Index.vue'
import type { Component, ComponentPublicInstance } from 'vue'
import type { DialogProps } from '@/components/popover/props'

export type PopoverInstance =
  | (ComponentPublicInstance & {
      remove?: () => any
    })
  | undefined

export default function createPopover(
  opt: Component,
  dialogProps: DialogProps = {
    width: 540,
    top: 100,
    bottom: 100
  }
) {
  const _dialogProps: DialogProps = {
    width: 540,
    top: 100,
    bottom: 100,
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
