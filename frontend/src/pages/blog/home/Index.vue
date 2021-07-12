<template>
  <div>
    blogHome:
    <div>directory</div>
    <!-- {{ testArticleObj }} -->
    <div v-html="testArticleObj.body"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import type { Ref } from 'vue'
import { useStore } from 'vuex'

function useGetArticleDetail(articleObj: articleTypeDirectory | undefined) {
  if (!articleObj) return ''
  const gettersFunc = useStore().getters['article/getArticleDetailFunc']
  return gettersFunc(articleObj)
}

export default defineComponent({
  name: 'BlogHome',
  setup() {
    const store = useStore()
    store.dispatch('article/fetchAllContents')
    let testArticleObj: Ref<''> | Ref<articleType> = ref('')
    onBeforeMount(async () => {
      testArticleObj.value = await useGetArticleDetail(store.state.article.directory[0])
    })
    return {
      store,
      testArticleObj
    }
  }
})
</script>
