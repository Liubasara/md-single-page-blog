<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import throttle from 'lodash/throttle'

export default defineComponent({
  name: 'Scroll',
  setup(props, { emit }) {
    const page = ref(1)

    const handleWindowScroll = throttle(() => {
      if (
        document.documentElement.scrollHeight <
        document.documentElement.scrollTop + document.documentElement.clientHeight + 100
      ) {
        page.value += 1
        emit('load-next-page', page)
      }
    }, 500)
    onMounted(() => {
      window.addEventListener('scroll', handleWindowScroll)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', handleWindowScroll)
    })
    return {
      page
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
