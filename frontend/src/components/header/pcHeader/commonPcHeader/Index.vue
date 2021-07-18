<template>
  <div class="header-container">
    <router-link class="link" :to="{ path: '/blog/home' }"><Icon type="home"></Icon>Home</router-link>
    <router-link class="link" :to="{ path: `/blog/post/${'test'}` }">Post</router-link>
    <router-link class="link" :to="{ path: '/blog/tags' }"><Icon type="tag"></Icon>Tags</router-link>
    <router-link class="link" :to="{ path: '/blog/cate' }"><Icon type="Category"></Icon>Cate</router-link>
  </div>
</template>

<script lang="ts">
import Icon from '@/components/icon/Index.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CommonPcHeader',
  components: { Icon },
  setup() {}
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/screenMixins.scss';

.header-container {
  height: 100%;
  background-color: #fbfbfb;
  border-right: 1px solid #f6f6f6;
  .link {
    display: block;
  }
}
</style>

