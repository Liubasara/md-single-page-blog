<template>
  <div>
    <Scroll v-model:page="pageInstance.page.value">
      <template v-for="(item, index) in pageInstance.pageDirectory.value" :key="index">
        <BlogHomeArticleCard
          v-bind="articleCardInstance.getProps(item)"
          @cate-click="cate => articleCardInstance.handleCateClick(cate, item)"
          @tag-click="tag => articleCardInstance.handleTagClick(tag, item)"
          @name-click="articleCardInstance.handleArticleClick(item)"
          @date-click="articleCardInstance.handleArticleClick(item)"
        />
      </template>
    </Scroll>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Scroll from '@/components/scroll/Index.vue'
import BlogHomeArticleCard from '@/pages/blog/home/components/articleCard/Index.vue'
import articleCardProps from '@/pages/blog/home/components/articleCard/props'
import type { ExtractPropTypes } from 'vue'
import type { Router } from 'vue-router'
import type { StoreArticleModuleState } from '@/store/modules/article/index'

const PAGE_SIZE = 20

function useBlogHomeArticleCard(router: Router) {
  function handleCateClick(cate: string, item: articleTypeDirectory) {
    console.log(cate, item)
  }
  function handleTagClick(tag: string, item: articleTypeDirectory) {
    console.log(tag, item)
  }
  function handleArticleClick(item: articleTypeDirectory) {
    router.push({ name: 'BlogPost', params: { name: item.name } })
  }
  function getProps(item: articleTypeDirectory): ExtractPropTypes<typeof articleCardProps> {
    return {
      name: item.title,
      date: item.time,
      tags: item.tags,
      cate: item.categories
    }
  }
  return {
    handleTagClick,
    handleCateClick,
    handleArticleClick,
    getProps
  }
}

function usePage(directory: Array<articleTypeDirectory>) {
  const page = ref(1)
  const pageDirectory = computed(() => {
    return directory.slice(0, PAGE_SIZE * page.value)
  })
  return {
    page,
    pageDirectory
  }
}

export default defineComponent({
  name: 'BlogHome',
  components: { Scroll, BlogHomeArticleCard },
  setup() {
    const store = useStore<StoreArticleModuleState>()
    const router = useRouter()
    store.dispatch('article/fetchAllContents')

    const articleCardInstance = useBlogHomeArticleCard(router)
    const pageInstance = usePage(store.state.article.directory)
    return {
      store,
      articleCardInstance,
      pageInstance
    }
  }
})
</script>

<style lang="scss">
.raw-markdown-html {
  @import "@/assets/style/markdown/index.scss";
}
</style>
