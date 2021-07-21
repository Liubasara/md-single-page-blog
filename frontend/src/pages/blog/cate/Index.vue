<template>
  <div>
    <div>{{ cate.allCates }}</div>
    <div>{{ cate.catesMap }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { getAllCates, getAllPostsByCate, getPostsByCatesMaps } from '@/utils/articleUtils'
import performanceTest from '@/utils/performanceTest'
import { useStore } from 'vuex'
import type { Store } from 'vuex'

function useCate(store: Store<any>) {
  const { allCates, catesMap } = getAllCates(store.state.article.directory)
  const someCatesArticles = performanceTest(getPostsByCatesMaps)(catesMap, allCates[0])
  console.log(someCatesArticles)
  const someCatesArticles1 = performanceTest(getAllPostsByCate)(store.state.article.directory, allCates[0])
  console.log(someCatesArticles1)
  const data = reactive({
    allCates,
    catesMap
  })
  return {
    data
  }
}

export default defineComponent({
  name: 'blogCate',
  setup() {
    const store = useStore()
    const cateInstance = useCate(store)

    return {
      cate: cateInstance.data
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
