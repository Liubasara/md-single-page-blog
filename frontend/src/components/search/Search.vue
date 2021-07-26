<template>
  <div class="search-wrapper">
    Search
    <button @click="close">delDialog</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Search',
  setup(props, { emit }) {
    const close = () => {
      emit('close')
    }
    return {
      close
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
