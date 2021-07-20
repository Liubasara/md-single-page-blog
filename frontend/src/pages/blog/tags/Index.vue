<template>
  <div>
    <div>{{ tag.allTags }}</div>
    <div>{{ tag.tagsMap }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { getAllTags } from '@/utils/articleUtils'
import type { Store } from 'vuex'

function useTags(store: Store<any>) {
  const { allTags, tagsMap } = getAllTags(store.state.article.directory)
  const data = reactive({
    allTags,
    tagsMap
  })
  return {
    data
  }
}

export default defineComponent({
  name: 'blogTags',
  setup() {
    const store = useStore()
    const tagInstancee = useTags(store)
    
    return {
      tag: tagInstancee.data
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
