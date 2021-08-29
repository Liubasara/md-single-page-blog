<template>
  <div class="tag-card-wrapper">
    <div class="tag-card-container">
      <div class="card-body">
        <ArticleMeta :time="$props.time" @on-time-click="$emit('time-click')"></ArticleMeta>
        <h3 class="body-title">
          <span @click="$emit('title-click')">{{ $props.title }}</span>
        </h3>
      </div>
      <div class="card-footer">
        <span
          class="label"
          v-for="(tag, i) in $props.tags"
          :key="tag + '-label-' + i"
          @click="$emit('tag-click', tag)"
        >{{ tag }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ArticleMeta from '@/components/articleMeta/Index.vue'
import TagCardProps from '@/pages/blog/tags/components/tagCard/props'

export default defineComponent({
  name: 'TagCard',
  props: TagCardProps,
  components: { ArticleMeta },
  emits: {
    'time-click': null,
    'title-click': null,
    'tag-click': (tag: string) => true
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/style/screenMixins.scss";
@import "@/assets/style/commonVar.scss";
.tag-card-wrapper {
  width: 100%;
  @include desktopCommonScreen {
    width: 50%;
  }
}
.tag-card-container {
  margin-right: 15px;
  margin-bottom: 15px;
  border: 1px solid #f2f2f2;
  transition: 0.5s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
}
.card-body {
  padding: 15px;
}
.body-title {
  margin-top: 21px;
  margin-bottom: 10.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 18px;
  line-height: 32px;
  height: 64px;
  word-break: break-all;
  cursor: pointer;
  span:hover {
    color: $hoverColor;
  }
}
.card-footer {
  padding: 10px 15px;
  border-top: 1px solid #f2f2f2;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.label {
  margin-bottom: 5px;
  margin-right: 5px;
  background-color: #eee;
  display: inline-block;
  padding: 0.3em 0.6em;
  font-size: 75%;
  font-weight: 400;
  line-height: 1;
  color: #777;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25em;
  cursor: pointer;
  user-select: none;
  &:hover {
    background-color: #d5d5d5;
  }
}
</style>