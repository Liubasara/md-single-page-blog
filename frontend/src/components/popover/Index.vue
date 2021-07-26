<template>
  <div class="dialog-wrapper">
    <component
      :is="props.dialogOpts"
      v-bind="props.dialogExtractBind"
      class="dialog-content"
    ></component>
    <div class="dialog-mask"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'Popover',
  props: {
    dialogOpts: {
      type: Object,
      default: () =>
        defineComponent({
          render: () => h('div')
        })
    },
    dialogExtractBind: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    return {
      props
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

.dialog-content {
  position: fixed;
  z-index: $zindex1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: $zindex2;
}
</style>
