<template>
  <div :class="['nav-item', { active: $props.isActive }]">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NavListItem',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
})
</script>
<style lang="scss" scoped>
.nav-item {
  margin-right: 15px;
  margin-bottom: 5px;
  cursor: pointer;
  user-select: none;
  color: #2e2e33;
  &:hover {
    color: #2196f3;
  }
  &.active {
    color: #0073ce;
  }
}
</style>