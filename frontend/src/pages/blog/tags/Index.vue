<template>
  <div>
    <NavList>
      <NavListItem>All</NavListItem>
    </NavList>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { getAllTags } from '@/logic/article'
import NavList from '@/components/nav/list/Index.vue'
import NavListItem from '@/components/nav/item/Index.vue'
import TitleWithCount from '@/components/titleWithCount/Index.vue'
import type { Store } from 'vuex'
import type { StoreArticleModuleState } from '@/store/modules/article/index'

function useTags(store: Store<StoreArticleModuleState>) {
  const { allTags, tagsMap } = getAllTags(store.state.article.directory)
  const data = reactive({
    allTags,
    tagsMap
  })
  return {
    data
  }
}

export default defineComponent({
  name: 'blogTags',
  components: {
    TitleWithCount,
    NavList,
    NavListItem
  },
  setup() {
    const store = useStore()
    const tagInstancee = useTags(store)

    return {
      tag: tagInstancee.data
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
