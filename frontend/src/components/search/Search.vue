<template>
  <div class="search-wrapper">
    <div class="search-input-wrapper" ref="searchInputRef">
      <div class="search-input-container">
        <input type="text" placeholder="想要查找什么..." />
        <button type="button" class="close-btn" @click="close">x</button>
      </div>
    </div>
    <div class="ins-section-container">
      <section class="ins-section">
        <header class="ins-section-header">文章</header>
        <div class="ins-search-item" v-for="(item, index) in [1, 2, 3]" :key="index">
          <header><Icon type="file" class="mg-r-8"></Icon>这里是文章的标题</header>
          <p class="ins-search-preview">
            这是文章的简介这是文章的简介这是文章的简介这是文章的简介这是文章的简介这是文章的简介
          </p>
        </div>
      </section>
      <section class="ins-section">
        <header class="ins-section-header">标签</header>
        <div class="ins-search-item" v-for="(item, index) in [1, 2, 3]" :key="index">
          <header><Icon type="tag" class="mg-r-8"></Icon>标签{{ item }}</header>
        </div>
      </section>
      <section class="ins-section">
        <header class="ins-section-header">分类</header>
        <div class="ins-search-item" v-for="(item, index) in [1, 2, 3]" :key="index">
          <header><Icon type="Category" class="mg-r-8"></Icon>分类{{ item }}</header>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import searchProps from '@/components/search/props'
import Icon from '@/components/icon/Index.vue'

export default defineComponent({
  name: 'Search',
  props: searchProps,
  components: {
    Icon
  },
  setup(props, { emit }) {
    const close = () => {
      console.log(props.name)
      emit('close')
    }
    const searchInputRef = ref<HTMLElement>()
    const searchInputRefHeight = computed(() => {
      return searchInputRef.value?.offsetHeight || 0
    })
    return {
      close,
      searchInputRef,
      searchInputRefHeight
    }
  }
})
</script>

<style lang="scss" scoped>
.search-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  background: #fff;
}
.search-input-wrapper {
  position: relative;
}
.search-input-container {
  display: flex;
  input {
    display: block;
    width: 100%;
    border: none;
    outline: 0;
    font-size: 16px;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-weight: 200;
    border-radius: 0;
    background: #fff;
    line-height: 20px;
    padding: 12px 28px 12px 20px;
    border-bottom: 1px solid #e2e2e2;
    font-family: 'Microsoft Yahei Light', 'Microsoft Yahei', Helvetica, Arial, sans-serif;
  }
  .close-btn {
    text-transform: none;
    font-family: inherit;
    outline: 0;
    text-shadow: 0 1px 0 #fff;
    line-height: 1;
    float: right;
    top: 50%;
    right: 6px;
    width: 20px;
    height: 20px;
    font-size: 24px;
    margin-top: -15px;
    position: absolute;
    text-align: center;
    opacity: 1;
    color: #666;
    padding: 0;
    cursor: pointer;
    background: 0 0;
    border: 0;
    user-select: none;
    &:hover {
      color: #006bde;
    }
  }
}
.ins-section-container {
  font-size: 14px;
  line-height: 16px;
  overflow: auto;
  height: calc(100% - v-bind(searchInputRefHeight) * 1px);
}
.ins-section-header {
  color: #9a9a9a;
  border-bottom: 1px solid #e2e2e2;
  padding: 8px 15px;
  display: block;
}
.ins-search-item {
  cursor: pointer;
  padding: 8px 15px;
  header {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ins-search-preview {
    height: 15px;
    font-size: 12px;
    color: #9a9a9a;
    margin: 5px 0 0 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &:hover {
    color: #fff;
    background: #006bde;
    .ins-search-preview {
      color: #fff;
    }
  }
}
.mg-r-8 {
  margin-right: 8px;
}
</style>

