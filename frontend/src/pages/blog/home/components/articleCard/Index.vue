<template>
  <article class="article-container">
    <div class="article-header">
      <h1 class="article-name">
        <a @click.prevent.stop="nameClick">{{ name }}</a>
      </h1>
    </div>
    <p class="article-info" v-if="info">
      {{ info }}
    </p>
    <ArticleMeta
      :categories="cate"
      :tags="tags"
      :time="date"
      v-on="onMetaClick"
    ></ArticleMeta>
  </article>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import ArticleMeta from '@/components/articleMeta/Index.vue'
import articleCardProps from '@/pages/blog/home/components/articleCard/props'

export default defineComponent({
  name: 'BlogHomeArticleCard',
  components: {
    ArticleMeta
  },
  props: articleCardProps,
  emits: {
    nameClick: null,
    timeClick: (val: string) => true,
    tagClick: (val: string) => true,
    cateClick: (val: string) => true
  },
  setup(props, { emit }) {
    const {
      name,
      date,
      tags,
      cate,
      info
    } = toRefs(props)
    const nameClick = () => {
      emit('nameClick')
    }
    const timeClick = (time: string) => {
      emit('timeClick', time)
    }
    const tagClick = (tag: string) => {
      emit('tagClick', tag)
    }
    const cateClick = (cate: string) => {
      emit('cateClick', cate)
    }
    const onMetaClick = reactive({
      onTimeClick: timeClick,
      onTagClick: tagClick,
      onCateClick: cateClick
    })
    return {
      name,
      date,
      tags,
      cate,
      info,
      nameClick,
      onMetaClick
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
.article-container {
  border-bottom: 1px solid #f2f2f2;
}
.article-header {
  margin-bottom: 10px;
}
.article-info {
  margin-bottom: 10px;
  color: #454545;
  font-size: 12px;
}
.article-name {
  font-size: 18px;
  margin: 21px 0 10.5px;
  line-height: 1.2;
  @include hoverLink;
}
</style>