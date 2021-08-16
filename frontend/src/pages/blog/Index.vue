<template>
  <Layout>
    <template v-slot:header>
      <Header v-bind="header.data"></Header>
    </template>
    <router-view></router-view>
    <template v-slot:asider>
      <Asider v-bind="asider.data"></Asider>
    </template>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import Layout from '@/components/layout/Index.vue'
import Header from '@/components/header/Index.vue'
import HeaderProps from '@/components/header/props'
import Asider from '@/components/asider/Index.vue'
import AsiderProps from '@/components/asider/props'
import { navigateToTagsPage, isTagActive } from '@/logic/tags'
import { navigateToCatesPage, isCateActive } from '@/logic/cates'
import type { ExtractPropTypes } from 'vue'
import type { StoreArticleModuleState } from '@/store/modules/article'

function useHeaderInSetup() {
  const data = reactive<ExtractPropTypes<typeof HeaderProps>>({
    name: 'Liubasara',
    introduction: 'Web Developer & Designer',
    location: 'GuangZhou, China'
  })
  return {
    data
  }
}

function useAsiderInSetup() {
  const store = useStore<StoreArticleModuleState>()
  const router = useRouter()
  const route = useRoute()
  const tagClick = (tag: string) => {
    navigateToTagsPage(tag, router, route)
  }
  const cateClick = (cate: string) => {
    navigateToCatesPage(cate, router)
  }
  const _isTagActive = (tag: string): boolean => {
    return isTagActive(tag, route)
  }
  const _isCateActive = (cate: string): boolean => {
    return isCateActive(cate, route)
  }
  const data = reactive<ExtractPropTypes<typeof AsiderProps>>({
    tags: store.state.article.tags,
    cates: store.state.article.cates,
    tagClick,
    cateClick,
    isTagActive: _isTagActive,
    isCateActive: _isCateActive
  })
  return {
    data
  }
}

export default defineComponent({
  name: 'BlogPage',
  components: {
    Layout,
    Header,
    Asider
  },
  setup() {
    const headerInstance = useHeaderInSetup()
    const asiderInstance = useAsiderInSetup()
    return {
      header: headerInstance,
      asider: asiderInstance
    }
  }
})
</script>

