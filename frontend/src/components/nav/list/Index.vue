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
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
}
</style>