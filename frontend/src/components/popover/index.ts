import { createApp } from 'vue'
import PopoverConstructor from '@/components/popover/Index.vue'
import DialogProps from '@/components/popover/props'
import type { Component, ComponentPublicInstance, ExtractPropTypes } from 'vue'

export type PopoverInstance =
  | (ComponentPublicInstance & {
      remove?: () => any
    })
  | undefined

export default function createPopover(
  opt: Component,
  dialogProps: Partial<ExtractPropTypes<typeof DialogProps>> = {
    width: 540,
    top: 100,
    bottom: 100
  }
) {
  const _dialogProps: Partial<ExtractPropTypes<typeof DialogProps>> = {
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
    function remove(this: any) {
      function done() {
        app?.unmount?.()
        document.body.removeChild(mountNode)
        $inst = void 0
      }
      if (_dialogProps.customCloseFunc) {
        _dialogProps.customCloseFunc.call(this, done)
      } else {
        done()
      }
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
