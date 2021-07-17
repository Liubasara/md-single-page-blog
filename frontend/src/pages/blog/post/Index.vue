<template>
  <div>
    articlePosts, {{ route.params.name }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'blogPost',
  setup() {
    const route = useRoute()
    return {
      route
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
