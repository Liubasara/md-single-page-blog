<template>
  <div class="clearfix-bfc">
    <h3 class="title">{{ title }}</h3>
    <ul class="list">
      <Collapse :is-expand="isListExpand" :min-height="45">
        <slot></slot>
      </Collapse>
      <li>
        <span
          v-if="showListExpandBtn"
          class="expand-item active"
          @click="expandList"
        >{{ listExpandText }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue'
import Collapse from '@/components/collapse/Index.vue'
import ListCardProps from '@/components/asider/components/listCard/props'

export default defineComponent({
  name: 'AsiderListCard',
  props: ListCardProps,
  components: { Collapse },
  emits: ['update:isListExpand'],
  setup(props, { emit }) {
    const propsRefs = toRefs(props)
    const { isListExpand } = propsRefs
    const listExpandText = computed(() => isListExpand.value ? '收缩' : '展开')
    const expandList = () => {
      emit('update:isListExpand', !isListExpand.value)
    }
    return {
      listExpandText,
      expandList,
      ...propsRefs
    }
  }
})
</script>

<style lang="scss" scoped>
.clearfix-bfc {
  &::before {
    content: "";
    display: table;
  }
  &::after {
    content: "";
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
.list {
  margin-bottom: 10.5px;
  line-height: 1.75;
  font-size: 14px;
}

.expand-item {
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
</style>
