<template>
  <div class="search-wrapper">
    Search
    <button @click="close">delDialog</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import searchProps from '@/components/search/props'

export default defineComponent({
  name: 'Search',
  props: searchProps,
  setup(props, { emit }) {
    const close = () => {
      console.log(props.name)
      emit('close')
    }
    const customOnPopoverMaskClick = function (done: Function) {
      console.log('searchMaskClick')
      // emit('close')
      done()
    }
    return {
      close,
      customOnPopoverMaskClick
    }
  }
})
</script>

<style lang="scss" scoped>
.search-wrapper {
  background: #fff;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
