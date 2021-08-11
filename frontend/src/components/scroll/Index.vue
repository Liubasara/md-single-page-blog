<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, toRefs } from 'vue'
import throttle from 'lodash/throttle'
import ScrollProps from '@/components/scroll/props'

export default defineComponent({
  name: 'Scroll',
  props: ScrollProps,
  emits: ['update:page'],
  setup(props, { emit }) {
    const { page } = toRefs(props)

    const handleWindowScroll = throttle(() => {
      if (
        document.documentElement.scrollHeight <
        document.documentElement.scrollTop + document.documentElement.clientHeight + 100
      ) {
        emit('update:page', page.value + 1)
      }
    }, 500)
    onMounted(() => {
      window.addEventListener('scroll', handleWindowScroll)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', handleWindowScroll)
    })
  }
})
</script>

<style lang="scss" scoped>
</style>
