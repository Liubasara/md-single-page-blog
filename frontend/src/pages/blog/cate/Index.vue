<template>
  <div>
    <div class="nav-list">
      <div class="nav-item" @click="cate.navigateToCatesPage('')">All</div>
      <div
        v-for="(item, index) in cate.data.allCates"
        :key="index + 'nav-item'"
        :class="['nav-item', { active: cate.isCateActive(item) }]"
        @click="cate.navigateToCatesPage(item)"
      >{{ item }}</div>
    </div>
    <PanelCard
      v-for="(item) in cate.catePanelCards"
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
import PanelCard from '@/components/panel/card/Index.vue'
import PanelCardItem from '@/components/panel/cardItem/Index.vue'
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
  const catePanelCards = computed(() => {
    const routeCate = decodeURIComponent((route.query?.cate as string) || '')
    return routeCate ? [routeCate] : data.allCates
  })
  return reactive({
    data,
    catePanelCards,
    isCateActive: (cate: string) => isCateActive(cate, route),
    navigateToCatesPage: (cate: string) => navigateToCatesPage(cate, router),
    getArticleArray,
    getCatePanelItemProps
  })
}

export default defineComponent({
  name: 'blogCate',
  components: {
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
.nav-list {
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
}
.nav-item {
  margin-right: 15px;
  cursor: pointer;
  user-select: none;
  color: #2e2e33;
  &.active,
  &:hover {
    color: #0a6ebd;
  }
}
</style>
