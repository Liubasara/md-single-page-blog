<template>
  <div class="pc-header">
    <PCHeader v-bind="headerProps"></PCHeader>
  </div>
  <div class="mobile-header">
    <MobileHeader v-bind="headerProps"></MobileHeader>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import PCHeader from '@/components/header/pcHeader/Index.vue'
import MobileHeader from '@/components/header/mobileHeader/Index.vue'
import headerProps from '@/components/header/useProps'

export default defineComponent({
  name: 'Header',
  components: {
    PCHeader,
    MobileHeader
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

.pc-header {
  display: block;
  height: 100%;
}
.mobile-header {
  display: none;
  height: 100%;
}

@include mobileScreen {
  .pc-header {
    display: none;
  }
  .mobile-header {
    display: block;
  }
}
</style>
