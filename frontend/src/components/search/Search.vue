<template>
  <div class="dialog-wrapper">
    123
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Search',
  setup() {
    
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
  background: lightblue;
}
</style>
