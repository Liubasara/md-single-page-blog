<template>
  <article class="article-container">
    <div class="article-header">
      <h1 class="article-name">
        <a @click.prevent.stop="nameClick">{{ name }}</a>
      </h1>
    </div>
    <p class="article-meta">
      <span class="article-date">
        <Icon type="rili"></Icon>
        <a @click.prevent.stop="dateClick">{{ date }}</a>
      </span>
      <span class="article-tag">
        <Icon type="tag"></Icon>
        <template v-for="(tag, index) in tags" :key="index">
          <a @click.prevent.stop="tagClick(tag)">{{ tag }}</a>
        </template>
      </span>
      <span class="article-category">
        <Icon type="Category"></Icon>
        <a @click.prevent.stop="cateClick(cate)">{{ cate }}</a>
      </span>
    </p>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Icon from '@/components/icon/Index.vue'
import articleCardProps from '@/pages/blog/home/components/articleCard/props'

export default defineComponent({
  name: 'BlogHomeArticleCard',
  components: {
    Icon
  },
  props: articleCardProps,
  emits: {
    nameClick: null,
    dateClick: null,
    tagClick: null,
    cateClick: null
  },
  setup(props, { emit }) {
    const {
      name,
      date,
      tags,
      cate
    } = props
    const nameClick = () => {
      emit('nameClick')
    }
    const dateClick = () => {
      emit('dateClick')
    }
    const tagClick = (tag: string) => {
      emit('tagClick', tag)
    }
    const cateClick = (cate: string) => {
      emit('cateClick', cate)
    }
    return {
      name,
      date,
      tags,
      cate,
      nameClick,
      dateClick,
      tagClick,
      cateClick
    }
  }
})
</script>


<style lang="scss" scoped>
$hoverColor: #0a6ebd;
@mixin hoverLink {
  cursor: pointer;
  &:hover {
    color: $hoverColor;
  }
}
.article-container {
  border-bottom: 1px solid #f2f2f2;
}
.article-header {
  margin-bottom: 20px;
}
.article-name {
  font-size: 18px;
  margin: 21px 0 10.5px;
  @include hoverLink;
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