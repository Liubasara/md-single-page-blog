<template>
  <div class="header-container">
    <div class="profile-container">
      <router-link class="avatar-link" :to="{ path: '/' }">
        <img src="@/assets/img/avatar.jpeg" alt="avatar"
      /></router-link>
    </div>
    <div class="search-container">
      <div class="input-group" @mousedown="handleSearchClick($event)">
        <input type="text" placeholder="搜索" />
        <div class="search-btn"><Icon type="search" :size="16"></Icon></div>
      </div>
    </div>
    <div :class="[{ 'transform-rotate': isExpandMenu }, 'menu-container']" @click="menuClick">
      <Icon type="baseline-menu-px" :size="24"></Icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Icon from '@/components/icon/Index.vue'
import { useSearch } from '@/components/search/index'

export default defineComponent({
  name: 'MobileHeader',
  components: {
    Icon
  },
  setup() {
    const isExpandMenu = ref(false)
    const menuClick = () => {
      isExpandMenu.value = !isExpandMenu.value
    }
    const { handleSearchClick } = useSearch()
    return {
      isExpandMenu,
      menuClick,
      handleSearchClick
    }
  }
})
</script>

<style lang="scss" scoped>
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
</style>
