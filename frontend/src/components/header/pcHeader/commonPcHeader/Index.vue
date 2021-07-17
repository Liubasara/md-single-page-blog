<template>
  <div class="header-container">
    <router-link class="link" :to="{ path: '/blog/home' }">Home</router-link>
    <router-link class="link" :to="{ path: `/blog/post/${'test'}` }">Post</router-link>
    <router-link class="link" :to="{ path: '/blog/tags' }">Tags</router-link>
    <router-link class="link" :to="{ path: '/blog/cate' }">Cate</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CommonPcHeader',
  setup() {
    
  },
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

