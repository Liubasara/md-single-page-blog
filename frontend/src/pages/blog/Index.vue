<template>
  <Layout>
    <template v-slot:header>
      <Header v-bind="header.data"></Header>
    </template>
    <router-view></router-view>
    <template v-slot:asider>
      <Asider></Asider>
    </template>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Layout from '@/components/layout/Index.vue'
import Header from '@/components/header/Index.vue'
import Asider from '@/components/asider/Index.vue'
import type { HeaderProps } from '@/components/header/props'

function useHeader() {
  const data = reactive<HeaderProps>({
    name: 'Liubasara',
    introduction: 'Web Developer & Designer'
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
    const headerInstance = useHeader()
    return {
      header: headerInstance
    }
  }
})
</script>

