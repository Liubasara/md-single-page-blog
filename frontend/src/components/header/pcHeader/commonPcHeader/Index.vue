<template>
  <div class="header-container">
    <div class="profile-container">
      <div class="avatar-link-container">
        <router-link class="avatar-link" :to="{ path: '/' }">
          <img src="@/assets/img/avatar.jpeg" alt="avatar" />
        </router-link>
      </div>
      <p class="name">{{ props.name }}</p>
      <p class="introduction">{{ props.introduction }}</p>
      <small class="location">
        <Icon type="location" as="span"></Icon>
        <span>GuangZhou, China</span>
      </small>
    </div>
    <div class="search-container">
      <div class="input-group" @mousedown="handleSearchClick($event)">
        <input type="text" placeholder="搜索" />
        <div class="search-btn"><Icon type="search"></Icon></div>
      </div>
    </div>
    <router-link class="link menu-item" :to="{ path: '/blog/home' }"
      ><Icon type="home"></Icon><span class="route-name">Home</span></router-link
    >
    <!-- <router-link class="link" :to="{ path: `/blog/post/${'test'}` }">Post</router-link> -->
    <router-link class="link menu-item" :to="{ path: '/blog/tags' }"
      ><Icon type="tag"></Icon><span class="route-name">Tags</span></router-link
    >
    <router-link class="link menu-item" :to="{ path: '/blog/cate' }"
      ><Icon type="Category"></Icon><span class="route-name">Cate</span></router-link
    >
  </div>
</template>

<script lang="ts">
import Icon from '@/components/icon/Index.vue'
import { defineComponent } from 'vue'
import headerProps from '@/components/header/props'

function useSearch() {
  function handleSearchClick(evt: Event) {
    evt.preventDefault()
    console.log('TODO: 调起搜索弹框')
  }
  return {
    handleSearchClick
  }
}

export default defineComponent({
  name: 'CommonPcHeader',
  components: { Icon },
  props: headerProps,
  setup(props) {
    const { handleSearchClick } = useSearch()
    return {
      props,
      handleSearchClick
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
  line-height: 1.1;
}
.profile-container {
  padding: 20px 15px 10px 15px;
  display: flex;
  flex-direction: column;
  vertical-align: center;
  justify-content: center;
  text-align: center;
}
.link {
  display: block;
  &.menu-item {
    padding: 10px 20px;
    line-height: 21px;
    color: #555;
    @include desktopSmallScreen {
      padding: 6px 20px;
    }
    .route-name {
      margin-left: 15px;
    }
    &:hover {
      background-color: #eee;
    }
  }
}
.avatar-link-container {
  display: flex;
  justify-content: center;
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
  font-weight: 500;
}
.introduction {
  font-size: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  @include desktopMediumScreen {
    font-size: 13px;
  }
  @include desktopSmallScreen {
    display: none;
  }
}
.location {
  color: #777;
  font-size: 85%;
}
.search-container {
  margin: 0 15px 15px 15px;
  .input-group {
    display: table;
    width: 100%;
    border-radius: 3px;
    border: 1px solid #eee;
    input {
      display: table-cell;
      width: 100%;
      height: 32px;
      padding: 6px 12px;
    }
    .search-btn {
      display: table-cell;
      padding: 6px 12px;
      width: 1%;
      cursor: pointer;
      text-align: center;
    }
  }
}
</style>

