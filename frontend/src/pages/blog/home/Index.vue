<template>
  <div>
    <Scroll v-model:page="page">
      <template v-for="(item, index) in pageDirectory" :key="index">
        <BlogHomeArticleCard
          v-bind="useArticleCard.getProps(item)"
          @cate-click="cate => useArticleCard.handleCateClick(cate, item)"
          @tag-click="tag => useArticleCard.handleTagClick(tag, item)"
          @name-click="useArticleCard.handleArticleClick(item)"
          @date-click="useArticleCard.handleArticleClick(item)"
        />
      </template>
    </Scroll>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import Scroll from '@/components/scroll/Index.vue'
import BlogHomeArticleCard from '@/pages/blog/home/components/articleCard/Index.vue'
import articleCardProps from '@/pages/blog/home/components/articleCard/props'
import type { ExtractPropTypes } from 'vue'
import type { StoreArticleModuleState } from '@/store/modules/article/index'

const PAGE_SIZE = 20

function useBlogHomeArticleCard() {
  function handleCateClick(cate: string, item: articleTypeDirectory) {
    console.log(cate, item)
  }
  function handleTagClick(tag: string, item: articleTypeDirectory) {
    console.log(tag, item)
  }
  function handleArticleClick(item: articleTypeDirectory) {
    console.log(item)
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

export default defineComponent({
  name: 'BlogHome',
  components: { Scroll, BlogHomeArticleCard },
  setup() {
    const store = useStore<StoreArticleModuleState>()
    store.dispatch('article/fetchAllContents')
    const page = ref(1)
    const directory = store.state.article.directory
    const pageDirectory = computed(() => {
      return directory.slice(0, PAGE_SIZE * page.value)
    })

    const useArticleCard = useBlogHomeArticleCard()
    return {
      store,
      useArticleCard,
      page,
      pageDirectory
    }
  }
})
</script>

<style lang="scss">
.raw-markdown-html {
  @import "@/assets/style/markdown/index.scss";
}
</style>
