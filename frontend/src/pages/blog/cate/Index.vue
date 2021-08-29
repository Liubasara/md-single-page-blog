<template>
  <div>
    <TitleWithCount :title="cate.curTitle" :count="cate.getArticleArray(cate.curCates[0]).length">
      <template v-if="cate.curCates.length !== 1" v-slot:count>共 {{ cate.curCates.length }} 个分类</template>
    </TitleWithCount>
    <NavList>
      <NavListItem @click="cate.navigateToCatesPage('')">All</NavListItem>
      <NavListItem
        v-for="(item, index) in cate.data.allCates"
        :key="index + 'nav-item'"
        :isActive="cate.isCateActive(item)"
        @click="cate.navigateToCatesPage(item)"
      >{{ item }}</NavListItem>
    </NavList>
    <PanelCard
      v-for="(item) in cate.curCates"
      :key="item + 'cate-panel-card'"
      :title="item"
      :showMuted="true"
      :mutedText="`（${cate.getArticleArray(item).length} 篇）`"
    >
      <PanelCardItem
        v-for="(article, index) in cate.getArticleArray(item)"
        :key="index + 'cate-panel-item'"
        v-bind="cate.getCatePanelItemProps(article)"
      ></PanelCardItem>
    </PanelCard>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { getAllCates, navigateToArticle } from '@/logic/article'
import { isCateActive, navigateToCatesPage } from '@/logic/cates'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import TitleWithCount from '@/components/titleWithCount/Index.vue'
import PanelCard from '@/components/panel/card/Index.vue'
import PanelCardItem from '@/components/panel/cardItem/Index.vue'
import NavList from '@/components/nav/list/Index.vue'
import NavListItem from '@/components/nav/item/Index.vue'
import { formatTimeToStringByType } from '@/utils/date'
import type { Store } from 'vuex'
import type { StoreArticleModuleState } from '@/store/modules/article/index'

function useCate(store: Store<StoreArticleModuleState>) {
  const { allCates, catesMap } = getAllCates(store.state.article.directory)
  const route = useRoute()
  const router = useRouter()
  const data = reactive({
    allCates,
    catesMap
  })
  const getArticleArray = (item: string) => {
    return catesMap[item]?.articles || []
  }
  const getCatePanelItemProps = (article: allArticleType) => {
    return {
      title: article.title,
      time: formatTimeToStringByType(article.time, { type: 'day' }),
      onClick: () => navigateToArticle(article.name, router)
    }
  }
  const curCates = computed(() => {
    const routeCate = decodeURIComponent((route.query?.cate as string) || '')
    return routeCate ? [routeCate] : data.allCates
  })
  const curTitle = computed(() => curCates.value.length === 1 ? `分类: ${curCates.value[0]}` : '分类')
  return reactive({
    data,
    curCates,
    curTitle,
    isCateActive: (cate: string) => isCateActive(cate, route),
    navigateToCatesPage: (cate: string) => navigateToCatesPage(cate, router),
    getArticleArray,
    getCatePanelItemProps
  })
}

export default defineComponent({
  name: 'blogCate',
  components: {
    TitleWithCount,
    NavList,
    NavListItem,
    PanelCard,
    PanelCardItem
  },
  setup() {
    const store = useStore()
    const cateInstance = useCate(store)
    return {
      cate: cateInstance
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
