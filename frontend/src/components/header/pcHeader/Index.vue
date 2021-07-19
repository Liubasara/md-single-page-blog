<template>
  <div class="common-pc-header">
    <CommonPcHeader v-bind="headerProps"></CommonPcHeader>
  </div>
  <div class="tiny-pc-header">
    <TinyPcHeader v-bind="headerProps"></TinyPcHeader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CommonPcHeader from '@/components/header/pcHeader/commonPcHeader/Index.vue'
import TinyPcHeader from '@/components/header/pcHeader/tinyPcHeader/Index.vue'
import headerProps from '@/components/header/useProps'

export default defineComponent({
  name: 'PCHeader',
  components: {
    CommonPcHeader,
    TinyPcHeader
  },
  props: headerProps,
  setup(props) {
    return {
      headerProps: props
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/screenMixins.scss';

.common-pc-header {
  display: block;
  height: 100%;
}
.tiny-pc-header {
  display: none;
  height: 100%;
}

@include desktopTinyScreen {
  .common-pc-header {
    display: none;
  }
  .tiny-pc-header {
    display: block;
  }
}
</style>
