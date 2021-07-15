<template>
  <div class="wrapper">
    <header class="header"><slot name="header"></slot></header>
    <main class="main"><slot></slot></main>
    <aside class="asider"><slot name="asider"></slot></aside>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Layout',
  setup() {}
})
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  .header {
    width: 16.66667%;
    min-width: 16.66667%;
  }
  .asider {
    width: 21%;
    min-width: 21%;
  }
  .main {
    flex: 1;
    min-height: 100vh;
    padding: 15px;
  }
  @media screen and (min-width: 1440px) {
  }
  @media screen and (min-width: 1200px) and (max-width: 1439px) {
    .asider {
      width: 23%;
      min-width: 23%;
    }
  }
  @media screen and (min-width: 992px) and (max-width: 1119px) {
    .asider {
      width: 25%;
      min-width: 25%;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    .header {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1000;
      display: block;
      padding: 0;
      width: 4.16667%;
      min-width: 4.16667%;
      overflow-y: auto;
      // border-right: 1px solid #f6f6f6;
    }
    .main {
      padding: 15px 15px 15px calc(4.16667% + 15px);
    }
  }
  @media screen and (max-width: 767px) {
    flex-direction: column;
    .header {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      width: 100%;
      z-index: 1050;
    }
    .asider {
      display: none;
    }
  }
}
</style>
