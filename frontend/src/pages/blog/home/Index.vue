<template>
  blogHome:
  <div>directory</div>
  {{ testArticleObj }}
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import type { Ref } from 'vue'
import { useStore } from 'vuex'

async function useGetArticleDetail(articleObj: articleTypeDirectory) {
  const gettersFunc = useStore().getters['article/getArticleDetailFunc']
  const res = await gettersFunc(articleObj) as Promise<articleType>
  return res
}

export default defineComponent({
  name: 'BlogHome',
  setup() {
    const store = useStore()
    store.dispatch('article/fetchAllContents')
    let testArticleObj: Ref<null> | Ref<articleType> = ref(null)
    onBeforeMount(async () => {
      testArticleObj.value = await useGetArticleDetail(store.state.article.directory[0])
      console.log(testArticleObj)
    })
    return {
      store,
      testArticleObj
    }
  }
})
</script>
