<template>
  <div>
    <div class="panel-heading" @click="changeExpand">
      <div class="panel-title">
        <slot name="icon" :expand="isExpand">
          <Icon :type="isExpand ? 'folderopen' : 'folder'"></Icon>
        </slot>
        <span class="text">{{ props.title }}</span>
        <span class="text-muted" v-if="props.showMuted">{{ props.mutedText }}</span>
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
import panelCardProps from '@/components/panel/card/props'

export default defineComponent({
  name: 'PanelCard',
  props: panelCardProps,
  components: { Icon, Collapse },
  emits: {
    'update:expand': (val: boolean) => {
      return true
    }
  },
  setup(props, { emit }) {
    const isExpand = ref(props.expand)
    const changeExpand = () => {
      isExpand.value = !isExpand.value
      emit('update:expand', isExpand.value)
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
.text-muted {
  margin-top: 1px;
  font-size: 85%;
  margin-left: 5px;
  color: #777;
}
</style>