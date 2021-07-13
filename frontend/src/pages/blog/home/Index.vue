<template>
  <div>
    blogHome:
    <div>directory</div>
    <!-- {{ testArticleObj }} -->
    <div v-html="testArticleObj.body" class="raw-markdown-html"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import type { Ref } from 'vue'
import { useStore } from 'vuex'
import type { getArticleDetailGettersType } from '@/store/modules/article/index'
import type { Store } from 'vuex'

function useGetArticleDetail(store: Store<any>, articleObj: articleTypeDirectory | undefined) {
  if (!articleObj) return Promise.reject()
  const gettersFunc = store.getters['article/getArticleDetailFunc'] as getArticleDetailGettersType
  return gettersFunc(articleObj)
}

export default defineComponent({
  name: 'BlogHome',
  setup() {
    const store = useStore()
    store.dispatch('article/fetchAllContents')
    let testArticleObj: Ref<''> | Ref<articleType> = ref('')
    onBeforeMount(() => {
      setTimeout(async () => {
        const res = await useGetArticleDetail(store, store.state.article.directory[0])
        res && (testArticleObj.value = res)
      }, 0)
    })
    return {
      store,
      testArticleObj
    }
  }
})
</script>

<style lang="scss">
.raw-markdown-html {
  @import 'highlight.js/scss/atom-one-dark.scss';
  .hljs {
    display: block;
  }
}
</style>
