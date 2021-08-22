<template>
  <div class="collapse" ref="collapseContainer">
    <div ref="slotBodyContainer">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch, toRef } from 'vue'
import type { Ref } from 'vue'
function useCollapseHeight<T extends Element>(collapseRef: Ref<T> | Ref<undefined>, elementRef: Ref<T> | Ref<undefined>, isExpand: Ref<Boolean>) {
  const elementRefHeightRef = ref('0px')
  const resizeObserver = new ResizeObserver(() => {
    elementRefHeightRef.value = elementRef.value
      ? getComputedStyle(elementRef.value).height
      : '0px'
  })
  onMounted(() => {
    elementRef.value && resizeObserver.observe(elementRef.value)
  })
  watch(isExpand, newVal => {
    if (newVal) {
      collapseRef.value?.classList.remove('in')
      collapseRef.value?.classList.add('out')
    } else {
      collapseRef.value?.classList.remove('out')
      collapseRef.value?.classList.add('in')
    }
  }, { immediate: true })
  return elementRefHeightRef
}
export default defineComponent({
  name: 'Collapse',
  props: {
    isExpand: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isExpand = toRef(props, 'isExpand')
    const collapseContainer = ref<HTMLDivElement>()
    const slotBodyContainer = ref<HTMLDivElement>()
    const collapseHeight = useCollapseHeight(collapseContainer, slotBodyContainer, isExpand)
    return {
      collapseContainer,
      slotBodyContainer,
      collapseHeight
    }
  }
})
</script>
<style lang="scss" scoped>
.collapse {
  overflow: hidden;
  height: v-bind(collapseHeight);
  &.in {
    transition: 0.3s ease;
    height: 0;
  }
  &.out {
    transition: 0.3s ease;
    height: v-bind(collapseHeight);
  }
}
</style>