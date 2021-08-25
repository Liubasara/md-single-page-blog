<template>
  <div class="tar-container">
    <h1 class="title">归档</h1>
    <p class="text-muted">共 {{ directory.length }} 篇文章</p>
    <PanelCard
      v-for="(item, index) in tarDirectoryByYear.tarPosts"
      :key="index"
      :title="getPanelCardProp(item).title"
    >
      <PanelCardItem
        v-for="(obj, index) in item.objs"
        :key="index"
        v-bind="getPanelCardItemProp(obj)"
        @click="handlePanelCardItemClick(obj)"
      ></PanelCardItem>
    </PanelCard>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { getAllTimesByType, navigateToArticle } from '@/logic/article'
import PanelCard from '@/pages/blog/tar/components/panelCard/Index.vue'
import panelCardProps from '@/pages/blog/tar/components/panelCard/props'
import PanelCardItem from '@/pages/blog/tar/components/panelCardItem/Index.vue'
import PanelCardItemProps from '@/pages/blog/tar/components/panelCardItem/props'
import { formatTimeToStringByType } from '@/utils/date'
import type { StoreArticleModuleState } from '@/store/modules/article/index'
import type { ExtractPropTypes } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'blogTar',
  components: { PanelCard, PanelCardItem },
  setup() {
    const store = useStore<StoreArticleModuleState>()
    const router = useRouter()
    const directory = store.state.article.directory
    const tarDirectoryByYear = getAllTimesByType(directory, { reverse: true, type: 'year' })
    type PanelItemType = typeof tarDirectoryByYear.tarPosts extends Array<infer V> ? V : undefined
    const getPanelCardProp = (item: PanelItemType): ExtractPropTypes<typeof panelCardProps> => ({
      title: formatTimeToStringByType(+item.time, { type: 'year' })
    })
    const getPanelCardItemProp = (obj: articleType | articleTypeDirectory): ExtractPropTypes<typeof PanelCardItemProps> => ({
      time: formatTimeToStringByType(obj.time, { type: 'day' }),
      title: obj.title
    })
    const handlePanelCardItemClick = (item: articleType | articleTypeDirectory) => {
      navigateToArticle(item.name, router)
    }
    return {
      directory,
      tarDirectoryByYear,
      getPanelCardProp,
      handlePanelCardItemClick,
      getPanelCardItemProp
    }
  }
})
</script>

<style lang="scss" scoped>
.tar-container {
  font-size: 14px;
  padding: 0 15px;
}
.title {
  margin-top: 21px;
  margin-bottom: 10.5px;
  font-weight: 500;
  line-height: 1.1;
  font-size: 30px;
}
.text-muted {
  color: #777;
  margin: 0 0 10.5px;
}
</style>