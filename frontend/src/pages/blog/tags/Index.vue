<template>
  <div>
    <div>{{ tag.allTags }}</div>
    <div>{{ tag.tagsMap }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { getAllTags, getPostsByTagsMaps, getAllPostsByTags } from '@/utils/articleUtils'
import performanceTest from '@/utils/performanceTest'
import type { Store } from 'vuex'

function useTags(store: Store<any>) {
  const { allTags, tagsMap } = getAllTags(store.state.article.directory)
  const someTagsArticles = performanceTest(getPostsByTagsMaps)(tagsMap, [allTags[0], allTags[1]])
  console.log(someTagsArticles)
  const someTagsArticles1 = performanceTest(getAllPostsByTags)(store.state.article.directory, [allTags[0], allTags[1]])
  console.log(someTagsArticles1)
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
