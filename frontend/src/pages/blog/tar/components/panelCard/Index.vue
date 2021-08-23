<template>
  <div>
    <div class="panel-heading" @click="changeExpand">
      <div class="panel-title">
        <Icon :type="isExpand ? 'calendar-minus' : 'calendar-plus'"></Icon>
        <span class="text">{{ props.title }}</span>
      </div>
    </div>
    <Collapse :isExpand="isExpand" :transitionSec="0.4">
      <div class="panel-body">
        <slot></slot>
      </div>
    </Collapse>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Icon from '@/components/icon/Index.vue'
import Collapse from '@/components/collapse/Index.vue'
import panelCardProps from '@/pages/blog/tar/components/panelCard/props'

export default defineComponent({
  name: 'TarPanelCard',
  props: panelCardProps,
  components: { Icon, Collapse },
  emits: ['itemClick'],
  setup(props) {
    const isExpand = ref(true)
    const changeExpand = () => {
      isExpand.value = !isExpand.value
    }
    return {
      props,
      isExpand,
      changeExpand
    }
  }
})
</script>
<style lang="scss" scoped>
.panel-heading {
  padding: 10px 0;
  font-size: 16px;
  user-select: none;
  cursor: pointer;
}
.panel-title {
  display: flex;
  align-items: center;
  .text {
    margin-left: 5px;
  }
}
.panel-body {
  padding: 15px 0;
}
</style>