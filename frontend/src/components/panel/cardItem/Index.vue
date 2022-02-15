<template>
  <div class="collection-item">
    <time>{{ time }}</time>
    <div class="item-title mg-l-4">{{ title }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import panelCardItemProps from '@/components/panel/cardItem/props'

export default defineComponent({
  name: 'PanelCardItem',
  props: panelCardItemProps,
  setup(props) {
    const { time, title } = toRefs(props)
    return {
      time,
      title
    }
  }
})
</script>
<style lang="scss" scoped>
.collection-item {
  color: #777;
  padding: 8px 0;
  display: flex;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  &:hover {
    color: #333;
  }
  time {
    display: block;
    min-width: 85px;
    position: relative;
    top: 4px;
  }
  .item-title {
    flex: 1;
    min-width: 0px;
    line-height: 1.5;
  }
}
.mg-l-4 {
  margin-left: 4px;
}
</style>