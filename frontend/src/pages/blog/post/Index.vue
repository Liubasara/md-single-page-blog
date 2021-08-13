<template>
  <div>
    <div class="content">
      <article v-html="article?.body" class="raw-markdown-html"></article>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import type { articleGettersFuncType, StoreArticleModuleState } from '@/store/modules/article/index'

export default defineComponent({
  name: 'blogPost',
  setup() {
    const route = useRoute()
    const store = useStore<StoreArticleModuleState>()
    const directory = store.state.article.directory
    const obj = computed(() => {
      return directory.find(item => item.name === route.params.name)
    })
    const getArticleDetailFunc: articleGettersFuncType = store.getters['article/getArticleDetailFunc']
    let article = ref<articleType>()
    onMounted(async () => {
      if (obj.value) {
        article.value = await getArticleDetailFunc(obj.value)
        console.log(article.value)
      }
    })
    return {
      route,
      store,
      article
    }
  }
})
</script>

<style lang="scss" scoped>
.raw-markdown-html {
  @import "@/assets/style/markdown/index.scss";
}
</style>
