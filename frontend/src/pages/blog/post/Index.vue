<template>
  <div>
    <h1 class="custom-title">{{ articleObj?.title }}</h1>
    <ArticleMeta
      :time="articleObj?.time"
      :tags="articleObj?.tags"
      :categories="articleObj?.categories"
      v-on="onMetaClick"
    ></ArticleMeta>
    <div class="content">
      <article v-html="articleDetail?.body" class="main-content"></article>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ArticleMeta from '@/components/articleMeta/Index.vue'
import { navigateToTagsPage } from '@/logic/tags'
import { navigateToCatesPage } from '@/logic/cates'
import type { articleGettersFuncType, StoreArticleModuleState } from '@/store/modules/article/index'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

function useArticleDeatil(route: RouteLocationNormalizedLoaded, directory: Array<articleTypeDirectory>, getArticleDetailFunc: articleGettersFuncType) {
  const articleObj = computed(() => {
    return directory.find(item => item.name === route.params.name)
  })
  let articleDetail = ref<articleType>()
  watch(articleObj, async newVal => {
    if (newVal) {
      articleDetail.value = await getArticleDetailFunc(newVal)
    }
  }, {
    immediate: true
  })
  return {
    articleObj,
    articleDetail
  }
}

export default defineComponent({
  name: 'blogPost',
  components: { ArticleMeta },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore<StoreArticleModuleState>()
    const directory = store.state.article.directory
    const { articleDetail, articleObj } = useArticleDeatil(route, directory, store.getters['article/getArticleDetailFunc'])
    const onMetaClick = reactive({
      onTimeClick: (time: string) => console.log(time),
      onTagClick: (tag: string) => navigateToTagsPage(tag, router, route),
      onCateClick: (cate: string) => navigateToCatesPage(cate, router)
    })
    return {
      route,
      store,
      articleDetail,
      articleObj,
      onMetaClick
    }
  }
})
</script>


<style lang="scss" scoped>
.custom-title {
  line-height: 1.4;
  font-weight: 500;
  margin-bottom: 0.37em;
  font-size: 26px;
}
</style>

<style lang="scss">
// v-html 中的 dom 节点无法使用 scoped, 因此有关 markdown 的样式需要使用 BEM 方式进行定义
// https://vue3js.cn/docs/zh/api/directives.html#v-html
.content article {
  @import "@/assets/style/markdown/index.scss";
  h1:nth-child(1) {
    display: none;
  }
}
</style>

