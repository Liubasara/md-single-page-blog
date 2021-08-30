<template>
  <p class="article-meta">
    <span class="article-date" v-if="time">
      <Icon type="rili"></Icon>
      <a @click.prevent.stop="onTimeClick(time)">{{ time }}</a>
    </span>
    <span class="article-tag" v-if="tags && tags.length > 0">
      <Icon type="tag"></Icon>
      <template v-for="(tag, index) in tags" :key="index">
        <a @click.prevent.stop="onTagClick(tag)">{{ tag }}</a>
      </template>
    </span>
    <span class="article-category" v-if="categories">
      <Icon type="Category"></Icon>
      <a @click.prevent.stop="onCateClick(categories)">{{ categories }}</a>
    </span>
  </p>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import Icon from '@/components/icon/Index.vue'
import ArticleMetaProps from '@/components/articleMeta/props'

export default defineComponent({
  name: 'ArticleMeta',
  props: ArticleMetaProps,
  components: {
    Icon
  },
  emits: [
    'on-time-click',
    'on-tag-click',
    'on-cate-click',
  ],
  setup(props, { emit }) {
    const { tags, categories, time } = toRefs(props)
    const onTimeClick = (data: string) => {
      emit('on-time-click', data)
    }
    const onTagClick = (data: string) => {
      emit('on-tag-click', data)
    }
    const onCateClick = (data: string) => {
      emit('on-cate-click', data)
    }
    return {
      tags,
      categories,
      time,
      onTimeClick,
      onTagClick,
      onCateClick
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/commonVar.scss';
@mixin hoverLink {
  cursor: pointer;
  &:hover {
    color: $hoverColor;
  }
}
.article-date,
.article-category {
  @include hoverLink;
}
.article-tag {
  a {
    @include hoverLink;
    &:not(:last-child)::after {
      content: ", ";
    }
  }
}
.article-meta {
  font-size: 13px;
  line-height: 1.5;
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
