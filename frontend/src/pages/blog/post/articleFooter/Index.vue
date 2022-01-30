<template>
  <div :class="[inBottom ? 'static' : 'fixed', 'footer-wrap']">
    <a v-if="hasPrev" class="before page-item mg-r-10" @click.prevent="$emit('prev')">
      <i class="iconfont icon-angle-left"></i> 上一篇
    </a>
    <a v-if="hasNext" class="next page-item" @click.prevent="$emit('next')">
      下一篇
      <i class="iconfont icon-angleright"></i>
    </a>
    <div class="content-area"></div>
    <div class="right-area">
      <i
        :class="['iconfont', currentSortItem.icon, 'sort-btn']"
        @click.stop="toggleFooterMenu"
        v-click-outside="() => showFooterMenu = false"
      >
        <div v-if="showFooterMenu" class="footer-menu">
          <div
            class="sort-item"
            v-for="(item, idx) in footerMenus"
            :key="item.key"
            @click="clickSortItem(item.key)"
          >
            <i :class="['iconfont', item.icon]"></i>
            {{ item.text }}
          </div>
        </div>
      </i>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'
import type { SetupContext, Ref } from 'vue'
import throttle from 'lodash/throttle'
import clickOutside from 'click-outside-vue3'
import articleFooterProps from './props'

type Menutype<T> = {
  key: T,
  icon: string,
  text: string
}

function useCheckScrollBottom<T extends HTMLElement>(allowance: number = 150, el: T = document.documentElement as T) {
  const inBottom = ref(false)
  const scrollListener = throttle(function () {
    if (
      inBottom.value ?
        parseInt(`${el.scrollHeight - el.scrollTop}`) > el.clientHeight + allowance
        :
        parseInt(`${el.scrollHeight - el.scrollTop}`) > el.clientHeight
    ) {
      // 页面未滑动到底部
      inBottom.value = false
    } else {
      // 页面差一点(allowance)滑动到底部
      inBottom.value = true
    }
  }, 150)
  onMounted(() => {
    document.addEventListener('scroll', scrollListener)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('scroll', scrollListener)
  })
  return {
    inBottom
  }
}

function useFooterMenu(props: setupPropsType<typeof articleFooterProps>, context: SetupContext<any>) {
  const { emit } = context
  const showFooterMenu = ref(false)
  const { sortType } = toRefs(props)
  type sortTypeKeys = typeof sortType extends Ref<infer V> ? V : void

  const footerMenus = ref<{
    [K in sortTypeKeys]: Menutype<K>
  }>({
    time: { key: 'time', icon: 'icon-rili', text: '按时间排序' },
    cate: { key: 'cate', icon: 'icon-Category', text: '按类型排序' }
  })
  const currentSortItem = ref<Menutype<sortTypeKeys>>(footerMenus.value[sortType.value])
  watch(sortType, (val) => {
    currentSortItem.value = footerMenus.value[val]
  })
  function clickSortItem(type: keyof typeof footerMenus.value) {
    emit('update:sortType', type)
  }
  function toggleFooterMenu() {
    showFooterMenu.value = !showFooterMenu.value
  }
  return { clickSortItem, toggleFooterMenu, currentSortItem, showFooterMenu, footerMenus }
}

export default defineComponent({
  name: 'ArticleFooter',
  props: articleFooterProps,
  emits: ['prev', 'next', 'update:sortType'],
  directives: {
    clickOutside: clickOutside.directive
  },
  setup(props, context) {
    const { inBottom } = useCheckScrollBottom(60)
    const footerMenu = useFooterMenu(props, context)
    return {
      inBottom,
      ...footerMenu
    }
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/style/screenMixins.scss";
$footer-menu-height: 150px;
.footer-menu {
  position: absolute;
  right: 0;
  top: 0;
  transform: translateY(calc(-100% - 17px));
  max-height: $footer-menu-height;
  width: 150px;
  background: #fff;
  border: 1px solid #eee;
  cursor: auto;
  font-size: 12px;
  overflow: auto;
}
.sort-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  cursor: pointer;
  i {
    font-size: 12px;
    margin-right: 10px;
  }
  &:hover {
    background: #eee;
  }
}
.content-area {
  flex: 1;
  min-width: 0px;
}
.right-area {
  width: fit-content;
}
.sort-btn {
  font-size: 20px;
  cursor: pointer;
  position: relative;
}
.mg-r-10 {
  margin-right: 10px;
}
.page-item {
  font-size: 14px;
  color: #666;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: #0a6ebd;
  }
}
.footer-wrap {
  box-sizing: border-box;
  height: 52px;
  display: flex;
  align-items: center;
  border-top: 1px solid #f6f6f6;
  background: #fff;
  &.fixed {
    padding: 0 15px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    @include desktopLargeScreen {
      left: 16.66667%;
      right: 21%;
    }
    @include desktopMediumScreen {
      left: 16.66667%;
      right: 23%;
    }
    @include desktopSmallScreen {
      left: 16.66667%;
      right: 25%;
    }
    @include desktopTinyScreen {
      left: 4.16667%;
      right: 25%;
    }
    @include mobileScreen {
    }
  }
  &.static {
    position: static;
  }
}
// .position-fixed {
//   position: fixed;
//   bottom: 0;
// }
</style>