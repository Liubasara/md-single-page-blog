<template>
  <Layout>
    <template v-slot:header>
      <Header></Header>
    </template>
    <router-view></router-view>
    <template v-slot:asider>
      <div class="aside">Aside</div>
    </template>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '@/components/layout/Index.vue'
import Header from '@/components/header/Index.vue'

export default defineComponent({
  name: 'BlogPage',
  components: {
    Layout,
    Header
  },
  setup() {}
})
</script>

