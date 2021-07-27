<template>
  <div class="dialog-wrapper">
    <div class="popover-content">
      <component ref="currentPopover" :is="props.componentOpts" v-bind="props.componentBind"></component>
    </div>
    <div class="dialog-mask" @click="onMaskClick"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, h, computed, ref } from 'vue'
import dialogProps from '@/components/popover/props'
import type { ComponentPublicInstance } from 'vue'

export default defineComponent({
  name: 'Popover',
  props: {
    componentOpts: {
      type: Object,
      default: () =>
        defineComponent({
          render: () => h('div')
        })
    },
    componentBind: {
      type: Object,
      default: () => ({})
    },
    ...dialogProps
  },
  setup(props) {
    const {
      componentBind: { onClose }
    } = props
    const currentPopover = ref<ComponentPublicInstance & { customOnPopoverMaskClick?: Function }>()
    const onMaskClick = function() {
      const customOnPopoverMaskClick = props.customOnPopoverMaskClick || currentPopover.value?.customOnPopoverMaskClick
      if (customOnPopoverMaskClick) {
        customOnPopoverMaskClick(onClose)
      } else {
        onClose()
      }
    }
    const widthPx = computed(() => {
      return props.width + 'px'
    })
    const halfWidthPx = computed(() => {
      return '-' + props.width / 2 + 'px'
    })
    const heightPx = computed(() => {
      return props.height + 'px'
    })
    const halfHeightPx = computed(() => {
      return '-' + props.height / 2 + 'px'
    })
    return {
      props,
      onMaskClick,
      currentPopover,
      widthPx,
      halfWidthPx,
      heightPx,
      halfHeightPx
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/zIndex.scss';

.dialog-wrapper {
  position: fixed;
  z-index: $zindex1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
}

.dialog-mask {
  position: fixed;
  z-index: $zindex1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.popover-content {
  position: fixed;
  z-index: $zindex1;
  top: 50%;
  left: 50%;
  height: v-bind(heightPx);
  margin-top: v-bind(halfHeightPx);
  width: v-bind(widthPx);
  margin-left: v-bind(halfWidthPx);
  z-index: $zindex2;
}
</style>
