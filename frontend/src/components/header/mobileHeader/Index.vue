<template>
  <div class="header-wrapper">
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
    <div :class="navBarClasses">
      <div class="navbar-container" ref="navbarContainer">
        <div>item</div>
        <div>item</div>
        <div>item</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from 'vue'
import Icon from '@/components/icon/Index.vue'
import { useSearch } from '@/components/search/index'

function useMenuNavbar() {
  const isExpandMenu = ref(false)
  const navBarClasses = reactive({
    collapsing: true,
    'navbar-wrapper': true,
    'navbar-container-in': computed(() => !isExpandMenu.value),
    'navbar-container-out': computed(() => isExpandMenu.value)
  })

  const navbarContainer = ref<HTMLDivElement>()
  const navbarContainerHeight = ref('0px')
  const resizeObserver = new ResizeObserver(() => {
    navbarContainerHeight.value = navbarContainer.value ? getComputedStyle(navbarContainer.value).height : '0px'
  })
  onMounted(() => {
    resizeObserver.observe(navbarContainer.value as HTMLDivElement)
  })

  const menuClick = () => {
    isExpandMenu.value = !isExpandMenu.value
  }
  return {
    isExpandMenu,
    navbarContainer,
    navBarClasses,
    navbarContainerHeight,
    menuClick
  }
}

export default defineComponent({
  name: 'MobileHeader',
  components: {
    Icon
  },
  setup() {
    const { handleSearchClick } = useSearch()
    const menuNavBar = useMenuNavbar()
    return {
      handleSearchClick,
      ...menuNavBar
    }
  }
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
</style>
