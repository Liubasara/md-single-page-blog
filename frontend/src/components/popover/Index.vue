<template>
  <div class="dialog-wrapper" ref="dialogWrapper">
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
      componentBind: { onClose },
      width,
      top,
      bottom
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
    return {
      props,
      onMaskClick,
      currentPopover,
      themeWidth: width,
      themeTop: top,
      themeBottom: bottom
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/zIndex.scss';
@import '@/assets/style/screenMixins.scss';

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
  top: calc(v-bind(themeTop) * 1px);
  left: 50%;
  bottom: calc(v-bind(themeBottom) * 1px);
  width: calc(v-bind(themeWidth) * 1px);
  margin-left: calc(v-bind(themeWidth) / 2 * -1px);
  z-index: $zindex2;
  // transition: 1s ease-in-out;
  @media screen and (max-width: 559px), screen and (max-height: 479px) {
    width: 100%;
    height: 100%;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    margin-top: 0;
    margin-left: 0;
  }
}
</style>
