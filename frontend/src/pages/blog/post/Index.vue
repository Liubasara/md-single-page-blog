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
import { computed, defineComponent, ref, watch, reactive, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ArticleMeta from '@/components/articleMeta/Index.vue'
import { navigateToTagsPage } from '@/logic/tags'
import { navigateToCatesPage } from '@/logic/cates'
import type { Ref } from 'vue'
import type { articleGettersFuncType, StoreArticleModuleState } from '@/store/modules/article/index'
import type { RouteLocationNormalizedLoaded, Router } from 'vue-router'

function useArticleDeatil(route: RouteLocationNormalizedLoaded, directory: Array<articleTypeDirectory>, getArticleDetailFunc: articleGettersFuncType) {
  const articleObj = computed(() => {
    return directory.find(item => item.name === route.params.name)
  })
  let articleDetail = ref<articleType>()
  let isArticleLoaded = ref(false)
  watch(articleObj, async newVal => {
    if (newVal) {
      articleDetail.value = await getArticleDetailFunc(newVal)
      isArticleLoaded.value = true
    }
  }, {
    immediate: true
  })
  return {
    articleObj,
    articleDetail,
    isArticleLoaded
  }
}

function useAnchorScrollBehaviorInHashMode(route: RouteLocationNormalizedLoaded, isLoaded: Ref<boolean>, router: Router) {
  const scrollFix = (hashBang: string) => {
    nextTick(() => {
      const elm = document.getElementById(hashBang.slice(1))
      if (elm) {
        elm.scrollIntoView()
      }
    })
  }
  let isAddScrollBehaviorToEachAnchor = false
  const addScrollBehaviorToEachAnchor = () => {
    nextTick(() => {
      const elms = document.querySelectorAll('.anchor')
      const clickToHash = async (evt: Event) => {
        const evtTarget = evt.currentTarget
        if (evtTarget instanceof Element) {
          const targetId = evtTarget.id
          const newRouteHash = '#' + targetId
          await router.push({ hash: newRouteHash })
          nextTick(() => {
            scrollFix(newRouteHash)
          })
        }
      }
      elms.forEach(elm => {
        elm.addEventListener('click', clickToHash)
      })
      isAddScrollBehaviorToEachAnchor = true
    })
  }
  watch(isLoaded, newVal => {
    if (!newVal) return
    scrollFix(route.hash)
    !isAddScrollBehaviorToEachAnchor && addScrollBehaviorToEachAnchor()
  }, {
    immediate: true
  })
}

export default defineComponent({
  name: 'blogPost',
  components: { ArticleMeta },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore<StoreArticleModuleState>()
    const directory = store.state.article.directory
    const { articleDetail, articleObj, isArticleLoaded } = useArticleDeatil(route, directory, store.getters['article/getArticleDetailFunc'])
    useAnchorScrollBehaviorInHashMode(route, isArticleLoaded, router)
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

