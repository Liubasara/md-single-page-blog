<template>
  <div>
    <TitleWithCount title="标签">
      <template v-slot:count>共 {{ tag.data.allTags.length }} 个标签</template>
    </TitleWithCount>
    <NavList>
      <NavListItem @click="tag.navigateToTagsPage('')">All</NavListItem>
      <NavListItem
        v-for="(item, index) in tag.data.allTags"
        :key="index + 'nav-tag'"
        :isActive="tag.isTagActive(item)"
        @click="tag.navigateToTagsPage(item)"
      >{{ item }}</NavListItem>
    </NavList>
    <div class="flex-wrap-box">
      <TagCard
        v-for="(item, index) in tag.articleWithTags"
        :key="index + 'tag-card'"
        :title="item.title"
        :time="item.time"
        :tags="item.tags"
        :info="item.info || item.desc || ''"
        @time-click="tag.navigateToTarsDetailPage(item.time)"
        @title-click="tag.navigateToArticle(item.name)"
        @tag-click="(val) => tag.navigateToTagsPage(val, true)"
      ></TagCard>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { getAllTags, getPostsByTagsMaps, navigateToArticle } from '@/logic/article'
import { navigateToTagsPage, isTagActive } from '@/logic/tags'
import { navigateToTarsDetailPage } from '@/logic/tars'
import NavList from '@/components/nav/list/Index.vue'
import NavListItem from '@/components/nav/item/Index.vue'
import TitleWithCount from '@/components/titleWithCount/Index.vue'
import TagCard from '@/pages/blog/tags/components/tagCard/Index.vue'
import type { StoreArticleModuleState } from '@/store/modules/article/index'
import { useRoute, useRouter } from 'vue-router'

function useTagsInSetup() {
  const store = useStore<StoreArticleModuleState>()
  const router = useRouter()
  const route = useRoute()
  const { allTags, tagsMap } = getAllTags(store.state.article.directory)
  const articleWithTags = computed(() => {
    const routeTags = decodeURIComponent((route.query?.tags as string) || '')
    const routeTagsArr =
      routeTags !== '' && routeTags.split(',').length > 0
        ? routeTags.split(',')
        : []
    return routeTagsArr.length === 0 ? store.state.article.directory : getPostsByTagsMaps(tagsMap, routeTagsArr)
  })
  const data = reactive({
    allTags,
    tagsMap
  })
  return reactive({
    data,
    articleWithTags,
    navigateToTagsPage: (tag: string, cover: boolean = false) => navigateToTagsPage(tag, router, route, { cover }),
    isTagActive: (tag: string) => isTagActive(tag, route),
    navigateToTarsDetailPage: (time: string) => navigateToTarsDetailPage(+new Date(time) + '', router),
    navigateToArticle: (name: string) => navigateToArticle(name, router)
  })
}

export default defineComponent({
  name: 'blogTags',
  components: {
    TitleWithCount,
    NavList,
    NavListItem,
    TagCard
  },
  setup() {
    const tagInstance = useTagsInSetup()
    return {
      tag: tagInstance
    }
  }
})
</script>

<style lang="scss" scoped>
.flex-wrap-box {
  display: flex;
  flex-wrap: wrap;
}
</style>
