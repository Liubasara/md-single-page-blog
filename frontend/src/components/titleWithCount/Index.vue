<template>
  <h1 class="title">{{ $props.title }}</h1>
  <p v-if="$props.showCount" class="text-muted">
    <slot name="count">共 {{ $props.count }} 篇文章</slot>
  </p>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TitleWithCount',
  props: {
    title: {
      type: String,
      require: true
    },
    showCount: {
      type: Boolean,
      default: true
    },
    count: {
      type: Number,
      default: 0
    }
  }
})
</script>
<style lang="scss" scoped>
.title {
  margin-top: 21px;
  margin-bottom: 10.5px;
  font-weight: 500;
  line-height: 1.1;
  font-size: 30px;
}
.text-muted {
  color: #777;
  margin: 0 0 10.5px;
  font-size: 14px;
}
</style>