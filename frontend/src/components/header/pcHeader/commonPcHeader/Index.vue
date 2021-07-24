<template>
  <div class="header-container">
    <div class="profile-container">
      <router-link class="avatar-link" :to="{ path: '/' }">
        <img src="@/assets/img/avatar.jpeg" alt="avatar">
      </router-link>
      <p class="name">{{ props.name }}</p>
      <p>{{ props.introduction }}</p>
      <p>
        <Icon type="location" as="span"></Icon>
        <span>GuangZhou, China</span>
      </p>
    </div>
    <router-link class="link" :to="{ path: '/blog/home' }"><Icon type="home"></Icon>Home</router-link>
    <!-- <router-link class="link" :to="{ path: `/blog/post/${'test'}` }">Post</router-link> -->
    <router-link class="link" :to="{ path: '/blog/tags' }"><Icon type="tag"></Icon>Tags</router-link>
    <router-link class="link" :to="{ path: '/blog/cate' }"><Icon type="Category"></Icon>Cate</router-link>
  </div>
</template>

<script lang="ts">
import Icon from '@/components/icon/Index.vue'
import { defineComponent } from 'vue'
import headerProps from '@/components/header/props'

export default defineComponent({
  name: 'CommonPcHeader',
  components: { Icon },
  props: headerProps,
  setup(props) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/screenMixins.scss';

.header-container {
  height: 100%;
  background-color: #fbfbfb;
  border-right: 1px solid #f6f6f6;
}
.profile-container {
  padding: 20px 15px 10px 15px;
  display: flex;
  flex-direction: column;
  vertical-align: center;
  justify-content: center;
}
.link {
  display: block;
}
.avatar-link {
  display: block;
  width: 64px;
  height: 64px;
  img {
    padding: 5px;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.name {
  margin-top: 10px;
  font-size: 18px;
}
</style>

