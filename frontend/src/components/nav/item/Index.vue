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
  cursor: pointer;
  user-select: none;
  color: #2e2e33;
  &.active,
  &:hover {
    color: #0a6ebd;
  }
}
</style>