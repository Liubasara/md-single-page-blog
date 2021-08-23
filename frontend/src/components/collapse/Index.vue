<template>
  <div class="collapse" ref="collapseContainer">
    <div ref="slotBodyContainer">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch, toRefs, computed } from 'vue'
import type { Ref } from 'vue'
function useCollapseHeight<T extends Element>(
  collapseRef: Ref<HTMLDivElement> | Ref<undefined>,
  elementRef: Ref<T> | Ref<undefined>,
  isExpand: Ref<Boolean>,
  transitionSec: Ref<number>
) {
  const elementRefHeightRef = ref('0px')
  const resizeObserver = new ResizeObserver(() => {
    elementRefHeightRef.value = elementRef.value
      ? getComputedStyle(elementRef.value).height
      : '0px'
  })
  onMounted(() => {
    elementRef.value && resizeObserver.observe(elementRef.value)
    setTimeout(() => {
      collapseRef.value && (collapseRef.value.style.transition = `${transitionSec.value}s ease-in-out`)
    }, 0)
  })
  watch([isExpand, collapseRef], newVal => {
    const [isExpandNewVal] = newVal
    if (isExpandNewVal) {
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
    },
    transitionSec: {
      type: Number,
      default: 0.3
    },
    minHeight: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const { isExpand, transitionSec, minHeight } = toRefs(props)
    const collapseContainer = ref<HTMLDivElement>()
    const slotBodyContainer = ref<HTMLDivElement>()
    const collapseHeight = useCollapseHeight(collapseContainer, slotBodyContainer, isExpand, transitionSec)
    const computeMinHeight = computed(() => minHeight.value + 'px')
    return {
      collapseContainer,
      slotBodyContainer,
      collapseHeight,
      computeMinHeight
    }
  }
})
</script>
<style lang="scss" scoped>
.collapse {
  overflow: hidden;
  &.in {
    height: v-bind(computeMinHeight);
  }
  &.out {
    height: v-bind(collapseHeight);
  }
}
</style>