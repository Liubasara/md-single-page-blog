<template>
  blogHome: 
  <div>directory</div>
  {{ $store.state.article.directory }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'BlogHome',
  setup() {
    const store = useStore()
    store.dispatch('article/fetchAllContents')
  },
})
</script>
