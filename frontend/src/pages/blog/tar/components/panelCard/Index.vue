<template>
  <div>
    <div class="panel-heading" @click="changeExpand">
      <div class="panel-title">
        <Icon :type="isExpand ? 'calendar-minus' : 'calendar-plus'"></Icon>
        <span class="text">{{ props.title }}</span>
      </div>
    </div>
    <Collapse :isExpand="isExpand">
      <div class="panel-body">
        <div
          class="collection-item"
          v-for="(item, index) in props.list"
          :key="index"
          @click="handleItemClick"
        >
          <time>{{ item.time }}</time>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <span>{{ item.title }}</span>
        </div>
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
  name: 'tarPanel',
  props: panelCardProps,
  components: { Icon, Collapse },
  setup(props, { emit }) {
    const isExpand = ref(true)
    const changeExpand = () => {
      isExpand.value = !isExpand.value
    }
    const handleItemClick = () => {
      emit('itemClick')
    }
    return {
      props,
      isExpand,
      changeExpand,
      handleItemClick
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
.collection-item {
  color: #777;
  padding: 8px 0;
  cursor: pointer;
  user-select: none;
  &:hover {
    color: #333;
  }
}
</style>