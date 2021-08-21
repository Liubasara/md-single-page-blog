<template>
  <div>tar</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { getAllTimesByType } from '@/logic/article'
import type { StoreArticleModuleState } from '@/store/modules/article/index'

export default defineComponent({
  name: 'blogTar',
  setup() {
    const store = useStore<StoreArticleModuleState>()
    const directory = store.state.article.directory
    console.log(getAllTimesByType(directory, { reverse: true }))
  }
})
</script>

<style lang="scss" scoped>
</style>