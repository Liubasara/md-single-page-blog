<template>
  <li class="list-item">
    <a :class="['list-link', { active: isActive }]" @click.prevent.stop="itemClick">
      {{
        name
      }}
    </a>
    <span class="list-count">{{ num }}</span>
  </li>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import ListItemProps from '@/components/asider/components/listItem/props'

export default defineComponent({
  name: 'AsiderListItem',
  props: ListItemProps,
  emits: ['itemClick'],
  setup(props, { emit }) {
    const propRefs = toRefs(props)
    const itemClick = () => {
      emit('itemClick')
    }
    return {
      itemClick,
      ...propRefs
    }
  }
})
</script>

<style lang="scss" scoped>
.list-item {
  user-select: none;
  &::before {
    box-sizing: border-box;
    color: #ccc;
    content: "▪";
    font-size: 12px;
    margin-right: 6px;
    -webkit-transition: 0.2s ease;
    transition: 0.2s ease;
  }
}
.list-link {
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
.list-count {
  padding-left: 5px;
  color: #999;
  font-size: 0.85em;
  &::before {
    content: "(";
  }
  &::after {
    content: ")";
  }
}
</style>
