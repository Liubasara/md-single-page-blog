<template>
  <Layout>
    <template v-slot:header>
      <Header v-bind="header.data"></Header>
    </template>
    <router-view></router-view>
    <template v-slot:asider>
      <button @click="header.changeName('ddd')">123</button>
      <div class="aside">Aside</div>
    </template>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import Layout from '@/components/layout/Index.vue'
import Header from '@/components/header/Index.vue'

function useHeader() {
  const data: {
    name?: string
  } = reactive({
    // name: 'Liubasara'
  })

  function changeName(_name: string) {
    if (data.name === 'ddd') {
      data.name = 'Liubasara'
      return
    }
    data.name = _name
  }

  return {
    data,
    changeName
  }
}

export default defineComponent({
  name: 'BlogPage',
  components: {
    Layout,
    Header
  },
  setup() {
    const headerInstance = useHeader()
    return {
      header: headerInstance
    }
  }
})
</script>

