<template>
  <article class="article-container">
    <div class="article-header">
      <h1 class="article-name">
        <a>那些有趣的注释，有没有你曾用过的</a>
      </h1>
    </div>
    <p class="article-meta">
      <span class="article-date">
        <Icon type="rili"></Icon>
        <a>3月 28</a>
      </span>
      <span class="article-category">
        <Icon type="tag"></Icon>
        <a>开发</a>
      </span>
      <span class="article-tag">
        <Icon type="Category"></Icon>
        <a>程序员</a>
      </span>
    </p>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '@/components/icon/Index.vue'

export default defineComponent({
  name: 'BlogHomeArticleCard',
  components: {
    Icon
  },
  setup() {}
})
</script>


<style lang="scss" scoped>
.article-container {
  border-bottom: 1px solid #f2f2f2;
}
.article-header {
  margin-bottom: 20px;
}
.article-name {
  font-size: 18px;
  margin: 21px 0 10.5px;
}
.article-meta {
  font-size: 13px;
  color: #999;
  margin: 0 0 10.5px;
  span + span {
    margin-left: 10px;
  }
  a {
    margin-left: 3px;
  }
}
</style>