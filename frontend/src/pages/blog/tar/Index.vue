<template>
  <div class="tar-container">
    <TitleWithCount :title="'归档'" :count="tarDirectory.nums"></TitleWithCount>
    <PanelCard
      v-for="(item, index) in tarDirectory.tarPosts"
      :key="index"
      v-bind="getPanelCardProp(item)"
      @update:expand="(val) => handlePanelExpandUpdate(val, item)"
    >
      <template v-slot:icon="{ expand }">
        <Icon :type="expand ? 'calendar-minus' : 'calendar-plus'"></Icon>
      </template>
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
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { getAllTimesByType, navigateToArticle } from '@/logic/article'
import PanelCard from '@/components/panel/card/Index.vue'
import panelCardProps from '@/components/panel/card/props'
import PanelCardItem from '@/components/panel/cardItem/Index.vue'
import TitleWithCount from '@/components/titleWithCount/Index.vue'
import PanelCardItemProps from '@/components/panel/cardItem/props'
import Icon from '@/components/icon/Index.vue'
import { formatTimeToStringByType, getFirstDateOfMonth } from '@/utils/date'
import { useRoute, useRouter } from 'vue-router'
import type { StoreArticleModuleState } from '@/store/modules/article/index'
import type { ExtractPropTypes } from 'vue'

export default defineComponent({
  name: 'blogTar',
  components: { PanelCard, PanelCardItem, Icon, TitleWithCount },
  setup() {
    const store = useStore<StoreArticleModuleState>()
    const router = useRouter()
    const route = useRoute()
    const tarType = ref<'year' | 'month' | 'day'>('year')
    const directory = store.state.article.directory
    type tarPostsObjWithExpandType = ReturnType<typeof getAllTimesByType>['tarPosts'] extends Array<infer V> ? Array<V & { expand?: boolean }> : void;
    const tarDirectory = ref<Overwrite<ReturnType<typeof getAllTimesByType>, { tarPosts: tarPostsObjWithExpandType }>>({
      timeSnaps: [],
      tarPosts: [],
      nums: 0
    })
    watch(route, newRoute => {
      const routeParamsTime = +newRoute.params.time
      tarType.value = routeParamsTime ? 'month' : 'year'
      if (routeParamsTime) {
        tarDirectory.value = getAllTimesByType(directory, { reverse: true, type: tarType.value, maxTime: routeParamsTime, minTime: getFirstDateOfMonth(routeParamsTime) })
      } else {
        tarDirectory.value = getAllTimesByType(directory, { reverse: true, type: tarType.value })
      }
    }, {
      immediate: true
    })
    type PanelItemType = typeof tarDirectory.value.tarPosts extends Array<infer V> ? V : undefined
    const getPanelCardProp = (item: PanelItemType): Partial<ExtractPropTypes<typeof panelCardProps>> => ({
      title: formatTimeToStringByType(+item.time, { type: tarType.value, useChineseMonth: !!+route.params.time }),
      expand: true,
      // 'onUpdate:expand': (val: boolean) => {
      //   item.expand = val
      // }
    })
    const handlePanelExpandUpdate = (val: boolean, item: PanelItemType) => {
      item.expand = val
    }
    const getPanelCardItemProp = (obj: articleType | articleTypeDirectory): ExtractPropTypes<typeof PanelCardItemProps> => ({
      time: formatTimeToStringByType(obj.time, { type: 'day' }),
      title: obj.title
    })
    const handlePanelCardItemClick = (item: articleType | articleTypeDirectory) => {
      navigateToArticle(item.name, router)
    }
    return {
      tarDirectory,
      getPanelCardProp,
      handlePanelCardItemClick,
      handlePanelExpandUpdate,
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
</style>