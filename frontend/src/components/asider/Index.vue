<template>
  <div class="asider-container">
    <div class="clearfix-bfc">
      <h3 class="title">标签</h3>
      <ul class="tag-list">
        <li class="tag-list-item" v-for="(item, index) in allTags" :key="index">
          <a
            :class="['tag-list-link', { active: isTagActive(item) }]"
            @click.prevent.stop="tagClick(item, tagsMap[item])"
            >{{ item }}</a
          >

          
          <span class="tag-list-count">{{ tagsMap[item].num }}</span>
        </li>
      </ul>
    </div>

    <div class="clearfix-bfc">
      <h3 class="title">分类</h3>
      <ul class="cate-list">
        <li class="cate-list-item" v-for="(item, index) in allCates" :key="index">
          <a
            :class="['cate-list-link', { active: isCateActive(item) }]"
            @click.prevent.stop="cateClick(item, catesMap[item])"
            >{{ item }}</a
          >
          <span class="cate-list-count">{{ catesMap[item].num }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { navigateToTagsPage, isTagActive } from '@/logic/tags'
import { navigateToCatesPage, isCateActive } from '@/logic/cates'

export default defineComponent({
  name: 'Asider',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const { allTags, tagsMap } = store.state.article.tags
    const { allCates, catesMap } = store.state.article.cates

    const tagClick = (tag: string) => {
      navigateToTagsPage(tag, router, route)
    }
    const cateClick = (cate: string) => {
      navigateToCatesPage(cate, router)
    }
    return {
      allTags,
      tagsMap,
      allCates,
      catesMap,
      tagClick,
      isTagActive: (tag: string): boolean => isTagActive(tag, route),
      cateClick,
      isCateActive: (cate: string): boolean => isCateActive(cate, route)
    }
  }
})
</script>

<style lang="scss" scoped>
.asider-container {
  height: 100%;
  padding: 20px 30px;
}
.clearfix-bfc {
  &::before {
    content: '';
    display: table;
  }
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}
.title {
  font-size: 18px;
  color: #000;
  margin-top: 21px;
  margin-bottom: 10.5px;
  font-weight: 500;
}
.tag-list,
.cate-list {
  margin-bottom: 10.5px;
  line-height: 1.75;
  font-size: 14px;
}
.tag-list-item,
.cate-list-item {
  user-select: none;
  &::before {
    box-sizing: border-box;
    color: #ccc;
    content: '▪';
    font-size: 12px;
    margin-right: 6px;
    -webkit-transition: 0.2s ease;
    transition: 0.2s ease;
  }
}
.tag-list-link,
.cate-list-link {
  color: #333;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #2196f3;
  }
  &.active {
    color: #0073ce;
  }
}
.tag-list-count,
.cate-list-count {
  padding-left: 5px;
  color: #999;
  font-size: 0.85em;
  &::before {
    content: '(';
  }
  &::after {
    content: ')';
  }
}
</style>
