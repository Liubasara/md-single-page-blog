<template>
  <div class="collection-item">
    <time>{{ time }}</time>
    <span>&nbsp;&nbsp;&nbsp;</span>
    <span>{{ title }}</span>
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
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  &:hover {
    color: #333;
  }
}
</style>