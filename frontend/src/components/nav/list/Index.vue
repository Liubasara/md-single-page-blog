<template>
  <div class="nav-list">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'NavList'
})
</script>
<style lang="scss" scoped>
.nav-list {
  margin: 15px 0;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  justify-content: space-between;
  &::after {
    content: '';
    display: block;
    flex-grow: 1;
  }
}
</style>