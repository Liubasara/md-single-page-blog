<template>
  <div>
    <Scroll v-model:page="pageInstance.page.value">
      <template v-for="(item, index) in pageInstance.pageDirectory.value" :key="index">
        <BlogHomeArticleCard
          v-bind="articleCardInstance.getProps(item)"
          @cate-click="cate => articleCardInstance.handleCateClick(cate)"
          @tag-click="tag => articleCardInstance.handleTagClick(tag)"
          @time-click="time => articleCardInstance.handleTimeClick(time)"
          @name-click="articleCardInstance.handleArticleClick(item)"
        />
      </template>
    </Scroll>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Scroll from '@/components/scroll/Index.vue'
import BlogHomeArticleCard from '@/pages/blog/home/components/articleCard/Index.vue'
import articleCardProps from '@/pages/blog/home/components/articleCard/props'
import { navigateToTagsPage } from '@/logic/tags'
import { navigateToCatesPage } from '@/logic/cates'
import { navigateToArticle } from '@/logic/article'
import { navigateToTarsDetailPage } from '@/logic/tars'
import type { ExtractPropTypes } from 'vue'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'
import type { StoreArticleModuleState } from '@/store/modules/article/index'

const PAGE_SIZE = 20

function useBlogHomeArticleCard(router: Router, route: RouteLocationNormalizedLoaded) {
  function handleCateClick(cate: string) {
    navigateToCatesPage(cate, router)
  }
  function handleTagClick(tag: string) {
    navigateToTagsPage(tag, router, route)
  }
  function handleArticleClick(item: articleTypeDirectory) {
    navigateToArticle(item.name, router)
  }
  function handleTimeClick(time: string) {
    navigateToTarsDetailPage(+new Date(time) + '', router)
  }
  function getProps(item: articleTypeDirectory): ExtractPropTypes<typeof articleCardProps> {
    return {
      name: item.title,
      date: item.time,
      tags: item.tags,
      cate: item.categories,
      info: item.info || ''
    }
  }
  return {
    handleTagClick,
    handleCateClick,
    handleArticleClick,
    handleTimeClick,
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
    const route = useRoute()
    store.dispatch('article/fetchAllContents')

    const articleCardInstance = useBlogHomeArticleCard(router, route)
    const pageInstance = usePage(store.state.article.directory)
    return {
      store,
      articleCardInstance,
      pageInstance
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
