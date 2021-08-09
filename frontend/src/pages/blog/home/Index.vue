<template>
  <div>
    <Scroll @loadNextPage="loadNextPageArticle">
      <template v-for="(item, index) in store.state.article.directory" :key="index">
        <BlogHomeArticleCard></BlogHomeArticleCard>
      </template>
    </Scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from 'vue'
import { useStore } from 'vuex'
import Scroll from '@/components/scroll/Index.vue'
import BlogHomeArticleCard from '@/pages/blog/home/components/articleCard/Index.vue'
import type { Ref } from 'vue'
import type { getArticleDetailGettersType, StoreArticleModuleState } from '@/store/modules/article/index'
import type { Store } from 'vuex'

function useGetArticleDetail(store: Store<any>, articleObj: articleTypeDirectory | undefined) {
  if (!articleObj) return Promise.reject()
  const gettersFunc = store.getters['article/getArticleDetailFunc'] as getArticleDetailGettersType
  return gettersFunc(articleObj)
}

export default defineComponent({
  name: 'BlogHome',
  components: { Scroll, BlogHomeArticleCard },
  setup() {
    const store = useStore<StoreArticleModuleState>()
    store.dispatch('article/fetchAllContents')
    let testArticleObj = ref<{ body: string } | articleType>({ body: '' })
    let directoryIndex = ref<number>(0)
    onBeforeMount(async () => {
      const res = await useGetArticleDetail(store, store.state.article.directory[directoryIndex.value])
      res && (testArticleObj.value = res)
      watch(directoryIndex, async (newVal) => {
        let res!: articleType | undefined
        try {
          res = await useGetArticleDetail(store, store.state.article.directory[newVal])
        } catch (e) {}
        res && (testArticleObj.value = res)
        if (!res) {
          directoryIndex.value = 0
        } else {
          testArticleObj.value = res
        }
      })
    })
    const loadNextPageArticle = (page: Ref<number>) => {
      console.log(page.value)
    }
    return {
      store,
      directoryIndex,
      testArticleObj,
      loadNextPageArticle
    }
  }
})
</script>

<style lang="scss">
.raw-markdown-html {
  @import '@/assets/style/markdown/index.scss';
}
</style>
