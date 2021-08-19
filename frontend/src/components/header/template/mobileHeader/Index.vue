<template>
  <div class="header-wrapper">
    <div class="header-container">
      <div class="profile-container">
        <router-link class="avatar-link" :to="{ path: '/' }">
          <img src="@/assets/img/avatar.jpeg" alt="avatar" />
        </router-link>
      </div>
      <div class="search-container">
        <div class="input-group" @mousedown="handleSearchClick($event)">
          <input type="text" placeholder="搜索" />
          <div class="search-btn">
            <Icon type="search" :size="16"></Icon>
          </div>
        </div>
      </div>
      <div :class="[{ 'transform-rotate': isExpandMenu }, 'menu-container']" @click="menuClick">
        <Icon type="baseline-menu-px" :size="24"></Icon>
      </div>
    </div>
    <div :class="navBarClasses">
      <div class="navbar-container" ref="navbarContainer">
        <a
          v-for="(item, index) in headerRoutesRef"
          :key="index"
          class="menu-item"
          @click.prevent.stop="routerPush(item.routerParams.path)"
        >
          <Icon :type="item.iconType"></Icon>
          <span class="route-name">{{ item.name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/icon/Index.vue'
import headerProps from '@/components/header/props'
import { useMobileHeaderInSetup } from '@/components/header/logic/index'

export default defineComponent({
  name: 'MobileHeader',
  components: {
    Icon
  },
  props: headerProps,
  setup: useMobileHeaderInSetup
})
</script>

<style lang="scss" scoped>
.header-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.header-container {
  display: flex;
  height: 100%;
  align-items: center;
  background-color: #fbfbfb;
}
.profile-container {
  margin: 10px 0;
  width: 8.33333%;
}
.avatar-link {
  display: block;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.search-container {
  padding: 10px 0;
  flex: 1 1 0;
  display: flex;
  align-items: center;
}
.input-group {
  width: 100%;
  height: 100%;
  display: table;
  input {
    width: 100%;
    height: 100%;
    display: table-cell;
    background: transparent;
  }
  .search-btn {
    display: table-cell;
    width: 24px;
    height: 24px;
    cursor: pointer;
    text-align: center;
    i {
      color: #2196f3;
    }
  }
}
.menu-container {
  margin: 10px;
  display: flex;
  align-items: center;
  color: #2196f3;
  transition: 0.5s ease;
  cursor: pointer;
  &.transform-rotate {
    transform: rotate(90deg);
  }
}
.navbar-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #fbfbfb;
  border-bottom: 1px solid #f6f6f6;
}
.navbar-wrapper-container {
  width: 100%;
}
.navbar-container-out {
  height: v-bind(navbarContainerHeight);
}
.navbar-container-in {
  height: 0px;
}
.collapsing {
  overflow: hidden;
  -webkit-transition-property: height, visibility;
  transition-property: height, visibility;
  -webkit-transition-duration: 0.35s;
  transition-duration: 0.35s;
  -webkit-transition-timing-function: ease;
  transition-timing-function: ease;
}
.menu-item {
  display: block;
  padding: 10px 20px;
  line-height: 21px;
  color: #555;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
}
.route-name {
  margin-left: 15px;
}
</style>
